import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import * as download from "./download";
import { TigerXtOnlyEntry } from "./interfaces";
import * as mapbox from "./mapbox";
import * as stream from "./streams/parse-stream";
export * from "./download";

export const getResources = () => {
  const base: MappingResourcesMod<TigerXtOnlyEntry> = {
    download,
    mapbox,
  };
  const resources = { ...base, stream };
  return resources;
};
