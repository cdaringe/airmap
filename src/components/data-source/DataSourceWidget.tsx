import React from "react";
import { DataSourceNames, DataSourceSelector } from "./DataSourceSelector";
import Input from "../atoms/input";

export type DataSource = {
  url: string;
  datasource: DataSourceNames;
};

type Props = {
  datasource: string;
  onDatasourceSourceChange: React.HTMLProps<HTMLSelectElement>["onChange"];
  isRenderingUrlErrorState: boolean;
  url: string;
  onUrlChange: React.HTMLProps<HTMLInputElement>["onChange"];
};

export const DataSourceWidget: React.FC<Props> = ({
  datasource,
  url,
  onDatasourceSourceChange,
  isRenderingUrlErrorState,
  onUrlChange,
}) => {
  return (
    <>
      <p className="gray-200 text-gray-600 text-center">
        Enter your datasource
      </p>
      <DataSourceSelector
        className="w-full mt-1"
        value={datasource}
        onChange={onDatasourceSourceChange}
      />
      <Input
        error={isRenderingUrlErrorState}
        className={`w-full mt-1 w-full`}
        placeholder="https://url/to/data"
        defaultValue={url}
        onChange={onUrlChange}
      />
      {isRenderingUrlErrorState ? (
        <p className="text-red-600 text-left text-sm">
          Sheets URL must have the form:
          <br />
          https://docs.google.com/spreadsheets/d/:id/gviz/tq
        </p>
      ) : null}
    </>
  );
};
