import { DataSourceWidget } from "../data-source/DataSourceWidget";
import {
  isGoogleSheetsCompatibleUrl,
  isValidHttpUrl,
  toSheetsDataExportUrl,
} from "../../http/validators";
import { useDataSource } from "../../components/data-source/use-data-source";
import { useRouter } from "next/router";
import React from "react";
import { useMapAuth } from "../mapping/use-map-auth";
import { FLOW_ID, NO_SENSOR_ID } from "../../sensors/common";

export default function Home() {
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
      className="content home w-96 max-w-screen-md"
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
