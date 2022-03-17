import { SensorDataHook } from "cleanair-sensor-common";
import { downloadGeoJSON } from "./download";
import { getLevels } from "./mapbox";

export const useFlow: SensorDataHook = async (urls) => ({
  geojson: () => downloadGeoJSON(urls),
  map: { getLevels },
});
