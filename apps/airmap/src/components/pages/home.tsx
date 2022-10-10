import { DataSourceWidget } from "../data-source/DataSourceWidget";
import {
  isGoogleSheetsCompatibleUrl,
  toSheetsDataExportUrl,
} from "../../../../../packages/cleanair-google-sheets/mod.ts";
import { useDataSource } from "../data-source/use-data-source";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMapAuth } from "../mapping/use-map-auth";

const FLOW_ID = 1;
const NO_SENSOR_ID = 0;

export default function Home() {
  useEffect(() => {
    console.warn("home-mount");
    return () => console.warn("home-unmount");
  });
  const {
    value: { urls, datasource, sensorType },
    update,
  } = useDataSource();
  const {
    value: { accessToken },
    update: _updateMapAuth,
  } = useMapAuth();
  const isValidDataUrl =
    urls.every((url) => isGoogleSheetsCompatibleUrl(url)) &&
    (sensorType === FLOW_ID ? urls.length === 2 : true);
  const router = useRouter();
  const isRenderingUrlErrorState = !!(urls.length && !isValidDataUrl);
  const isSubmitDisabled =
    !isValidDataUrl || !accessToken || sensorType === NO_SENSOR_ID;
  return (
    <form
      className="max-w-screen-md content home w-96"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <h1 className="text-4xl text-center">airmap!</h1>
      <DataSourceWidget
        {...{
          isSubmitDisabled,
          datasource,
          sensorType,
          onDatasourceSourceChange: (evt) => {
            update({
              urls,
              sensorType,
              datasource: evt.currentTarget.value as "googlesheetsurl",
            });
          },
          isRenderingUrlErrorState,
          onSensorTypeChange: (sensorType) => {
            update({ urls, sensorType, datasource });
          },
          onUrlsChange: (urls) => {
            update({ urls, sensorType, datasource });
          },
          urls,
          onSubmit: () => {
            if (isSubmitDisabled) {
              return;
            }
            update({
              datasource,
              sensorType,
              urls: urls.map((url) => toSheetsDataExportUrl(url)),
            });
            router.push("/map");
          },
        }}
      />
    </form>
  );
}
