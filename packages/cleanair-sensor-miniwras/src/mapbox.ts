import {
  MapGetLevels,
  tupleAsMapboxRange,
} from "../../cleanair-sensor-common/mod";
import { MiniWRASEntry } from "./interfaces";

const COLORS = [
  "#6fc400",
  "#feff00",
  "#ffaa00",
  "#ff5600",
  "#991113",
  "#4d0173",
  "black",
];

const PM2_FIELD_NAME = "pm_2_5" as const;
const SUB_500_NM_FIELD_NAME = "sub500nm" as const;
const FIXED_PM2_LEVEL_RANGES: [number, number][] = [
  0, 0.25, 0.5, 1, 2.5, 5, 20,
].map((lower, i, arr) => {
  const upper = arr[i + 1] || Infinity;
  return [lower, upper] as [number, number];
});

const mapBoxGetPM2Field: ["get", string] = ["get" as const, PM2_FIELD_NAME];
const mapBoxGetSub500nmField: ["get", string] = [
  "get" as const,
  SUB_500_NM_FIELD_NAME,
];

export const getLevels: MapGetLevels<MiniWRASEntry> = ({
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
    circleCases: ranges
      .map(tupleAsMapboxRange(mapBoxGetPM2Field))
      .flatMap((condition, i) => [condition, COLORS[i]]),
    colors: COLORS,
    fieldName: PM2_FIELD_NAME,
    ranges,
  };
};

export const getLevelsSub500nm: MapGetLevels<MiniWRASEntry> = ({
  isMinMaxDynamicRange,
  geojson,
}) => {
  let currentSub500 = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const feature of geojson.features) {
    currentSub500 = feature.properties.sub500nm;
    if (currentSub500 > max) max = currentSub500;
    if (currentSub500 < min) min = currentSub500;
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
    circleCases: ranges
      .map(tupleAsMapboxRange(mapBoxGetSub500nmField))
      .flatMap((condition, i) => [condition, COLORS[i]]),
    colors: COLORS,
    fieldName: SUB_500_NM_FIELD_NAME,
    ranges,
  };
};

export const getLevelsByField = {
  [PM2_FIELD_NAME]: getLevels,
  [SUB_500_NM_FIELD_NAME]: getLevelsSub500nm,
};
