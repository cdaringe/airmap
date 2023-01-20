import {
  MapGetLevels,
  tupleAsMapboxRange,
} from "../../cleanair-sensor-common/mod.ts";
import { FlowEntry } from "./interfaces.ts";

const COLORS = ["#6fc400"];

const PM2_FIELD_NAME = "_" as const;
const FIXED_PM2_LEVEL_RANGES: [number, number][] = [
  [0, 2_000],
  // [2_000, 4_000],
  // [4_000, 6_000],
  // [6_000, 8_000],
  // [8_000, 10_000],
  // [12_000, 1e9],
];

const mapBoxGetPM2Field: ["get", string] = ["get" as const, PM2_FIELD_NAME];

export const getLevels: MapGetLevels<FlowEntry> = ({
  isMinMaxDynamicRange,
  geojson,
}) => {
  let currentPm2 = 0;
  const numColors = COLORS.length;
  const ranges = FIXED_PM2_LEVEL_RANGES;
  return {
    circleCases: ranges
      .map(tupleAsMapboxRange(mapBoxGetPM2Field))
      .flatMap((condition, i) => [condition, COLORS[i]]),
    colors: COLORS,
    fieldName: PM2_FIELD_NAME,
    ranges,
  };
};
