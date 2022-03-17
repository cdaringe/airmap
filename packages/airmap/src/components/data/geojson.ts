import { csv2geojson } from "csv2geojson";
import { asCsv, normalizeMultiTableCsv } from "./normalize-multi-table-csv";

const csvToGeoJson = <Properties = GeoJSON.GeoJsonProperties>(csv: string) =>
  new Promise<GeoJSON.FeatureCollection<GeoJSON.Geometry, Properties>>(
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
