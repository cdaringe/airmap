import { toGeoJSON } from "./togeojson.ts";

export const toGeoJson = (kmlContent: unknown) => {
  const xmlDoc = new DOMParser().parseFromString(kmlContent, "application/xml");
  return toGeoJSON.kml(xmlDoc);
};
