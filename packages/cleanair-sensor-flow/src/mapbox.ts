import {
  MapGetLevels,
  tupleAsMapboxRange,
} from "../../cleanair-sensor-common/mod";
import { Entry } from "./interfaces";

const COLORS = [
  "#6fc400",
  "#feff00",
  "#ffaa00",
  "#ff5600",
  "#991113",
  "#4d0173",
];

const PM2_FIELD_NAME = "voc_ppb" as const;
const FIXED_PM2_LEVEL_RANGES: [number, number][] = [
  [0, 2_000],
  [2_000, 4_000],
  [4_000, 6_000],
  [6_000, 8_000],
  [8_000, 10_000],
  [12_000, 1e9],
];

const mapBoxGetPM2Field: ["get", string] = ["get" as const, PM2_FIELD_NAME];

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
    circleCases: ranges
      .map(tupleAsMapboxRange(mapBoxGetPM2Field))
      .flatMap((condition, i) => [condition, COLORS[i]]),
    colors: COLORS,
    fieldName: PM2_FIELD_NAME,
    ranges,
  };
};
