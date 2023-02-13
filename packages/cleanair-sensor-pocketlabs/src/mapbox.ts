import {
  MapGetLevels,
  tupleAsMapboxRange,
} from "../../cleanair-sensor-common/mod";
import { Entry } from "./interfaces";

const PM2_CORRECTED_FIELD_NAME = "pm_2_5";

const COLORS = [
  "#4d0173",
  "#991113",
  "#ff5600",
  "#ffaa00",
  "#feff00",
  "#6fc400",
  "#3aa702",
].reverse();

let mapBoxGetPM2Field: ["get", string] = ["get", PM2_CORRECTED_FIELD_NAME];

const FIXED_PM2_LEVEL_RANGES: [number, number][] = [
  0, 0.25, 0.5, 1, 2.5, 5, 20,
].map((lower, i, arr) => {
  const upper = arr[i + 1] || Infinity;
  return [lower, upper] as [number, number];
});

export const getLevels: MapGetLevels<Entry> = ({
  isMinMaxDynamicRange,
  geojson,
}) => {
  let currentPm2 = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const feature of geojson.features) {
    currentPm2 = feature.properties.pm_2_5;
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
    : FIXED_PM2_LEVEL_RANGES;
  return {
    fieldName: PM2_CORRECTED_FIELD_NAME,
    colors: COLORS,
    ranges,
    circleCases: ranges
      .map(tupleAsMapboxRange(mapBoxGetPM2Field))
      .flatMap((condition, i) => [condition, COLORS[i]]),
  };
};
