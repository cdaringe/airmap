import { createModule as createDownloadModule } from "./download/mod";
import { ModResources } from "./interfaces";
import * as mapbox from "./mapbox";
import * as stream from "./streams/parse-measure-stream";

export const getResources = (r: ModResources) => {
  const download = createDownloadModule(r);
  return { download, mapbox, stream };
};
