import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  AEROQUAL_S500_ID,
  MINIWRAS_ID,
} from "../../../../packages/cleanair-sensor-common/mod";
import { useDataSource } from "../components/data-source/use-data-source";

export const isLuggageBackedDatasource = (
  sensorType: number,
  luggage: any
): luggage is any =>
  (sensorType === MINIWRAS_ID || sensorType === AEROQUAL_S500_ID) && luggage;

export const useHandleNoDatasource = () => {
  const {
    value: { luggage, urls, sensorType },
  } = useDataSource();
  const router = useRouter();
  useEffect(() => {
    if (isLuggageBackedDatasource(sensorType, luggage)) {
      return;
    }
    if (!urls.length || urls.some((url) => !url)) {
      console.warn("no datasource detected, routing back to homepage");
      router.push("/");
    }
  }, [urls, router, sensorType, luggage]);
};
