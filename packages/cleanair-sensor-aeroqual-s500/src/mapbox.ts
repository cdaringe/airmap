import {
  MapGetLevels,
  tupleAsMapboxRange,
} from "../../cleanair-sensor-common/mod";
import { Entry } from "./interfaces";

const METRIC_NAME = "tvoc";

const COLORS = [
  "#4d0173",
  "#991113",
  "#ff5600",
  "#ffaa00",
  "#feff00",
  "#6fc400",
  "#3aa702",
].reverse();

let mapBoxGetPM2Field: ["get", string] = ["get", METRIC_NAME];

const LEVEL_RANGES: [number, number][] = [0, 1, 5, 10, 15, 20, 30].map(
  (lower, i, arr) => {
    const upper = arr[i + 1] || Infinity;
    return [lower, upper] as [number, number];
  }
);

export const getLevels: MapGetLevels<Entry> = ({
  isMinMaxDynamicRange,
  geojson,
}) => {
  let currentPm2 = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const feature of geojson.features) {
    currentPm2 = feature.properties[METRIC_NAME] as number;
    if (currentPm2 > max) max = currentPm2;
    if (currentPm2 < min) min = currentPm2;
  }
  const numColors = COLORS.length;
  const levelSpan = isMinMaxDynamicRange ? (max - min) / numColors : 0;
  const ranges = isMinMaxDynamicRange
    ? [...new Array(numColors)].map((_, i) => {
        const base = min + i * levelSpan;
        return [base, base + levelSpan] as [number, number];
      })
    : LEVEL_RANGES;
  return {
    fieldName: METRIC_NAME,
    colors: COLORS,
    ranges,
    circleCases: ranges
      .map(tupleAsMapboxRange(mapBoxGetPM2Field))
      .flatMap((condition, i) => [condition, COLORS[i]]),
  };
};
