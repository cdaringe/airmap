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
  try {
    return JSON.parse(window.localStorage.getItem("datasource")!);
  } catch (err) {
    return { url: "", datasource: "googlesheetsurl" };
  }
};
