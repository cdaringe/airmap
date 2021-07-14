import React from "react";
import { DataSourceNames, DataSourceSelector } from "./DataSourceSelector";
import Input from "../atoms/input";
import Button, { styles } from "../atoms/button";
import { useRouter } from "next/router";
import { useDataSource } from "./use-data-source";

export type DataSource = {
  url: string;
  datasource: DataSourceNames;
};

function isValidHttpUrl(string: string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export const DataSourceWidget: React.FC<{
  onChange: ({ url, datasource }: DataSource) => void;
}> = (props) => {
  const {
    value: { url, datasource },
    update,
  } = useDataSource();
  const isValidUrl = isValidHttpUrl(url) && url.match("gviz/tq");
  const router = useRouter();
  return (
    <div className="mt-2 w-4/5 p-2 text-center">
      <p className="">Enter your datasource</p>
      <DataSourceSelector
        className="w-full mt-1"
        value={datasource}
        onChange={(evt) => {
          update({
            url,
            datasource: evt.currentTarget.value as "googlesheetsurl",
          });
        }}
      />
      <Input
        className={`w-full mt-1 ${url && !isValidUrl ? "border-red-600" : ""}`}
        placeholder="https://url/to/data"
        onChange={(evt) => {
          update({ url: evt.currentTarget.value, datasource });
        }}
      />
      <Button
        disabled={!isValidUrl}
        className="block m-auto mt-2"
        bg={isValidUrl ? styles.bg : "bg-gray-300"}
        onClick={(evt) => {
          if (!isValidUrl) {
            evt.preventDefault();
            return;
          }
          window.localStorage.setItem(
            "datasource",
            JSON.stringify({ url, datasource })
          );
          router.push("map");
        }}
      >
        Submit
      </Button>
    </div>
  );
};
