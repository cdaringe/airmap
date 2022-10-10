/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/geojson/index.d.ts" />
import { parse } from "./streams/parse-pocketlabs-stream.ts";
import { streamGoogleSheetsCsv } from "../../cleanair-google-sheets/mod.ts";
import { Entry } from "./interfaces.ts";

const applyEpaCorrection = (old: number, humidity: number) =>
  0.0534 * old - 0.0844 * humidity + 5.604;

export const download = async (urls: string[]) => {
  const stream = await streamGoogleSheetsCsv(urls[0]!).then(parse);
  return stream.records;
};

export const toGeoJSON = (data: Entry[]): GeoJSON.FeatureCollection => ({
  type: "FeatureCollection",
  features: data.map((entry, i) => {
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
