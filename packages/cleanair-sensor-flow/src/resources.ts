import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import * as download from "./download/mod";
import { Entry } from "./interfaces";
import * as mapbox from "./mapbox";

export const getResources = (): MappingResourcesMod<Entry> => {
  return { download, mapbox };
};
