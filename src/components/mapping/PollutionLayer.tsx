import { GeoJSONLayer } from "react-mapbox-gl";
import React from "react";
import type { MapMouseEvent, CircleLayout, CirclePaint } from "mapbox-gl";

let fieldpm2 = ["get", "PM2.5"];

const setFieldPm2 = (v: string) => {
  fieldpm2[1] = v;
};

const colors = [
  "#4d0173",
  "#991113",
  "#ff5600",
  "#ffaa00",
  "#feff00",
  "#6fc400",
  "#3aa702",
].reverse();
const lvl_pm2_1 = ["<=", fieldpm2, 0.25];
const lvl_pm2_2 = ["all", [">", fieldpm2, 0.25], ["<=", fieldpm2, 0.5]];
const lvl_pm2_3 = ["all", [">", fieldpm2, 0.5], ["<=", fieldpm2, 1]];
const lvl_pm2_4 = ["all", [">", fieldpm2, 1], ["<=", fieldpm2, 2.5]];
const lvl_pm2_5 = ["all", [">", fieldpm2, 2.5], ["<=", fieldpm2, 5]];
const lvl_pm2_6 = ["all", [">", fieldpm2, 5], ["<=", fieldpm2, 20]];
const lvl_pm2_7 = [">", fieldpm2, 20];

const pm2_levels = [
  lvl_pm2_1,
  lvl_pm2_2,
  lvl_pm2_3,
  lvl_pm2_4,
  lvl_pm2_5,
  lvl_pm2_6,
  lvl_pm2_7,
];

type GeoPoint = GeoJSON.Feature<GeoJSON.Point>;

export type Props = {
  geojson: GeoJSON.GeoJSON;
  onSelectFeature: (feature: GeoPoint) => void;
  type: "PM2.5" | "pm25Corrected" | "voc";
};

const circleLayout: CircleLayout = { visibility: "visible" };
const circlePaintPm2: CirclePaint = {
  "circle-color": [
    "case",
    ...pm2_levels.flatMap((condition, i) => [condition, colors[i]]),
    "black",
  ],
  "circle-radius": 5,
};

const circlePaintVoc: CirclePaint = {
  "circle-color": [
    "case",
    ...pm2_levels.flatMap((condition, i) => [condition, colors[i]]),
    "black",
  ],
  "circle-radius": 5,
};

export const PollutionLayer: React.FC<Props> = ({
  geojson,
  onSelectFeature,
  type,
}) => {
  setFieldPm2(
    type === "pm25Corrected"
      ? "PM2.5 Corrected"
      : type === "PM2.5"
      ? "PM2.5"
      : type
  );
  const circleOnClick = React.useCallback(
    (evt: MapMouseEvent) => {
      evt.preventDefault();
      const [feature] = evt.target.queryRenderedFeatures(evt.point);
      if (feature?.geometry.type === "Point") {
        onSelectFeature(feature as GeoPoint);
      } else {
        console.error(`no feature found under pointer :thinking:`, feature);
      }
    },
    [onSelectFeature]
  );
  const circleOnMouseEnter = React.useCallback((evt: MapMouseEvent) => {
    evt.target.getCanvas().style.cursor = "pointer";
  }, []);
  const circleOnMouseLeave = React.useCallback((evt: MapMouseEvent) => {
    evt.target.getCanvas().style.cursor = "";
  }, []);
  return (
    <GeoJSONLayer
      {...{
        id:
          type === "pm25Corrected"
            ? "pm25Corrected"
            : type === "PM2.5"
            ? "PM2.5"
            : type,
        data: geojson,
        circleLayout,
        circlePaint: type.startsWith("pm2") ? circlePaintPm2 : circlePaintVoc,
        circleOnClick,
        circleOnMouseEnter,
        circleOnMouseLeave,
      }}
    />
  );
};
