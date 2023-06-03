import * as download from "./download/mod";
import * as mapbox from "./mapbox";
import { Entry } from "./interfaces";
import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";

export const getResources = (): MappingResourcesMod<Entry> => {
  return { download, mapbox };
};
