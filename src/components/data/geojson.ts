import { csv2geojson } from "csv2geojson";
import { asCsv, normalizeMultiTableCsv } from "./normalize-multi-table-csv";

const fetchGoogleSheetsCsv = (url: string) =>
  fetch(url, {
    mode: "cors",
    redirect: "follow",
    headers: { accept: "text" },
  }).then((r) => r.text());

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

export const ofCsvUrl = async <GeoJsonProps = unknown>(
  sheetsCsvUrl: string,
  headerNames: string[]
) => {
  const url = new URL(sheetsCsvUrl);
  const params = new URLSearchParams(url.search);
  if (!params.has("format")) params.set("format", "csv");
  url.search = params.toString();
  const csv = await fetchGoogleSheetsCsv(url.toString());
  const ncsv = asCsv(normalizeMultiTableCsv(csv, headerNames));
  const geojson = await csvToGeoJson(ncsv);
  return geojson as GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJsonProps>;
};
