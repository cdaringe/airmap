import { fetchGoogleSheetsCsv } from "../../components/data/geojson";
import { SensorDownloadHook } from "../interfaces";
import { closestTo } from "date-fns";
import { tupleAsMapboxRange } from "../common";

const COLORS = [
  "#6fc400",
  "#feff00",
  "#ffaa00",
  "#ff5600",
  "#991113",
  "#4d0173",
];

const PM2_FIELD_NAME = "VOC (ppb)" as const;
const FIXED_PM2_LEVEL_RANGES: [number, number][] = [
  [0, 2_000],
  [2_000, 4_000],
  [4_000, 6_000],
  [6_000, 8_000],
  [8_000, 10_000],
  [12_000, 1e9],
];

let mapBoxGetPM2Field: ["get", string] = ["get" as const, PM2_FIELD_NAME];

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

const downloadFlow: SensorDownloadHook = async (urls) => {
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
        date: new Date(coord.timestamp).toUTCString(),
        latitude: coord.latitude,
        longitude: coord.longitude,
        skip: Math.abs(coord.timestamp - voc.timestamp) > 60_000,
      } as Omit<typeof voc, "timestamp"> & {
        timestamp?: number;
        latitude: number;
        longitude: number;
        skip?: boolean;
      };
    })
    .filter((v) => {
      delete v.skip;
      delete v.timestamp;
      return !v.skip;
    });
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
      delete (properties as any).longitude;
      delete (properties as any).latitude;
      return f;
    }),
  };

  return {
    geojson,
    getLevels: ({ isMinMaxDynamicRange, geojson }) => {
      let currentPm2 = 0;
      let min = Infinity;
      let max = -Infinity;
      for (const feature of geojson.features) {
        currentPm2 = feature.properties?.[PM2_FIELD_NAME];
        if (currentPm2 > max) max = currentPm2;
        if (currentPm2 < min) min = currentPm2;
      }
      const numColors = COLORS.length;
      const levelSpan = isMinMaxDynamicRange ? (max - min) / numColors : 0;
      const pm2Ranges = isMinMaxDynamicRange
        ? [...new Array(numColors)].map((_, i) => {
            const base = min + i * levelSpan;
            return [base, base + levelSpan] as [number, number];
          })
        : FIXED_PM2_LEVEL_RANGES;
      return {
        fieldName: PM2_FIELD_NAME,
        colors: COLORS,
        pm2Ranges,
        circleCases: pm2Ranges
          .map(tupleAsMapboxRange(mapBoxGetPM2Field))
          .flatMap((condition, i) => [condition, COLORS[i]]),
      };
    },
  };
};

export const download = downloadFlow;
export const dateField =
  /* transformed from "date (UTC)"" on download */ "date";
