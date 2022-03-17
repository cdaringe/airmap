export * from "./src/fetch-streaming";
export * from "./src/fetch-streaming-google-sheets";
export * from "./src/mapbox";

export type MapGetLevels = ({
  isMinMaxDynamicRange,
  geojson,
}: {
  isMinMaxDynamicRange: boolean;
  geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, P>;
}) => {
  circleCases: any[];
  colors: string[];
  fieldName: string;
  pm2Ranges: [number, number][];
};

export type SensorDataHook<P = any> = (urls: string[]) => Promise<{
  geojson: () => Promise<GeoJSON.FeatureCollection<GeoJSON.Geometry, P>>;
  map: {
    getLevels: MapGetLevels;
  };
}>;
