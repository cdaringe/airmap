export * from "./mapbox.ts";

export type MapGetLevels<P = unknown> = ({
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

export type SensorDataHook<P = any> = (urls: string[]) => {
  downloadGeoJSON: () => Promise<
    GeoJSON.FeatureCollection<GeoJSON.Geometry, P>
  >;
  map: {
    getLevels: MapGetLevels<P>;
  };
};

export const NO_SENSOR_ID = -1;
export const FLOW_ID = 1;
export const POCKET_LABS_ID = 2;
