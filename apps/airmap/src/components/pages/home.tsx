import { DataSourceWidget } from "../data-source/DataSourceWidget";
import {
  isGoogleSheetsCompatibleUrl,
  toSheetsDataExportUrl,
} from "../../../../../packages/cleanair-google-sheets/mod.ts";
import { useDataSource } from "../data-source/use-data-source";
import { useRouter } from "next/router";
import React from "react";
import { useMapAuth } from "../mapping/use-map-auth";
import Button from "../atoms/button";
import {
  POCKET_LABS_ID,
  FLOW_ID,
  MINIWRAS_ID,
} from "../../../../../packages/cleanair-sensor-common/mod.ts";
const isDev = process.env.NODE_ENV !== "production";

const NO_SENSOR_ID = 0;

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
      {isDev ? (
        <>
          <Button
            onClick={() =>
              update({
                datasource: "csvurl",
                sensorType: MINIWRAS_ID,
                urls: [
                  "https://docs.google.com/spreadsheets/d/1XqB95gipLDOOsCfYFMV1RXREYUp14POM0fnV1hNRekA/edit#gid=802667302",
                  "https://docs.google.com/spreadsheets/d/1l87PtfEy9vWAq4D0iDDh2dIYGZ8y6regd0Wk33kUH0c/edit#gid=2147112514",
                ].map((url) => toSheetsDataExportUrl(url)),
              })
            }
          >
            default miniwras
          </Button>
          <Button
            onClick={() =>
              update({
                datasource: "csvurl",
                sensorType: FLOW_ID,
                urls: [
                  "https://docs.google.com/spreadsheets/d/1x59PQjrKqN3NSORDaTAs557v0mloOosNTnqKhfrE3VU/edit#gid=585713925",
                  "https://docs.google.com/spreadsheets/d/15QJWTrn2RVG8C2q0SF7qjXDIMabg-OXDTYkjBRLWHrw/edit#gid=2147112514",
                ].map((url) => toSheetsDataExportUrl(url)),
              })
            }
          >
            default flow
          </Button>
          <Button
            onClick={() =>
              update({
                datasource: "csvurl",
                sensorType: POCKET_LABS_ID,
                urls: [
                  "https://docs.google.com/spreadsheets/d/1HZjTtvqMGZ7iNtVYW6vrzeSOHeHE144-B_6CH4REIC8/edit#gid=1094314331",
                ].map((url) => toSheetsDataExportUrl(url)),
              })
            }
          >
            default pocketlabs
          </Button>
        </>
      ) : null}
    </form>
  );
}
