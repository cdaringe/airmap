import { streamGoogleSheetsCsv } from "../../cleanair-google-sheets/mod";
import type { GeoJSON } from "../../cleanair-sensor-common/mod";
import type { Entry as StravaEntry } from "../../cleanair-sensor-strava-gpx/mod";
import { AeroqualS500OnlyEntry, Entry } from "./interfaces";
import { parse } from "./streams/parse-stream";

const applyEpaCorrection = (old: number, humidity: number) =>
  0.0534 * old - 0.0844 * humidity + 5.604;

export const download = async (urls: string[]) => {
  const [aeroqualS500] = await Promise.all([
    streamGoogleSheetsCsv(urls[0]!).then(parse),
  ]);
  return aeroqualS500;
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
  aeroqualS500: src,
  strava,
}: {
  aeroqualS500: AeroqualS500OnlyEntry[];
  strava: StravaEntry[];
}): GeoJSON => {
  const results: Entry[] = [];

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
