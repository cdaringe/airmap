import { csv2geojson } from "csv2geojson";
import { asCsv, normalizeMultiTableCsv } from "./normalize-multi-table-csv";

export const fetchGoogleSheetsCsv = (sheetsCsvUrl: string) => {
  const url = new URL(sheetsCsvUrl);
  const params = new URLSearchParams(url.search);
  if (!params.has("format")) params.set("format", "csv");
  url.search = params.toString();
  return fetch(url.toString(), {
    mode: "cors",
    redirect: "follow",
    headers: { accept: "text" },
  }).then((r) => r.text());
};

const csvToGeoJson = <Properties = GeoJSON.GeoJsonProperties>(csv: string) => {
  return new Promise<GeoJSON.FeatureCollection<GeoJSON.Geometry, Properties>>(
    (res, rej) =>
      csv2geojson<Properties>(
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

export const matrixToGeoJson = <Properties = unknown>(v: string[][]) => {
  const ncsv = asCsv(v);
  return csvToGeoJson<Properties>(ncsv);
};

export const ofCsvUrl = async <GeoJsonProps = unknown>(
  sheetsCsvUrl: string,
  headerNames: string[]
) => {
  const csv = await fetchGoogleSheetsCsv(sheetsCsvUrl);
  const geojson = await matrixToGeoJson(
    normalizeMultiTableCsv(csv, headerNames)
  );
  return geojson as GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJsonProps>;
};
