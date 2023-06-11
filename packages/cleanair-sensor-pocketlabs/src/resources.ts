import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import * as download from "./download";
import { Entry } from "./interfaces";
import * as mapbox from "./mapbox";
import * as stream from "./streams/parse-pocketlabs-stream";
export * from "./download";

export const getResources = () => {
  const base: MappingResourcesMod<Entry> = { download, mapbox };
  return { ...base, stream };
};
