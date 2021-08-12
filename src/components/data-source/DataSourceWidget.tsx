import React from "react";
import { DataSourceNames, DataSourceSelector } from "./DataSourceSelector";
import Input from "../atoms/input";
import Button from "../atoms/button";
import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

export type DataSource = {
  url: string;
  datasource: DataSourceNames;
};

type Props = {
  datasource: string;
  onDatasourceSourceChange: React.HTMLProps<HTMLSelectElement>["onChange"];
  isRenderingUrlErrorState: boolean;
  url: string;
  onUrlChange: (url: string) => void;
};

export const DataSourceWidget: React.FC<Props> = ({
  datasource,
  url,
  onDatasourceSourceChange,
  isRenderingUrlErrorState,
  onUrlChange,
}) => {
  const [openPicker, data] = useDrivePicker();
  const handleOpenPicker = React.useCallback(() => {
    openPicker({
      clientId:
        "961166063373-si47f62e9dbvbl0ahb4lrpouqf52la6j.apps.googleusercontent.com",
      developerKey: "AIzaSyAgSzVhl0agLUrEbFow82k9csWtnARfaLY",
      viewId: "SPREADSHEETS",
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: false,
    });
  }, [openPicker]);
  useEffect(() => {
    if (!data || data.action !== "picked") return;
    console.log({ data });
    const url = data.docs[0]?.url;
    if (url) onUrlChange(url);
  }, [data, onUrlChange]);
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
      <hr />
      or
      <Button bg="" onClick={handleOpenPicker}>
        Select Google Drive
      </Button>
      <Input
        error={isRenderingUrlErrorState}
        className={`w-full mt-1 w-full`}
        placeholder="https://url/to/data"
        defaultValue={url}
        onChange={(evt) => onUrlChange(evt.currentTarget.value)}
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
