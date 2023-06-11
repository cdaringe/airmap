import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import * as download from "./download";
import { Entry } from "./interfaces";
import { mapbox } from "./mapbox";
import * as stream from "./streams/parse-stream";
export * from "./download";

export const getResources = () => {
  const base: MappingResourcesMod<Entry> = { download, mapbox };
  return { ...base, stream };
};
