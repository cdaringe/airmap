import { createModule as createDownloadModule } from "./download/mod";
import * as mapbox from "./mapbox";
import { Entry, ModResources } from "./interfaces";
import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";

export const getResources = (): MappingResourcesMod<Entry> => {
  const download = createDownloadModule();
  return { download, mapbox };
};
