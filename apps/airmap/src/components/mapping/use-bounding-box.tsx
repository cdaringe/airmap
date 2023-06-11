import { bbox } from "@turf/turf";
import { useEffect } from "react";

export const useInitialBoundingBox = (
  geojson: GeoJSON.GeoJSON | undefined,
  onBoundingBox: (bounds: any) => void
) =>
  useEffect(() => {
    if (!geojson) return;
    const bounds = bbox(geojson);
    if (bounds[0] <= -Infinity || bounds[0] >= Infinity) {
      console.error("infinity detected. bounds skipped");
      return;
    }
    // @todo [[n,n], [n,n]] vs [n,n,n,n]
    onBoundingBox(bounds as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geojson]);
