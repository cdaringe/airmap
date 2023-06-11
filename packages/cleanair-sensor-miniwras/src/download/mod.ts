/**
 * Download Flow sensor datas.
 * Flow sensor CSVs take both a measurements and positions CSV.
 * They must be streamed and zipped together.
 */
import { type GeoJSON } from "../../../cleanair-sensor-common/mod";
import type { Entry as PocketlabsEntry } from "../../../cleanair-sensor-pocketlabs/src/interfaces";
import type { Entry as StravaEntry } from "../../../cleanair-sensor-strava-gpx/mod";
import { DatEntry, Entry } from "../interfaces";

export type GeoJSONMiniWras = GeoJSON.FeatureCollection<GeoJSON.Point, Entry>;

const toGeoJSON = (flowDatas: Entry[]): GeoJSONMiniWras => ({
  type: "FeatureCollection",
  features: flowDatas.map((properties) => {
    const coordinates = [properties.longitude, properties.latitude];
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates,
      },
      properties,
    };
  }),
});

export const dateField =
  /* transformed from "date (UTC)"" on download */ "date";

/**
 * Combine all observations, assuming they are already in time ascending order
 */
export const combine = ({
  pocketlabs = [],
  strava,
  miniwras,
}: {
  pocketlabs?: PocketlabsEntry[];
  miniwras: DatEntry[];
  strava: StravaEntry[];
}): GeoJSON => {
  const results: Entry[] = [];

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
        latitude: stravaEntry.lat,
        longitude: stravaEntry.lon,
        ...stravaEntry,
        ...miniv,
        pm05Calibrated: -1,
        pm05Derived: -1,
        pm05To3Calibrated: -1,
        pm01To03Derived: -1,
        pocketlabsEntry: pocketEntry ? pocketEntry : undefined,
      });
    }
  }
  return toGeoJSON(results);
};
