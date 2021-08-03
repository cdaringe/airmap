import Head from "next/head";
import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Props as MapProps } from "react-mapbox-gl/lib/map";
import { useQuery } from "react-query";
import { useDataSource } from "../data-source/use-data-source";
import { getFromCsvUrl, PM2_CORRECTED_FIELD_NAME } from "../data/air-quality";
import dynamic from "next/dynamic";
import AirIcon from "../icon/svg/air";
import { PollutionLayer } from "../mapping/PollutionLayer";
import { useInitialBoundingBox } from "../mapping/use-bounding-box";
import { useHandleNoDatasource } from "../../hooks/use-handle-no-datasource";

const controls = () => import("mapbox-gl-controls");

// map.addControl(new RulerControl(), 'top-right');
const MeasurementPopup = dynamic(() => import("../MeasurementPopup"));

const accessToken =
  "pk.eyJ1IjoicGR4Y2xlYW5haXIiLCJhIjoiY2tweDFuZmxpMjFmbzJ3bXVkajd4dDQ4dSJ9.LYiRB4TgOAckcqZGi-cUXg";

const transformRequest = (url: string, resourceType: string) => {
  var isMapboxRequest =
    url.slice(8, 22) === "api.mapbox.com" ||
    url.slice(10, 26) === "tiles.mapbox.com";
  return {
    url: isMapboxRequest ? url.replace("?", "?pluginName=sheetMapper&") : url,
  };
};

export default function Map() {
  useHandleNoDatasource();
  const {
    value: { url },
  } = useDataSource();
  let {
    isLoading,
    error,
    data: geojson,
  } = useQuery({
    queryKey: ["map-csv"],
    queryFn: () => getFromCsvUrl(url),
  });
  const [fitBounds, setFitBounds] = React.useState<MapProps["fitBounds"]>();
  const [center, setCenter] = React.useState<MapProps["center"]>([
    -122.66155, 45.54846,
  ]);
  useInitialBoundingBox(geojson, setFitBounds);
  const { current: Map } = React.useRef(
    ReactMapboxGl({
      accessToken,
      transformRequest,
    })
  );
  const [selectedFeature, setFeature] =
    React.useState<GeoJSON.Feature<GeoJSON.Point> | null>(null);
  const clearPopup = React.useCallback(
    () => selectedFeature && setFeature(null),
    [selectedFeature, setFeature]
  );
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>
          {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
        </p>
      </div>
    );
  }
  if (isLoading)
    return (
      <div className="flex flex-column w-full content justify-center">
        <AirIcon className="animate-spin w-20" />
      </div>
    );
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      {geojson?.features.length === 0 ? (
        <div className="p-4">
          <h1 className="text-xl">Missing data</h1>
          <p>The data has been downloaded, but is empty :/</p>
        </div>
      ) : (
        <Map
          onStyleLoad={async (map) => {
            const { RulerControl, ZoomControl, InspectControl, StylesControl } =
              await controls();
            if (process.env.NODE_ENV !== "production") {
              map.addControl(new InspectControl(), "top-right");
            }
            map.addControl(new StylesControl(), "bottom-right");
            map.addControl(new ZoomControl(), "bottom-right");
            map.addControl(new RulerControl(), "bottom-right");
          }}
          className="content w-full"
          fitBounds={fitBounds}
          center={center}
          style="mapbox://styles/pdxcleanair/ckpx7yno443sa17p6iy65qn95"
          containerStyle={{
            height: "100%",
            width: "100vw",
          }}
          onClick={clearPopup}
        >
          {geojson &&
            (geojson.features[0]?.properties as any)[
              PM2_CORRECTED_FIELD_NAME
            ] && (
              <PollutionLayer
                {...{
                  geojson,
                  onSelectFeature: (feature) => {
                    if (fitBounds) setFitBounds(undefined);
                    if (center)
                      setCenter(
                        feature.geometry.coordinates as [number, number]
                      );
                    setFeature(feature);
                  },
                }}
              />
            )}
          {selectedFeature ? (
            <MeasurementPopup
              title="Measurements"
              className="h-96 overflow-auto"
              feature={selectedFeature}
              onClick={(evt) => {
                evt.preventDefault();
              }}
            />
          ) : undefined}
        </Map>
      )}
    </>
  );
}
