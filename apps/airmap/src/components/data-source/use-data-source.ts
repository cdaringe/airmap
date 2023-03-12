import React from "react";
import { NO_SENSOR_ID } from "../../../../../packages/cleanair-sensor-common/mod";
import type { GeoJSONMiniWras } from "../../../../../packages/cleanair-sensor-miniwras/mod";

export type DataSource = {
  datasource: "googlesheetsurl" | "csvurl";
  sensorType: number;
  urls: string[];
  luggage?: GeoJSONMiniWras | null;
};

export type DataSourceContext = {
  value: DataSource;
  update: React.Dispatch<React.SetStateAction<DataSource>>;
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
    luggage: undefined,
  };
  try {
    const stored = window.localStorage.getItem("datasource");
    if (!stored) return defaultValue;
    return JSON.parse(stored, (k, v) => {
      // parse dates on re-hydration from storage
      if (k.match(/date/i)) {
        return new Date(v);
      }
      return v;
    });
  } catch (err) {
    return defaultValue;
  }
};
