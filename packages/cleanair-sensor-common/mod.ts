export * from "./mapbox";
export type { GeoJSON } from "geojson";

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

export type MappingMod<P, GL extends MapGetLevels<P> = MapGetLevels<P>> = {
  getLevels: GL;
  getLevelsByField?: Record<string, GL>;
};

export type MappingResourcesMod<E> = {
  download?: {
    download: (urls: string[]) => Promise<E[]>;
    downloadGeoJSON: (
      urls: string[]
    ) => Promise<GeoJSON.FeatureCollection<GeoJSON.Point, E>>;
    dateField: string;
  };
  mapbox: MappingMod<E>;
};
