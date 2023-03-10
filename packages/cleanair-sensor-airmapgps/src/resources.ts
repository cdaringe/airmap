import { createModule as createDownloadModule } from "./download/mod";
import * as mapbox from "./mapbox";
import { Entry, ModResources } from "./interfaces";
import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";

export const getResources = (r: ModResources): MappingResourcesMod<Entry> => {
  const download = createDownloadModule(r);
  return { download, mapbox };
};
