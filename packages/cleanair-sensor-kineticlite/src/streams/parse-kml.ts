import { toGeoJSON } from "./togeojson";

export const toGeoJson = (kmlContent: unknown) => {
  const xmlDoc = new DOMParser().parseFromString(kmlContent, "application/xml");
  return toGeoJSON.kml(xmlDoc);
};
