import type { Map } from "mapbox-gl";
import { RulerControl, StylesControl, ZoomControl } from "mapbox-gl-controls";

export default async function setupControls(map: Map) {
  map.addControl(new StylesControl(), "bottom-right");
  map.addControl(new ZoomControl(), "bottom-right");
  map.addControl(new RulerControl(), "bottom-right");
}
