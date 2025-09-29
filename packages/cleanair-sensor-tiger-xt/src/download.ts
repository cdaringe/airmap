import { streamGoogleSheetsCsv } from "../../cleanair-google-sheets/mod";
import type { GeoJSON } from "../../cleanair-sensor-common/mod";
import type { Entry as StravaEntry } from "../../cleanair-sensor-strava-gpx/mod";
import { TigerXtOnlyEntry, Entry } from "./interfaces";
import { parse } from "./streams/parse-stream";

export type GeoJSONTigerXt = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  Entry
>;

export const download = async (urls: string[]) => {
  const [tigerXt] = await Promise.all([
    streamGoogleSheetsCsv(urls[0]!).then(parse),
  ]);
  return tigerXt;
};

export const toGeoJSON = (
  data: Entry[]
): GeoJSON.FeatureCollection<GeoJSON.Point, Entry> => ({
  type: "FeatureCollection",
  features: data.map((entry) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [entry.longitude, entry.latitude],
      },
      properties: entry,
    };
  }),
});

export const downloadGeoJSON = (_urls: string[]) => {
  throw new Error("!unimplemented");
  // download(urls).then(toGeoJSON);
};

/**
 * Combine all observations, assuming they are already in time ascending order
 */
export const combine = ({
  tigerXt: src,
  strava,
}: {
  tigerXt: TigerXtOnlyEntry[];
  strava: StravaEntry[];
}): GeoJSON => {
  const results: Entry[] = [];

  debugger // eslint-disable-line
  function getStravaEntry(targetDate: Date) {
    while (true) {
      const stravaEntry = strava[0];
      const stravaDate: Date | null = stravaEntry?.date;
      if (!stravaDate || !stravaEntry) {
        console.warn(`no strava data, skipping, dropping src point`);
        return null;
      } else if (stravaDate < targetDate) {
        // drop unused strava point, try next
        strava.shift();
      } else if (stravaDate.getTime() - targetDate.getTime() < 60_000) {
        strava.shift(); // consume used strava point
        return stravaEntry;
      } else {
        console.warn(
          `src > 1 minute away from strava points, dropping src point`
        );
        // no strava point for this src point close enough.
        return null;
      }
    }
  }

  for (const entry of src) {
    const targetDate = entry.date;
    const stravaEntry = getStravaEntry(targetDate);
    if (stravaEntry) {
      results.push({
        latitude: stravaEntry.lat,
        longitude: stravaEntry.lon,
        ...stravaEntry,
        ...entry,
      });
    }
  }
  return toGeoJSON(results);
};

export const dateField = "date";
