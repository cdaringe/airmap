import { useRouter } from "next/router";
import { useEffect } from "react";
import { MINIWRAS_ID } from "../../../../packages/cleanair-sensor-common/mod";
import { useDataSource } from "../components/data-source/use-data-source";

const isMiniWrasOk = (sensorType: number, luggage: any) =>
  sensorType === MINIWRAS_ID && luggage;

export const useHandleNoDatasource = () => {
  const {
    value: { luggage, urls, sensorType },
  } = useDataSource();
  const router = useRouter();
  useEffect(() => {
    if (isMiniWrasOk(sensorType, luggage)) {
      return;
    }
    if (!urls.length || urls.some((url) => !url)) {
      console.warn("no datasource detected, routing back to homepage");
      router.push("/");
    }
  }, [urls, router, sensorType, luggage]);
};
