import { useQuery } from "react-query";
import {
  POCKET_LABS_ID,
  FLOW_ID,
} from "../../../../../../../packages/cleanair-sensor-common/mod.ts";
export const useSensorMappingResources = (sensorType: number) => {
  return useQuery({
    queryKey: `get-mapping-${sensorType}`,
    queryFn: async () => {
      const mod = await (sensorType === POCKET_LABS_ID
        ? import(
            "../../../../../../../packages/cleanair-sensor-pocketlabs/src/resources.ts"
          ).then((m) => m.getResources())
        : sensorType === FLOW_ID
        ? import(
            "../../../../../../../packages/cleanair-sensor-flow/src/resources.ts"
          ).then(async (m) => {
            const { closestTo } = await import("date-fns");
            return m.getResources({ closestTo });
          })
        : (() => {
            throw new Error(`unsupported sensor type ${sensorType}`);
          })());
      return mod;
    },
    cacheTime: 1e9,
  });
};
