declare module "csv2geojson" {
  export const csv2geojson: <Properties = GeoJSON.GeoJsonProperties>(
    csv: string,
    parseOptions: {
      latfield: string;
      lonfield: string;
      delimiter: string;
    },
    cb: (
      err?: Error,
      geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, Properties>
    ) => void
  ) => void;
}
