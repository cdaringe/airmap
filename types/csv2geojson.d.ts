declare module "csv2geojson" {
  export const csv2geojson: (
    csv: string,
    parseOptions: {
      latfield: string;
      lonfield: string;
      delimiter: string;
    },
    cb: (err?: Error, geojson: GeoJSON.FeatureCollection) => void
  ) => void;
}
