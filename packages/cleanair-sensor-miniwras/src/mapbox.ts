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
  "black",
];

type EntryKeys = keyof Entry;

const PM2_FIELD_NAME: EntryKeys = "pm_2_5" as const;
const PM2_CALIBRATED_FIELD_NAME: EntryKeys = "pm05To3Calibrated" as const;
const PM05_FIELD_NAME: EntryKeys = "pm05" as const;
const PM05_CALIBRATED_FIELD_NAME: EntryKeys = "pm05Calibrated" as const;

const FIXED_PM2_LEVEL_RANGES: [number, number][] = [
  0, 0.25, 0.5, 1, 2.5, 5, 20,
].map((lower, i, arr) => {
  const upper = arr[i + 1] || Infinity;
  return [lower, upper] as [number, number];
});

export const makeGetLevels: (fieldName: keyof Entry) => MapGetLevels<Entry> =
  (fieldName) =>
  ({ isMinMaxDynamicRange, geojson }) => {
    let current = 0;
    let min = Infinity;
    let max = -Infinity;
    for (const feature of geojson.features) {
      current = feature.properties[fieldName] as number;
      if (current > max) max = current;
      if (current < min) min = current;
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
        .map(tupleAsMapboxRange(["get" as const, fieldName]))
        .flatMap((condition, i) => [condition, COLORS[i]]),
      colors: COLORS,
      fieldName,
      ranges,
    };
  };

export const getLevelsByField = {
  ["PM0.5 μg/m^3"]: makeGetLevels("pm05"),
  ["PM2.5 μg/m^3"]: makeGetLevels("pm_2_5"),
  ["PM0.5 μg/m^3 (calibrated)"]: makeGetLevels("pm05Calibrated"),
  ["PM0.5-3 μg/m^3 (calibrated)"]: makeGetLevels("pm05To3Calibrated"),
};

export const getLevels = getLevelsByField["PM0.5 μg/m^3"];
