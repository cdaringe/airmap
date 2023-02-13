import { createModule as createDownloadModule } from "./download/mod";
import * as mapbox from "./mapbox";
import { ModResources } from "./interfaces";

export const getResources = (r: ModResources) => {
  const download = createDownloadModule(r);
  return { download, mapbox };
};
