import * as download from "./download.ts";
import * as mapbox from "./mapbox.ts";
export * from "./download.ts";
export const getResources = () => {
  return { download, mapbox };
};
