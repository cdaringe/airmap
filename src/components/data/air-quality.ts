import { csv2geojson } from "csv2geojson";
import { asCsv, normalizeMultiTableCsv } from "./normalize-multi-table-csv";

export const PM2_CORRECTED_FIELD_NAME = "PM2.5 Corrected";
export const VOC2_FIELD_NAME = "VOC, ppm";

const fetchGoogleSheetsCsv = (url: string) =>
  fetch(url, {
    mode: "cors",
    redirect: "follow",
    headers: { accept: "text" },
  }).then((r) => r.text());

const applyEpaCorrection = (old: number, humidity: number) =>
  0.0534 * old - 0.0844 * humidity + 5.604;

const csvToGeoJson = (csv: string) => {
  return new Promise<GeoJSON.FeatureCollection>((res, rej) =>
    csv2geojson(
      csv,
      {
        latfield: "Lat",
        lonfield: "Lng",
        delimiter: ",",
      },
      function oncsv(err, geojson) {
        if (err) return rej(err);
        return res(geojson);
      }
    )
  );
};

const extractPropertiesLegacy = (properties: Record<string, string>) => {
  const { "PM2.5 (µg/m³)": pm2Str, "PM1.0 (µg/m³)": pm1Str } = properties;
  return { pm2Str, pm1Str, humidityStr: null };
};

const extractPropertiesPurple = (properties: Record<string, string>) => {
  const {
    "Particulate Matter-PM2.5 (ug/m^3)": pm2Str,
    "Particulate Matter-PM1.0 (ug/m^3)": pm1Str,
    "Humidity-Humidity (%RH)": humidityStr,
  } = properties!;
  return { pm2Str, pm1Str, humidityStr };
};

export const getFromCsvUrl = async (
  sheetsCsvUrl: string,
  headerNames: string[]
) => {
  const url = new URL(sheetsCsvUrl);
  const params = new URLSearchParams(url.search);
  if (!params.has("format")) params.set("format", "csv");
  url.search = params.toString();
  const csv = await fetchGoogleSheetsCsv(url.toString());

  const ncsv = asCsv(
    normalizeMultiTableCsv(
      csv,
      // .replace(new RegExp("&#179;", "g"), "^3")
      // .replace(new RegExp("&#x2082;", "g"), "₂")
      // .replace(new RegExp("&#x2083;", "g"), "₃")
      // .replace(new RegExp("&#x2103;", "g"), "℃")
      headerNames
    )
  );
  const geojson = await csvToGeoJson(ncsv);
  geojson.features.forEach((feature) => {
    const properties = feature.properties! || {};
    const { pm2Str, pm1Str, humidityStr } = extractPropertiesLegacy(properties);
    const pm2 = parseInt(pm2Str);
    const pm1 = parseInt(pm1Str);
    const humidity = humidityStr ? parseFloat(humidityStr as any) : 0;
    properties["PM2.5"] = pm2;
    properties["PM1"] = pm1;
    if (humidity)
      properties[PM2_CORRECTED_FIELD_NAME] = applyEpaCorrection(pm2, humidity);
    if (humidity)
      properties["PM1 Corrected"] = applyEpaCorrection(pm1, humidity);
  });
  return geojson as GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    {
      // pm2: number;
      // pm1: number;
      // pm25corrected: number;
      // pm1corrected: number;
    }
  >;
};
