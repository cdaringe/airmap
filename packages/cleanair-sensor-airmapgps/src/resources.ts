import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import { createModule as createDownloadModule } from "./download/mod";
import { Entry } from "./interfaces";
import * as mapbox from "./mapbox";

export const getResources = (): MappingResourcesMod<Entry> => {
  const download = createDownloadModule();
  return { download, mapbox };
};
