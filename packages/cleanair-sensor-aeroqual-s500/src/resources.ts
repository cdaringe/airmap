import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";
import * as download from "./download";
import { AeroqualS500OnlyEntry } from "./interfaces";
import * as mapbox from "./mapbox";
import * as stream from "./streams/parse-stream";
export * from "./download";

declare global {
  interface Window {
    __AEROQUAL_S500_SCALAR__?: number;
  }
}

export const getResources = () => {
  const base: MappingResourcesMod<AeroqualS500OnlyEntry> = {
    download,
    mapbox,

    processGeoJSONMemoKey() {
      return window.__AEROQUAL_S500_SCALAR__?.toString() ?? "";
    },
    processGeoJSON(geojson) {
      const scalar = window.__AEROQUAL_S500_SCALAR__;
      if (scalar == null) {
        return geojson;
      }
      return {
        ...geojson,
        features: geojson.features.map((f) => ({
          ...f,
          properties: {
            ...f.properties,
            tvoc: f.properties.tvoc * scalar,
          },
        })),
      };
    },
  };
  const resources = { ...base, stream };
  return resources;
};
