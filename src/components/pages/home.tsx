import { DataSourceWidget } from "../data-source/DataSourceWidget";
import {
  isGoogleSheetsCompatibleUrl,
  isValidHttpUrl,
  toSheetsDataExportUrl,
} from "../../http/validators";
import { useDataSource } from "../../components/data-source/use-data-source";
import { useRouter } from "next/router";
import Button, { styles } from "../../components/atoms/button";
import React from "react";
import { useMapAuth } from "../mapping/use-map-auth";
import Input from "../atoms/input";

export default function Home() {
  const {
    value: { url, datasource },
    update,
  } = useDataSource();
  const {
    value: { accessToken },
    update: updateMapAuth,
  } = useMapAuth();
  const isValidGvizUrl = isValidHttpUrl(url) && url.match("gviz/tq");
  const isValidDataUrl = isValidGvizUrl || isGoogleSheetsCompatibleUrl(url);
  const router = useRouter();
  const isRenderingUrlErrorState = !!(url && !isValidDataUrl);
  const isSubmitDisabled = !isValidDataUrl || !accessToken;
  return (
    <form
      className="content home w-96 max-w-screen-md"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <h1 className="text-4xl text-center">airmap!</h1>
      <DataSourceWidget
        {...{
          datasource,
          onDatasourceSourceChange: (evt) => {
            update({
              url,
              datasource: evt.currentTarget.value as "googlesheetsurl",
            });
          },
          isRenderingUrlErrorState,
          onUrlChange: (evt) => {
            update({ url: evt.currentTarget.value, datasource });
          },
          url,
        }}
      />
      <Input
        className="w-full mt-1"
        type="password"
        placeholder="mapbox access token"
        defaultValue={accessToken}
        onChange={(evt) => {
          updateMapAuth({
            accessToken: evt.currentTarget.value,
          });
        }}
      ></Input>
      <Button
        disabled={isSubmitDisabled}
        className="block m-auto mt-2"
        bg={isSubmitDisabled ? "bg-gray-300" : styles.bg}
        onClick={(evt) => {
          if (isSubmitDisabled) {
            evt.preventDefault();
            return;
          }
          const isSCU = isGoogleSheetsCompatibleUrl(url);
          if (!isValidGvizUrl && isSCU) {
            update({
              datasource,
              url: toSheetsDataExportUrl(url),
            });
          }
          router.push("/map");
        }}
      >
        Submit
      </Button>
    </form>
  );
}
