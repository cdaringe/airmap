export type SensorDownloadHook<P = any> = (urls: string[]) => Promise<{
  geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, P>;
  getLevels: (isMinMaxDynamicRange: boolean) => {
    fieldName: string;
    circleCases: any[];
    colors: string[];
    pm2Ranges: [number, number][];
  };
}>;
