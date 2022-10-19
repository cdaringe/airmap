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
  onSensorTypeChange: (sensorType: number) => void;
  urls: string[];
  sensorType: number;
};

export const DataSourceWidget: FC<Props> = ({
  datasource,
  isRenderingUrlErrorState,
  isSubmitDisabled,
  onDatasourceSourceChange,
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
        className={`w-full mt-1 w-full`}
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
          className={`w-full mt-1 w-full`}
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
      <Button
        disabled={isSubmitDisabled}
        className="block m-auto mt-2"
        bg={isSubmitDisabled ? "bg-gray-300" : undefined}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </>
  );
};
