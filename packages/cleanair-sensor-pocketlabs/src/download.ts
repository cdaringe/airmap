import { parse } from "./streams/parse-pocketlabs-stream";
import { streamGoogleSheetsCsv } from "../../cleanair-google-sheets/mod";
import { Entry } from "./interfaces";
import type { GeoJSON } from "../../cleanair-sensor-common/mod";

const applyEpaCorrection = (old: number, humidity: number) =>
  0.0534 * old - 0.0844 * humidity + 5.604;

export const download = async (urls: string[]) => {
  const stream = await streamGoogleSheetsCsv(urls[0]!).then(parse);
  return stream.records;
};

export const toGeoJSON = (
  data: Entry[]
): GeoJSON.FeatureCollection<GeoJSON.Point, Entry> => ({
  type: "FeatureCollection",
  features: data.map((entry) => {
    const humidity = entry.humidity / 100;
    const pm2 = entry.pm_2_5;
    const pm2Corrected = applyEpaCorrection(pm2, humidity);
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [entry.longitude, entry.latitude],
      },
      properties: {
        ...entry,
        pm_2_5: pm2Corrected,
      },
    };
  }),
});

export const downloadGeoJSON = (urls: string[]) =>
  download(urls).then(toGeoJSON);

export const dateField = "date";
