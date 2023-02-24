/**
 * Download Flow sensor datas.
 * Flow sensor CSVs take both a measurements and positions CSV.
 * They must be streamed and zipped together.
 */
/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/geojson/index.d.ts" />
import { streamGoogleSheetsCsv } from "../../../cleanair-google-sheets/mod";
import { parse as parseMeasure } from "../streams/parse-measure-stream";
import { parse as parsePL } from "../../../cleanair-sensor-pocketlabs/src/streams/parse-pocketlabs-stream";
import { MiniWRASEntry, ModResources } from "../interfaces";
import { invariant } from "../../../invariant/mod";
import { type GeoJSON } from "../../../cleanair-sensor-common/mod";
import type { Entry as PocketlabsEntry } from "../../../cleanair-sensor-pocketlabs/src/interfaces";
import type { StravaEntry } from "../../../cleanair-sensor-strava-gpx/mod";

type MiniWrasCombinedEntry = MiniWRASEntry &
  StravaEntry & { pocketlabs?: PocketlabsEntry };

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

  const downloadGeoJSON = (_urls: string[]) => {
    // @warning download miniwras from URLs is @deprecated. not all inputs
    // are available in .csv from googlesheets
    // download(urls).then(toGeoJSON);
  };

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

    function getStravaEntry(targetDate: Date) {
      while (true) {
        const stravaEntry = strava[0];
        const stravaDate: Date | null = stravaEntry?.date;
        if (!stravaDate || !stravaEntry) {
          console.warn(`no strava data, skipping, dropping miniwras point`);
          return null;
        } else if (stravaDate < targetDate) {
          // drop unused strava point, try next
          strava.shift();
        } else if (stravaDate.getTime() - targetDate.getTime() < 60_000) {
          strava.shift(); // consume used strava point
          return stravaEntry;
        } else {
          console.warn(
            `miniwras > 1 minute away from strava points, dropping miniwras point`
          );
          // no strava point for this miniwras point close enough.
          return null;
        }
      }
    }

    function getPocketEntry(targetDate: Date) {
      while (true) {
        const entry = pocketlabs[0];
        const date: Date | null = entry?.date;
        if (!date || !entry) {
          return null;
        } else if (date < targetDate) {
          // drop unused point, try next
          pocketlabs.shift();
        } else if (date.getTime() - targetDate.getTime() < 60_000) {
          pocketlabs.shift(); // consume used point
          return entry;
        } else {
          return null;
        }
      }
    }

    for (const miniv of miniwras) {
      const targetDate = miniv.date;
      const stravaEntry = getStravaEntry(targetDate);
      const pocketEntry = getPocketEntry(targetDate);
      if (stravaEntry) {
        results.push({
          ...stravaEntry,
          ...miniv,
          pocketlabs: pocketEntry ? pocketEntry : undefined,
        });
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
