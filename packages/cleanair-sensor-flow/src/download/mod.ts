import { type GeoJSON } from "../../../cleanair-sensor-common/mod.ts";

/**
 * Download Flow sensor datas.
 * Flow sensor CSVs take both a measurements and positions CSV.
 * They must be streamed and zipped together.
 */
/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/geojson/index.d.ts" />
import { streamGoogleSheetsCsv } from "../../../cleanair-google-sheets/mod.ts";
import {
  MeasureEntry,
  parse as parseMeasure,
} from "../streams/parse-measure-stream.ts";
import {
  parse as parsePositions,
  PositionsEntry,
} from "../streams/parse-positions-stream.ts";
import { FlowEntry, ModResources } from "../interfaces.ts";
import { invariant } from "../../../invariant/mod.ts";
import { take } from "./iter.ts";

export const createModule = (r: ModResources) => {
  const combine = async ({
    measures,
    positions,
    r,
  }: {
    measures: MeasureEntry[];
    positions: PositionsEntry[];
    r: ModResources;
  }) => {
    if (measures.length !== positions.length) {
      console.warn(
        `lossy data - measures ${measures.length}, positions ${positions.length}`,
      );
    }
    const coordStamps = positions.map((p) => p.timestamp);
    const dropUntilEq = (d: Date) => {
      const t = d.getTime();
      while (coordStamps[0] !== t) {
        coordStamps.shift();
      }
    };
    const takeValuesLessThanAndOneBeyond = (
      target: number,
      values: number[],
    ) => {
      const justOverIndex = values.findIndex((v) => v >= target);
      if (justOverIndex === -1) return values;
      const numOfItems = justOverIndex + 1;
      return take(numOfItems, values);
    };
    const combined: FlowEntry[] = [];
    for (const voc of measures) {
      await new Promise<void>((resolve, reject) => {
        queueMicrotask(() => {
          try {
            const coordTsMatch = r.closestTo(
              voc.date,
              takeValuesLessThanAndOneBeyond(voc.date.getTime(), coordStamps),
            )!;
            dropUntilEq(coordTsMatch);
            const coord = positions.find(
              (c) => c.timestamp === coordTsMatch.getTime(),
            )!;
            const entry = {
              ...voc,
              date: new Date(voc.date),
              latitude: coord.latitude,
              longitude: coord.longitude,
              skip: Math.abs(coord.timestamp - voc.date.getTime()) > 60_000,
            };
            if (!entry.skip) {
              combined.push(entry);
            }
            return resolve();
          } catch (err) {
            return reject(err);
          }
        });
      });
    }
    return combined;
  };

  const download = async (
    urls: string[],
    { omitPositions }: { omitPositions?: boolean } = {},
  ) => {
    const [measurementsUrl, positionsUrl] = urls;
    invariant(measurementsUrl, "");
    invariant(positionsUrl, "");
    const [{ records: measures }, { records: positions }] = await Promise.all([
      streamGoogleSheetsCsv(measurementsUrl).then(parseMeasure),
      omitPositions
        ? ({ records: [] } as { records: PositionsEntry[] })
        : streamGoogleSheetsCsv(positionsUrl).then(parsePositions),
    ]);
    return omitPositions ? measures : combine({ measures, positions, r });
  };

  const toGeoJSON = (flowDatas: FlowEntry[]): GeoJSON.FeatureCollection => ({
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

  const downloadGeoJSON = (urls: string[]) => download(urls).then(toGeoJSON);

  const dateField = /* transformed from "date (UTC)"" on download */ "date";

  return {
    combine,
    download,
    downloadGeoJSON,
    dateField,
    toGeoJSON,
  };
};
