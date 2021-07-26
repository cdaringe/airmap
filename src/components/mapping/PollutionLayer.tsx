import { GeoJSONLayer } from "react-mapbox-gl";
import React from "react";
import type { MapMouseEvent, CircleLayout, CirclePaint } from "mapbox-gl";

const fieldpm2 = ["get", "PM2.5 Corrected"];

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
};

const circleLayout: CircleLayout = { visibility: "visible" };
const circlePaint: CirclePaint = {
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
}) => {
  const circleOnClick = React.useCallback(
    (evt: MapMouseEvent) => {
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
        id: "pm25Corrected",
        data: geojson,
        circleLayout,
        circlePaint,
        circleOnClick,
        circleOnMouseEnter,
        circleOnMouseLeave,
      }}
    />
  );
};
