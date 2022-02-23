import { GeoJSONLayer } from "react-mapbox-gl";
import React, { useState } from "react";
import type { MapMouseEvent, CircleLayout, CirclePaint } from "mapbox-gl";

type GeoPoint = GeoJSON.Feature<GeoJSON.Point>;

export type Props = {
  circleCases?: any[];
  geojson: GeoJSON.GeoJSON;
  onSelectFeature: (feature: GeoPoint) => void;
};

const circleLayout: CircleLayout = { visibility: "visible" };
const circlePaintPm2: (cases: any[]) => CirclePaint = (cases) => ({
  "circle-color": ["case", ...cases, "black"],
  "circle-radius": 5,
});

export const PollutionLayer: React.FC<Props> = ({
  geojson,
  onSelectFeature,
  circleCases = [],
}) => {
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
        data: geojson,
        circleLayout,
        circlePaint: circlePaintPm2(circleCases),
        circleOnClick,
        circleOnMouseEnter,
        circleOnMouseLeave,
      }}
    />
  );
};
