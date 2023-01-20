import { DataSourceWidget } from "../data-source/DataSourceWidget";
import {
  isGoogleSheetsCompatibleUrl,
  toSheetsDataExportUrl,
} from "../../../../../packages/cleanair-google-sheets/mod.ts";
import { useDataSource, DataSource } from "../data-source/use-data-source";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useMapAuth } from "../mapping/use-map-auth";
import Button from "../atoms/button";
import {
  POCKET_LABS_ID,
  FLOW_ID,
  MINIWRAS_ID,
} from "../../../../../packages/cleanair-sensor-common/mod.ts";

type DSKey = keyof DataSource;
type DsUpdateFn = <K extends DSKey>(k: K, v: DataSource[K]) => void;

const isDev = process.env.NODE_ENV !== "production";

const NO_SENSOR_ID = 0;

export default function Home() {
  const { value, update: rawUpdate } = useDataSource();
  const { urls, datasource, sensorType, luggage } = value;
  const update = useCallback<DsUpdateFn>(
    (key, v) => rawUpdate({ ...value, [key]: v }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );
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
    !isValidDataUrl ||
    !accessToken ||
    sensorType === NO_SENSOR_ID ||
    (sensorType === MINIWRAS_ID && !luggage);
  return (
    <form
      className="max-w-screen-md content home w-96"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <h1 className="text-4xl text-center">airmap!</h1>
      <DataSourceWidget
        {...{
          isSubmitDisabled,
          luggage,
          datasource,
          sensorType,
          isRenderingUrlErrorState,
          onDatasourceSourceChange: (evt) =>
            update("datasource", evt.currentTarget.value as "googlesheetsurl"),
          onSensorTypeChange: (s) => update("sensorType", s),
          onUrlsChange: (urls) => update("urls", urls),
          onKmlChange: (kml) => update("luggage", kml),
          urls,
          onSubmit: () => {
            if (isSubmitDisabled) {
              return;
            }
            update(
              "urls",
              urls.map((url) => toSheetsDataExportUrl(url))
            );
            router.push("/map");
          },
        }}
      />
      {isDev ? (
        <>
          <Button
            onClick={() =>
              rawUpdate({
                luggage,
                datasource: "csvurl",
                sensorType: MINIWRAS_ID,
                urls: [
                  "https://docs.google.com/spreadsheets/d/1XqB95gipLDOOsCfYFMV1RXREYUp14POM0fnV1hNRekA/edit#gid=802667302",
                  "https://docs.google.com/spreadsheets/d/1M7m01WPZJ6qG0hSgpEyRO977LOViQfanGpqy_GXSxY0/edit#gid=1094314331",
                ].map((url) => toSheetsDataExportUrl(url)),
              })
            }
          >
            default miniwras
          </Button>
          <Button
            onClick={() =>
              rawUpdate({
                luggage,
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
              rawUpdate({
                luggage,
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
