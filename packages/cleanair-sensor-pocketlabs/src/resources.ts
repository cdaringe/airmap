import * as download from "./download";
import * as mapbox from "./mapbox";
import * as stream from "./streams/parse-pocketlabs-stream";
export * from "./download";
export const getResources = () => {
  return { download, mapbox, stream };
};
