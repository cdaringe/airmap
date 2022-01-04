import { fetchGoogleSheetsCsv } from "../../components/data/geojson";
import { SensorDownloadHook } from "../inferaces";
import { closestTo } from "date-fns";

let fieldpm2 = ["get", "VOC (ppb)"];

const colors = [
  "#4d0173",
  "#991113",
  "#ff5600",
  "#ffaa00",
  "#feff00",
  "#6fc400",
].reverse();
const range = (aInc: number, bNoninc: number) => [
  "all",
  [">=", fieldpm2, aInc],
  ["<", fieldpm2, bNoninc],
];

const lvl_pm2_1 = range(0, 2_000);
const lvl_pm2_2 = range(2_000, 4_000);
const lvl_pm2_3 = range(4_000, 6_000);
const lvl_pm2_4 = range(6_000, 8_000);
const lvl_pm2_5 = range(8_000, 10_000);
const lvl_pm2_6 = range(12_000, 1e9);

const pm2_levels = [
  lvl_pm2_1,
  lvl_pm2_2,
  lvl_pm2_3,
  lvl_pm2_4,
  lvl_pm2_5,
  lvl_pm2_6,
];

const asRecords = <H extends Record<string, (v: string) => number>>(
  [header, ...rest]: string[][],
  includeHeaders: H
) => {
  const headerParserList = Object.entries(includeHeaders);
  const headerNameIndexParserList = headerParserList.map(([name, parser]) => {
    const i = header.findIndex((cell) => cell === name);
    if (i < 0) throw new Error(`header ${name} not found`);
    return [name, i, parser] as const;
  });
  return rest.map((row) =>
    headerNameIndexParserList.reduce<Record<keyof H, number>>(
      (acc, [name, i, parse]) => {
        acc[name as keyof H] = parse(row[i]);
        return acc;
      },
      {} as any
    )
  );
};

const useFlow1: SensorDownloadHook = async (urls) => {
  const toCsv = (csv: string) =>
    [...csv.match(/[^\r\n]+/g)!].map((v) => v.split(","));
  const [g1, g2] = await Promise.all([
    fetchGoogleSheetsCsv(urls[0]).then(toCsv),
    fetchGoogleSheetsCsv(urls[1]).then(toCsv),
  ]);
  const parseSecondsTsToMs = (v: string) => parseInt(v) * 1_000;
  const vocsWithoutCoords = asRecords(g1, {
    timestamp: parseSecondsTsToMs,
    "VOC (ppb)": parseInt,
  });
  const coords = asRecords(g2, {
    timestamp: parseSecondsTsToMs,
    latitude: parseFloat,
    longitude: parseFloat,
  });
  if (!g2.length || !g1.length) {
    throw new Error("missing data");
  }
  const coordStamps = coords.map((c) => c.timestamp);
  const vocs = vocsWithoutCoords
    .map((voc) => {
      const coordTsMatch = closestTo(voc.timestamp, coordStamps)!;
      const coord = coords.find((c) => c.timestamp === coordTsMatch.getTime())!;
      return {
        ...voc,
        latitude: coord.latitude,
        longitude: coord.longitude,
        skip: Math.abs(coord.timestamp - voc.timestamp) > 60_000,
      };
    })
    .filter((v) => !v.skip);
  const loss = vocsWithoutCoords.length - vocs.length;
  if (loss > 0) {
    console.warn(`lossy data: ${(loss / vocsWithoutCoords.length).toFixed(1)}`);
  }
  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: vocs.map((properties) => {
      const f: GeoJSON.Feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [properties.longitude, properties.latitude],
        },
        properties,
      };
      return f;
    }),
  };
  return {
    geojson,
    circleCases: pm2_levels.flatMap((condition, i) => [condition, colors[i]]),
  };
};

export const download = useFlow1;
