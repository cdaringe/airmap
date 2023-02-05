import * as download from "./download.ts";
import * as mapbox from "./mapbox.ts";
import * as stream from "./streams/parse-pocketlabs-stream";
export * from "./download.ts";
export const getResources = () => {
  return { download, mapbox, stream };
};
