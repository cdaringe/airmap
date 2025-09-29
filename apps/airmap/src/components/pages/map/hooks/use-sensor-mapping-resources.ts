import { useQuery } from "react-query";
import {
  AEROQUAL_S500_ID,
  AIRMAP_GPS_ID,
  FLOW_ID,
  MappingResourcesMod,
  MINIWRAS_ID,
  POCKET_LABS_ID,
  TIGER_XT_ID,
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

export const getAeroqualS5000 = () =>
  import(
    "../../../../../../../packages/cleanair-sensor-aeroqual-s500/src/resources"
  ).then(async (m) => {
    const resources = m.getResources();
    return resources;
  });

export const getTigerXt = () =>
  import(
    "../../../../../../../packages/cleanair-sensor-tiger-xt/src/resources"
  ).then(async (m) => {
    return m.getResources();
  });

export const useSensorMappingResources = (sensorType: number) => {
  return useQuery({
    queryKey: `get-mapping-${sensorType}`,
    queryFn: async (): Promise<MappingResourcesMod<any>> => {
      const mod = await (sensorType === POCKET_LABS_ID
        ? getPocket()
        : sensorType === FLOW_ID
        ? getFlow()
        : sensorType === MINIWRAS_ID
        ? getMiniWras()
        : sensorType === AIRMAP_GPS_ID
        ? getAirmapGps()
        : sensorType === AEROQUAL_S500_ID
        ? getAeroqualS5000()
        : sensorType === TIGER_XT_ID
        ? getTigerXt()
        : (() => {
            throw new Error(`unsupported sensor type ${sensorType}`);
          })());
      return mod;
    },
    cacheTime: 1e9,
  });
};
