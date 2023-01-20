import type { FC, HTMLProps } from "react";
import { DataSourceNames, DataSourceSelector } from "./DataSourceSelector";
import Input from "../atoms/input";
import Button from "../atoms/button";
import Select from "../atoms/select";
import {
  FLOW_ID,
  MINIWRAS_ID,
  NO_SENSOR_ID,
  POCKET_LABS_ID,
  AIRMAP_GPS_ID,
} from "../../../../../packages/cleanair-sensor-common/mod.ts";

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
  onUrlsChange: (urls: string[]) => void;
  onKmlChange: (kml: string) => void;
  onSensorTypeChange: (sensorType: number) => void;
  urls: string[];
  sensorType: number;
  luggage?: unknown;
};

export const DataSourceWidget: FC<Props> = ({
  datasource,
  isRenderingUrlErrorState,
  isSubmitDisabled,
  luggage,
  onDatasourceSourceChange,
  onKmlChange,
  onSubmit,
  onUrlsChange,
  onSensorTypeChange,
  sensorType,
  urls,
}) => {
  return (
    <>
      <p className="text-center text-gray-600 gray-200">
        Enter your datasource
      </p>
      <Select
        defaultValue={sensorType}
        placeholder="Select sensor type"
        className="w-full mt-1"
        onMouseOver={() => {
          if (sensorType === NO_SENSOR_ID) onSensorTypeChange(-1);
        }}
        onMouseOut={() => {
          if (sensorType < NO_SENSOR_ID) onSensorTypeChange(0);
        }}
        onChange={(evt) => {
          const nextId = evt.currentTarget.value;
          onUrlsChange([]);
          onSensorTypeChange(parseInt(nextId, 10));
        }}
      >
        <option disabled value={NO_SENSOR_ID}>
          Select sensor type...
        </option>
        <option value={FLOW_ID}>Flow</option>
        <option value={POCKET_LABS_ID}>PocketLabs</option>
        <option value={MINIWRAS_ID}>MiniWRAS</option>
        <option value={AIRMAP_GPS_ID}>airmap™ GPS</option>
      </Select>
      <DataSourceSelector
        required
        className="w-full mt-1"
        value={datasource}
        onChange={onDatasourceSourceChange}
      />
      <Input
        key={`${sensorType}-url-1`}
        required
        error={isRenderingUrlErrorState}
        className={`w-full mt-1`}
        placeholder={
          sensorType === FLOW_ID
            ? "User Measures: https://url/to/data"
            : "https://url/to/data"
        }
        defaultValue={urls[0]}
        onChange={(evt) =>
          onUrlsChange([evt.currentTarget.value, urls[1]].filter(Boolean))
        }
      />
      {sensorType === FLOW_ID || sensorType === MINIWRAS_ID ? (
        <Input
          required
          key={`${sensorType}-url-2`}
          error={isRenderingUrlErrorState}
          className={`w-full mt-1`}
          placeholder="User Positions: https://url/to/data"
          defaultValue={urls[1]}
          onChange={(evt) => onUrlsChange([urls[0], evt.currentTarget.value])}
        />
      ) : null}
      {isRenderingUrlErrorState ? (
        <p className="text-sm text-left text-red-600">
          Sheets URL must have the form:
          <br />
          https://docs.google.com/spreadsheets/d/:id/gviz/tq
        </p>
      ) : null}
      {sensorType === MINIWRAS_ID ? (
        <div className="mt-1">
          <label
            htmlFor="kineticlitegps"
            className="p-2 text-white bg-blue-600 rounded hover:cursor-pointer"
          >
            Upload KineticLite GPS
          </label>
          <input
            type="file"
            onChange={async (evt) => {
              const files = evt.target?.files;
              if (!files) throw new Error("null files");
              const [file] = files;
              const text = await file.text();
              onKmlChange(text);
            }}
            aria-label="gps upload"
            className="hidden"
            accept=".kml"
            id="kineticlitegps"
            name="kineticlitegps"
          ></input>
          {luggage ? "> Uploaded" : null}
        </div>
      ) : null}
      <Button
        disabled={isSubmitDisabled}
        className="block m-auto mt-2"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </>
  );
};