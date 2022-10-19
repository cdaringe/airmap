import { createModule as createDownloadModule } from "./download/mod.ts";
import { ModResources } from "./interfaces.ts";
import * as mapbox from "./mapbox.ts";

export const getResources = (r: ModResources) => {
  const download = createDownloadModule(r);
  return { download, mapbox };
};
