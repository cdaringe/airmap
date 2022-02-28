export type SensorDownloadHook<P = any> = (urls: string[]) => Promise<{
  geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, P>;
  getLevels: ({
    isMinMaxDynamicRange,
    geojson,
  }: {
    isMinMaxDynamicRange: boolean;
    geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, P>;
  }) => {
    fieldName: string;
    circleCases: any[];
    colors: string[];
    pm2Ranges: [number, number][];
  };
}>;
