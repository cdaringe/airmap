export * from "./mapbox.ts";
export { type GeoJSON } from "https://deno.land/x/d3_4_deno@v6.2.0.9/src/d3-geo/geojson.js?s=GeoJSON";

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
  ranges: [number, number][];
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
export const MINIWRAS_ID = 3;
export const AIRMAP_GPS_ID = 4;
