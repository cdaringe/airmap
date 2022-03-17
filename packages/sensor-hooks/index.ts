import { useQuery } from "react-query";

export const NO_SENSOR_ID = 0;
export const POCKET_LABS_ID = 1;
export const FLOW_ID = 2;

export const tupleAsMapboxRange =
  (getField: ["get", string]) =>
  ([aGTE, bLT]: [number, number]) =>
    ["all", [">=", getField, aGTE], ["<", getField, bLT]];

export const useSensorMappingResources = (sensorType: number) => {
  return useQuery({
    queryKey: `get-mapping-${sensorType}`,
    queryFn: async () => {
      const useSensor = await (sensorType === POCKET_LABS_ID
        ? import("cleanair-sensor-pocketlabs")
        : sensorType === FLOW_ID
        ? import("cleanair-sensor-flow")
        : (() => {
            throw new Error(`unsupported sensor type ${sensorType}`);
          })());
      return useSensor;
    },
    cacheTime: 1e9,
  });
};
