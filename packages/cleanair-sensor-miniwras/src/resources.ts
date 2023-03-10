import type { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import type { Entry } from "./interfaces";
import * as mapbox from "./mapbox";
import * as stream from "./streams/parse-measure-stream";

export const getResources = () => {
  const base: MappingResourcesMod<Entry> = { mapbox };
  return { ...base, stream };
};
