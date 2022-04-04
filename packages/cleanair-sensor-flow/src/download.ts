/**
 * Download Flow sensor datas.
 * Flow sensor CSVs take both a measurements and positions CSV.
 * They must be streamed and zipped together.
 */
/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/geojson/index.d.ts" />
import { streamGoogleSheetsCsv } from "../../google-sheets/mod.ts";
import { parse as parseMeasure } from "./streams/parse-measure-stream.ts";
import { parse as parsePositions } from "./streams/parse-positions-stream.ts";
import { FlowEntry } from "./interfaces.ts";
import closestTo from "https://deno.land/x/date_fns@v2.22.1/closestTo/index.js";
import { invariant } from "../../invariant/mod.ts";

export const download = async (urls: string[]) => {
  const [measurementsUrl, positionsUrl] = urls;
  invariant(measurementsUrl, "");
  invariant(positionsUrl, "");
  const [{ records: measures }, { records: positions }] = await Promise.all([
    streamGoogleSheetsCsv(measurementsUrl).then(parseMeasure),
    streamGoogleSheetsCsv(positionsUrl).then(parsePositions),
  ]);
  if (measures.length !== positions.length) {
    console.warn(
      `lossy data - measures ${measures.length}, positions ${positions.length}`,
    );
  }
  const coordStamps = positions.map((p) => p.timestamp);
  return measures.reduce<FlowEntry[]>((acc, voc) => {
    const coordTsMatch = closestTo(voc.timestamp, coordStamps)!;
    const coord = positions.find(
      (c) => c.timestamp === coordTsMatch.getTime(),
    )!;
    const date = new Date(coord.timestamp);
    const entry = {
      ...voc,
      date: date.toUTCString(),
      dateLocale: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      latitude: coord.latitude,
      longitude: coord.longitude,
      skip: Math.abs(coord.timestamp - voc.timestamp) > 60_000,
    };
    if (!entry.skip) {
      acc.push(entry);
    }
    return acc;
  }, []);
};

export const toGeojson = (
  flowDatas: FlowEntry[],
): GeoJSON.FeatureCollection => ({
  type: "FeatureCollection",
  features: flowDatas.map(
    (properties) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [properties.longitude, properties.latitude],
      },
      properties: { ...properties },
    } as GeoJSON.Feature),
  ),
});

export const downloadGeoJSON = (urls: string[]) =>
  download(urls).then(toGeojson);

export const dateField =
  /* transformed from "date (UTC)"" on download */ "date";
