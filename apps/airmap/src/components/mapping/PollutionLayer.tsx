import type {
  CircleLayerSpecification,
  GeoJSONFeature,
  MapMouseEvent,
} from "mapbox-gl";
import React from "react";
import { Layer, Source } from "react-map-gl";

type GeoPoint = GeoJSON.Feature<GeoJSON.Point>;

export type Props = {
  id: string;
  circleCases?: any[];
  geojson?: GeoJSON.GeoJSON;
};

const circleLayout: CircleLayerSpecification["layout"] = {
  visibility: "visible",
};
const circlePaintPm2: (cases: any[]) => CircleLayerSpecification["paint"] = (
  cases
) => ({
  "circle-color": ["case", ...cases, "black"],
  "circle-radius": 5,
});

export const usePollutionHandlers = ({
  onSelectFeature,
}: {
  onSelectFeature: (feature: GeoPoint) => void;
}) =>
  React.useMemo(
    () => ({
      layerId: "pollution",
      onClick(_evt: MapMouseEvent, feature: GeoJSONFeature) {
        if (feature.geometry.type === "Point") {
          onSelectFeature(feature as GeoPoint);
        }
      },
      onMouseEnter(evt: MapMouseEvent) {
        evt.target.getCanvas().style.cursor = "pointer";
      },
      onMouseLeave(evt: MapMouseEvent) {
        evt.target.getCanvas().style.cursor = "";
      },
    }),
    [onSelectFeature]
  );

export const PollutionLayer: React.FC<Props> = ({
  id,
  geojson,
  circleCases = [],
}) => {
  if (!geojson) {
    return null;
  }
  return (
    <Source id={id} type="geojson" data={geojson}>
      <Layer
        {...{
          id: id,
          type: "circle",
          layout: circleLayout,
          paint: circlePaintPm2(circleCases),
        }}
      />
    </Source>
  );
};
