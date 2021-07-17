import React from "react";

export type DataSource = {
  datasource: "googlesheetsurl" | "csvurl";
  url: string;
};

export type DataSourceContext = {
  value: DataSource;
  update: (ds: DataSource) => void;
};
export const ctx = React.createContext<DataSourceContext>({
  value: {
    datasource: "googlesheetsurl",
    url: "",
  },
  update: () => {},
});
export const DataSourceProvider = ctx.Provider;
ctx.displayName = "DataSource";

export const useDataSource = () => React.useContext(ctx);

export const persist = (v: DataSource) =>
  window.localStorage.setItem("datasource", JSON.stringify(v));
export const read = (): DataSource => {
  const defaultValue: DataSource = { url: "", datasource: "googlesheetsurl" };
  try {
    const stored = window.localStorage.getItem("datasource");
    if (!stored) return defaultValue;
    return JSON.parse(stored);
  } catch (err) {
    return defaultValue;
  }
};
