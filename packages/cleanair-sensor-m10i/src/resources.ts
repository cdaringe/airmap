import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import * as download from "./download";
import { mapbox } from "./mapbox";
export * from "./download";
import { Entry } from "./interfaces";
import * as stream from "./streams/parse-stream";

export const getResources = () => {
  const base: MappingResourcesMod<Entry> = { download, mapbox };
  return { ...base, stream };
};
