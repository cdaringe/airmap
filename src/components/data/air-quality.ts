import { csv2geojson } from "csv2geojson";

const fetchGoogleSheetsCsv = (url: string) =>
  fetch(url, { headers: { accept: "text" } }).then((r) => r.text());
const applyEpaCorrection = (old: number, humidity: number) =>
  0.0534 * old - 0.0844 * humidity + 5.604;

const csvToGeoJson = (csv: string) =>
  new Promise<GeoJSON.FeatureCollection>((res, rej) =>
    csv2geojson(
      csv,
      {
        latfield: "Latitude",
        lonfield: "Longitude",
        delimiter: ",",
      },
      function oncsv(err, geojson) {
        if (err) return rej(err);
        return res(geojson);
      }
    )
  );

export const getFromCsvUrl = async (sheetsCsvUrl: string) => {
  const csv = await fetchGoogleSheetsCsv(sheetsCsvUrl);
  const geojson = await csvToGeoJson(csv);
  geojson.features.forEach((feature) => {
    const properties = feature.properties;
    if (!properties) throw new Error("missing properties");
    const {
      "Particulate Matter-PM2.5 (ug/m&#179;)": pm2Str,
      "Particulate Matter-PM1.0 (ug/m&#179;)": pm1Str,
      "Humidity-Humidity (%RH)": humidityStr,
    } = properties;
    const pm2 = parseInt(pm2Str);
    const pm1 = parseInt(pm1Str);
    const humidity = parseFloat(humidityStr);
    properties.pm2 = pm2;
    properties.pm1 = pm1;
    properties.pm25corrected = applyEpaCorrection(pm2, humidity);
    properties.pm1corrected = applyEpaCorrection(pm1, humidity);
  });
  return geojson as GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    {
      pm2: number;
      pm1: number;
      pm25corrected: number;
      pm1corrected: number;
    }
  >;
};
