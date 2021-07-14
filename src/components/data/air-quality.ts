import { csv2geojson } from "csv2geojson";

const fetchGoogleSheetsCsv = (url: string) =>
  fetch(url, {
    mode: "cors",
    redirect: "follow",
    headers: { accept: "text" },
  }).then((r) => r.text());

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
  const url = new URL(sheetsCsvUrl);
  const params = new URLSearchParams(url.search);
  if (!params.has("tqx")) params.set("tqx", "out:csv");
  if (!params.has("sheet")) params.set("sheet", "data");
  url.search = params.toString();
  const csv = await fetchGoogleSheetsCsv(url.toString());
  const geojson = await csvToGeoJson(
    csv
      .replace(new RegExp("&#179;", "g"), "^3")
      .replace(new RegExp("&#x2082;", "g"), "₂")
      .replace(new RegExp("&#x2083;", "g"), "₃")
      .replace(new RegExp("&#x2103;", "g"), "℃")
  );
  geojson.features.forEach((feature) => {
    const properties = feature.properties;
    if (!properties) throw new Error("missing properties");
    const {
      "Particulate Matter-PM2.5 (ug/m^3)": pm2Str,
      "Particulate Matter-PM1.0 (ug/m^3)": pm1Str,
      "Humidity-Humidity (%RH)": humidityStr,
    } = properties;
    const pm2 = parseInt(pm2Str);
    const pm1 = parseInt(pm1Str);
    const humidity = parseFloat(humidityStr);
    properties["PM2.5"] = pm2.toPrecision(3);
    properties["PM1"] = pm1.toPrecision(3);
    properties["PM2.5 Corrected"] = applyEpaCorrection(
      pm2,
      humidity
    ).toPrecision(3);
    properties["PM1 Corrected"] = applyEpaCorrection(pm1, humidity).toPrecision(
      3
    );
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
