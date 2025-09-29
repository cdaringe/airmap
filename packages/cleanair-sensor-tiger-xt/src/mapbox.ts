import {
  MapGetLevels,
  tupleAsMapboxRange,
} from "../../cleanair-sensor-common/mod";
import { Entry } from "./interfaces";

const METRIC_NAME = "isobutylene";

const COLORS = [
  "#4d0173",
  "#991113",
  "#ff5600",
  "#ffaa00",
  "#feff00",
  "#6fc400",
  "#3aa702",
].reverse();

let mapBoxGetIsobutyField: ["get", string] = ["get", METRIC_NAME];

// Isobutylene concentration ranges in ppb
const LEVEL_RANGES: [number, number][] = [0, 50, 100, 150, 200, 250, 300].map(
  (lower, i, arr) => {
    const upper = arr[i + 1] || Infinity;
    return [lower, upper] as [number, number];
  }
);

export const getLevels: MapGetLevels<Entry> = ({
  isMinMaxDynamicRange,
  geojson,
}) => {
  let currentIsobu = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const feature of geojson.features) {
    currentIsobu = feature.properties[METRIC_NAME] as number;
    if (currentIsobu > max) max = currentIsobu;
    if (currentIsobu < min) min = currentIsobu;
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
      .map(tupleAsMapboxRange(mapBoxGetIsobutyField))
      .flatMap((condition, i) => [condition, COLORS[i]]),
  };
};
