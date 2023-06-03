import { parse } from "./streams/parse-stream";
import { streamGoogleSheetsCsv } from "../../cleanair-google-sheets/mod";
import { Entry } from "./interfaces";
import type { GeoJSON } from "../../cleanair-sensor-common/mod";

export const download = async (urls: string[]) => {
  const stream = await streamGoogleSheetsCsv(urls[0]!).then(parse);
  return stream.records;
};

export const toGeoJSON = (
  data: Entry[]
): GeoJSON.FeatureCollection<GeoJSON.Point, Entry> => ({
  type: "FeatureCollection",
  features: data.map((properties) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        /**
         * @warn FAKE WE DON'T HAVE REAL COORDS
         */
        coordinates: [0, 0],
      },
      properties,
    };
  }),
});

export const downloadGeoJSON = (urls: string[]) =>
  download(urls).then(toGeoJSON);

export const dateField = "date";
