export type { GeoJSON } from "geojson";
export * from "./mapbox";

export type MapLevels = {
  circleCases: any[];
  colors: string[];
  fieldName: string;
  ranges: [number, number][];
};

export type MapGetLevels<P = any> = ({
  isMinMaxDynamicRange,
  geojson,
}: {
  isMinMaxDynamicRange: boolean;
  geojson: GeoJSON.FeatureCollection<GeoJSON.Point, any>;
}) => MapLevels;

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
export const AEROQUAL_S500_ID = 5;

export const sensorNameById: { [id: number]: string } = {
  [NO_SENSOR_ID]: "No Sensor",
  [FLOW_ID]: "Flow",
  [POCKET_LABS_ID]: "Pocket Labs",
  [MINIWRAS_ID]: "MiniWRAS",
  [AIRMAP_GPS_ID]: "AirMap GPS",
  [AEROQUAL_S500_ID]: "Aeroqual S500",
};

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
  processGeoJSONMemoKey?: () => string;
  processGeoJSON?: (
    geojson: GeoJSON.FeatureCollection<GeoJSON.Point, E>
  ) => void;
};
