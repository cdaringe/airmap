import React from "react";
import { NO_SENSOR_ID } from "../../../../../packages/cleanair-sensor-common/mod.ts";

export type DataSource = {
  datasource: "googlesheetsurl" | "csvurl";
  sensorType: number;
  urls: string[];
  luggage?: any;
};

export type DataSourceContext = {
  value: DataSource;
  update: (ds: DataSource) => void;
};
export const ctx = React.createContext<DataSourceContext>({
  value: {
    datasource: "googlesheetsurl",
    sensorType: NO_SENSOR_ID,
    urls: [],
    luggage: null,
  },
  update: () => {},
});
export const DataSourceProvider = ctx.Provider;
ctx.displayName = "DataSource";

export const useDataSource = () => React.useContext(ctx);

export const persist = (v: DataSource) =>
  window.localStorage.setItem("datasource", JSON.stringify(v));
export const read = (): DataSource => {
  const defaultValue: DataSource = {
    urls: [],
    sensorType: NO_SENSOR_ID,
    datasource: "googlesheetsurl",
    luggage: null,
  };
  try {
    const stored = window.localStorage.getItem("datasource");
    if (!stored) return defaultValue;
    return JSON.parse(stored);
  } catch (err) {
    return defaultValue;
  }
};
