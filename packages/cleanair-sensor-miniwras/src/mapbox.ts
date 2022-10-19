import {
  MapGetLevels,
  tupleAsMapboxRange,
} from "../../cleanair-sensor-common/mod.ts";
import { MiniWRASEntry } from "./interfaces.ts";

const COLORS = [
  "#6fc400",
  "#feff00",
  "#ffaa00",
  "#ff5600",
  "#991113",
  "#4d0173",
  "black",
];

const PM2_FIELD_NAME = "pm_2_7" as const;
const FIXED_PM2_LEVEL_RANGES: [number, number][] = [
  0, 0.25, 0.5, 1, 2.5, 5, 20,
].map((lower, i, arr) => {
  const upper = arr[i + 1] || Infinity;
  return [lower, upper] as [number, number];
});

let mapBoxGetPM2Field: ["get", string] = ["get" as const, PM2_FIELD_NAME];

export const getLevels: MapGetLevels<MiniWRASEntry> = ({
  isMinMaxDynamicRange,
  geojson,
}) => {
  let currentPm2 = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const feature of geojson.features) {
    currentPm2 = feature.properties.pm_2_7;
    if (currentPm2 > max) max = currentPm2;
    if (currentPm2 < min) min = currentPm2;
  }
  const numColors = COLORS.length;
  const levelSpan = isMinMaxDynamicRange ? (max - min) / numColors : 0;
  const pm2Ranges = isMinMaxDynamicRange
    ? [...new Array(numColors)].map((_, i) => {
        const base = min + i * levelSpan;
        return [base, base + levelSpan] as [number, number];
      })
    : FIXED_PM2_LEVEL_RANGES;
  return {
    circleCases: pm2Ranges
      .map(tupleAsMapboxRange(mapBoxGetPM2Field))
      .flatMap((condition, i) => [condition, COLORS[i]]),
    colors: COLORS,
    fieldName: PM2_FIELD_NAME,
    pm2Ranges,
  };
};
