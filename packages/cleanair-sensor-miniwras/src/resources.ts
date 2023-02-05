import { createModule as createDownloadModule } from "./download/mod.ts";
import { ModResources } from "./interfaces.ts";
import * as mapbox from "./mapbox.ts";
import * as stream from "./streams/parse-measure-stream";

export const getResources = (r: ModResources) => {
  const download = createDownloadModule(r);
  return { download, mapbox, stream };
};
