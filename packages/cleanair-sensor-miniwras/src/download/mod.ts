/**
 * Download Flow sensor datas.
 * Flow sensor CSVs take both a measurements and positions CSV.
 * They must be streamed and zipped together.
 */
/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/geojson/index.d.ts" />
import { streamGoogleSheetsCsv } from "../../../cleanair-google-sheets/mod.ts";
import { parse as parseMeasure } from "../streams/parse-measure-stream.ts";
// import { parse as parsePositions } from "../../../cleanair-sensor-flow/src/streams/parse-positions-stream.ts";
import { parse as parsePL } from "../../../cleanair-sensor-pocketlabs/src/streams/parse-pocketlabs-stream.ts";
import { MiniWRASEntry, ModResources } from "../interfaces.ts";
import { invariant } from "../../../invariant/mod.ts";
import { type GeoJSON } from "../../../cleanair-sensor-common/mod.ts";
import type { Entry as PocketlabsEntry } from "../../../cleanair-sensor-pocketlabs/src/interfaces.ts";
import type { StravaEntry } from "../../../cleanair-sensor-strava-gpx/mod.ts";

type MiniWrasCombinedEntry = MiniWRASEntry & StravaEntry;
const OLD_DATE = new Date(0);
export const createModule = (r: ModResources) => {
  const download = async (urls: string[]) => {
    const [measurementsUrl, positionsUrl] = urls;
    invariant(measurementsUrl, "");
    invariant(positionsUrl, "");
    const [{ records: measures }, { records: positions }] = await Promise.all([
      streamGoogleSheetsCsv(measurementsUrl).then(parseMeasure),
      streamGoogleSheetsCsv(positionsUrl).then(parsePL),
    ]);
    if (measures.length !== positions.length) {
      console.warn(
        `lossy data - measures ${measures.length}, positions ${positions.length}`
      );
    }
    const coordStamps = positions.map((p) => p.date);
    return measures.reduce<MiniWRASEntry[]>((acc, it) => {
      const coordTimestampMatch = r.closestTo(it.date, coordStamps)!;
      const coord = positions.find(
        (c) => c.date.getTime() === coordTimestampMatch.getTime()
      );
      if (!coord) {
        throw new Error(`no position found for ${JSON.stringify(it)}`);
      }
      const entry: MiniWRASEntry = {
        ...it,
        latitude: coord.latitude,
        longitude: coord.longitude,
        humidity: coord.humidity,
        pocketlabsEntry: coord,
        skip: Math.abs(coord.date.getTime() - it.date.getTime()) > 60_000,
      };
      if (!entry.skip) {
        acc.push(entry);
      }
      return acc;
    }, []);
  };

  const toGeoJSON = (
    flowDatas: MiniWrasCombinedEntry[]
  ): GeoJSON.FeatureCollection => ({
    type: "FeatureCollection",
    features: flowDatas.map((properties) => {
      const coordinates = [properties.lon, properties.lat];
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates,
        },
        properties: { ...properties },
      } as GeoJSON.Feature;
    }),
  });

  const downloadGeoJSON = (urls: string[]) => download(urls).then(toGeoJSON);

  const dateField = /* transformed from "date (UTC)"" on download */ "date";

  /**
   * Combine all observations, assuming they are already in time ascending order
   */
  const combine = ({
    pocketlabs = [],
    strava,
    miniwras,
  }: {
    pocketlabs?: PocketlabsEntry[];
    miniwras: MiniWRASEntry[];
    strava: StravaEntry[];
  }): GeoJSON => {
    const results: MiniWrasCombinedEntry[] = [];
    for (const miniv of miniwras) {
      const targetDate = miniv.date;
      while (true) {
        const stravaEntry = strava[0];
        const stravaDate: Date | null = stravaEntry?.date;
        if (!stravaDate || !stravaEntry) {
          console.warn(`no strava data, skipping, dropping miniwras point`);
          break;
        } else if (stravaDate < targetDate) {
          // drop unused strava point
          strava.shift();
        } else if (stravaDate.getTime() - targetDate.getTime() < 60_000) {
          results.push({ ...stravaEntry, ...miniv });
          strava.shift(); // consume used strava point
          break;
        } else {
          console.warn(
            `miniwras > 1 minute away from strava points, dropping miniwras point`
          );
          break; // no strava point for this miniwras point close enough
        }
      }
    }
    return toGeoJSON(results);
  };

  return {
    combine,
    download,
    downloadGeoJSON,
    dateField,
    toGeoJSON,
  };
};
