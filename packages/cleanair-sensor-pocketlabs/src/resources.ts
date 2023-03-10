import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import * as download from "./download";
import * as mapbox from "./mapbox";
export * from "./download";
import { Entry } from "./interfaces";
import * as stream from "./streams/parse-pocketlabs-stream";

export const getResources = () => {
  const base: MappingResourcesMod<Entry> = { download, mapbox };
  return { ...base, stream };
};
