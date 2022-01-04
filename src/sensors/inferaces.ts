import { UseQueryResult } from "react-query";

export type SensorDownloadHook<P = any> = (urls: string[]) => Promise<{
  geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, P>;
  circleCases: any[];
}>;
