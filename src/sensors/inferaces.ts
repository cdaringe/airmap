import { UseQueryResult } from "react-query";

export type SensorDownloadHook = (urls: string[]) => Promise<{
  geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, {}>;
  circleCases: any[];
}>;
