import { useQuery } from "react-query";
import {
  AIRMAP_GPS_ID,
  FLOW_ID,
  MINIWRAS_ID,
  POCKET_LABS_ID,
} from "../../../../../../../packages/cleanair-sensor-common/mod";

export const getPocket = () =>
  import(
    "../../../../../../../packages/cleanair-sensor-pocketlabs/src/resources"
  ).then((m) => m.getResources());

export const getFlow = () =>
  import(
    "../../../../../../../packages/cleanair-sensor-flow/src/resources"
  ).then(async (m) => {
    return m.getResources();
  });

export const getMiniWras = () =>
  import(
    "../../../../../../../packages/cleanair-sensor-miniwras/src/resources"
  ).then(async (m) => {
    return m.getResources();
  });

export const getAirmapGps = () =>
  import(
    "../../../../../../../packages/cleanair-sensor-airmapgps/src/resources"
  ).then(async (m) => {
    return m.getResources();
  });

export const useSensorMappingResources = (sensorType: number) => {
  return useQuery({
    queryKey: `get-mapping-${sensorType}`,
    queryFn: async () => {
      const mod = await (sensorType === POCKET_LABS_ID
        ? getPocket()
        : sensorType === FLOW_ID
        ? getFlow()
        : sensorType === MINIWRAS_ID
        ? getMiniWras()
        : sensorType === AIRMAP_GPS_ID
        ? getAirmapGps()
        : (() => {
            throw new Error(`unsupported sensor type ${sensorType}`);
          })());
      return mod;
    },
    cacheTime: 1e9,
  });
};
