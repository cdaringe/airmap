import { useEffect } from "react";
import { bbox } from "@turf/turf";

export const useBoundingBox = (
  geojson: GeoJSON.GeoJSON | undefined,
  onBoundingBox: (bounds: any) => void
) =>
  useEffect(() => {
    if (!geojson) return;
    const bounds = bbox(geojson);
    if (bounds[0] <= -Infinity || bounds[0] >= Infinity) {
      console.error("infitity detected. bounds skipped");
      return;
    }
    // @todo [[n,n], [n,n]] vs [n,n,n,n]
    onBoundingBox(bounds as any);
  }, [geojson, onBoundingBox]);
