import { FC, HTMLProps, useState, useEffect } from "react";
import { DataSourceNames, DataSourceSelector } from "./DataSourceSelector";
import Input from "../atoms/input";
import Button from "../atoms/button";
import useDrivePicker from "../google-drive-picker/picker";

export type DataSource = {
  url: string;
  datasource: DataSourceNames;
};

type Props = {
  datasource: string;
  isRenderingUrlErrorState: boolean;
  isSubmitDisabled?: boolean;
  onDatasourceSourceChange: HTMLProps<HTMLSelectElement>["onChange"];
  onSubmit: () => void;
  onUrlChange: (url: string) => void;
  url: string;
};

export const DataSourceWidget: FC<Props> = ({
  datasource,
  isRenderingUrlErrorState,
  isSubmitDisabled,
  onDatasourceSourceChange,
  onSubmit,
  onUrlChange,
  url,
}) => {
  const [isAutosubmitting, setIsAutosubmitting] = useState(false);
  const {
    open,
    isLoaded: isGoogleDrivePickerLoaded,
    error: googleDrivePickerError,
  } = useDrivePicker({
    clientId:
      "961166063373-si47f62e9dbvbl0ahb4lrpouqf52la6j.apps.googleusercontent.com",
    developerKey: "AIzaSyAgSzVhl0agLUrEbFow82k9csWtnARfaLY",
    onPreBuild: ({ builder, view }) => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      view
        // pdx clean air upload folder id
        .setParent("1RwxRnjTDHfYKMJA_e093jOt8OnMX4D9J")
        .setIncludeFolders(true)
        .setSelectFolderEnabled(false)
        .setMode(google.picker.DocsViewMode.LIST);
      builder
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .enableFeature(google.picker.Feature.SUPPORT_DRIVES)
        .setSize(vw < 1051 ? vw : 1051, vh < 650 ? vh : 650);
    },
    onSelect: (res) => {
      const editUrl = res.docs[0]?.url;
      const url = editUrl?.replace(/\/edit?.*/, "");
      if (url) onUrlChange(url);
      setIsAutosubmitting(true);
    },
  });
  useEffect(() => {
    isAutosubmitting && onSubmit();
  }, [isAutosubmitting, onSubmit]);
  const isGoogleDrive = datasource === DataSourceNames.googleDrive;
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
      {isGoogleDrive ? (
        <Button
          className="block m-auto mt-2 w-full"
          onClick={open}
          disabled={!isGoogleDrivePickerLoaded || !!googleDrivePickerError}
        >
          Click to select from Google Drive
        </Button>
      ) : (
        <Input
          error={isRenderingUrlErrorState}
          className={`w-full mt-1 w-full`}
          placeholder="https://url/to/data"
          defaultValue={url}
          onChange={(evt) => onUrlChange(evt.currentTarget.value)}
        />
      )}
      {isRenderingUrlErrorState ? (
        <p className="text-red-600 text-left text-sm">
          Sheets URL must have the form:
          <br />
          https://docs.google.com/spreadsheets/d/:id/gviz/tq
        </p>
      ) : null}

      {isGoogleDrive ? null : (
        <Button
          disabled={isSubmitDisabled}
          className="block m-auto mt-2"
          bg={isSubmitDisabled ? "bg-gray-300" : undefined}
          onClick={onSubmit}
        >
          Submit
        </Button>
      )}
    </>
  );
};
