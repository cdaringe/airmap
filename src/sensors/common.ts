import { useQuery } from "react-query";
import { SensorDownloadHook } from "./inferaces";

export const NO_SENSOR_ID = 0;
export const PL_ID = 1;
export const FLOW_ID = 2;

export const useSensorMappingResources = (sensorType: number) => {
  return useQuery(`get-mapping-${sensorType}`, async () => {
    const useSensor = await (sensorType === PL_ID
      ? import("./purplelabs/data")
      : sensorType === FLOW_ID
      ? import("./flow/data")
      : (() => {
          throw new Error(`unsupported sensor type ${sensorType}`);
        })());
    return useSensor;
  });
};
