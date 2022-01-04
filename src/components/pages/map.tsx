import Head from "next/head";
import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Props as MapProps } from "react-mapbox-gl/lib/map";
import { useDataSource } from "../data-source/use-data-source";
import dynamic from "next/dynamic";
import AirIcon from "../icon/svg/air";
import { PollutionLayer } from "../mapping/PollutionLayer";
import { useInitialBoundingBox } from "../mapping/use-bounding-box";
import { useHandleNoDatasource } from "../../hooks/use-handle-no-datasource";
import { useSensorMappingResources } from "../../sensors/common";
import { useQuery } from "react-query";

const controls = () => import("mapbox-gl-controls");

// map.addControl(new RulerControl(), 'top-right');
const MeasurementPopup = dynamic(() => import("../MeasurementPopup"));

const accessToken =
  "pk.eyJ1IjoicGR4Y2xlYW5haXIiLCJhIjoiY2tweDFuZmxpMjFmbzJ3bXVkajd4dDQ4dSJ9.LYiRB4TgOAckcqZGi-cUXg";

const normalizeMapboxUrl = (url: string, resourceType: string) => {
  var isMapboxRequest =
    url.slice(8, 22) === "api.mapbox.com" ||
    url.slice(10, 26) === "tiles.mapbox.com";
  return {
    url: isMapboxRequest ? url.replace("?", "?pluginName=sheetMapper&") : url,
  };
};

export default function Map() {
  useHandleNoDatasource();
  const [fitBounds, setFitBounds] = React.useState<MapProps["fitBounds"]>();
  const [center, setCenter] = React.useState<MapProps["center"]>([
    -122.66155, 45.54846,
  ]);
  const ds = useDataSource();
  const {
    value: { urls, sensorType },
  } = ds;
  const {
    isLoading: isSensorDownladerLoading,
    error: sensorDownloaderError,
    data: { download } = {},
  } = useSensorMappingResources(sensorType);
  const {
    isLoading: isDataLoading,
    error: dataDownloadError,
    data: { geojson, circleCases } = {},
  } = useQuery({
    // use `typeof download` to cache bust react-query when the download
    // function has not yet finished downloading
    queryKey: [...urls, typeof download],
    queryFn: () => {
      if (download) {
        return download(urls);
      }
    },
  });

  const error = sensorDownloaderError || dataDownloadError;
  const isLoading = isSensorDownladerLoading || isDataLoading;
  useInitialBoundingBox(geojson, setFitBounds);
  const { current: Map } = React.useRef(
    ReactMapboxGl({
      accessToken,
      transformRequest: normalizeMapboxUrl,
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
      <div className="p-2">
        <h1>Error</h1>
        <h2>Failed to load map data.</h2>
        <p>
          {typeof error === "string" ? (
            error
          ) : (
            <pre>{JSON.stringify(error, null, 2)}</pre>
          )}
        </p>
        <p>
          Are you sure your datasource is correct?
          <pre>{JSON.stringify(ds, null, 2)}</pre>
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
  const dataPoint = geojson?.features[0]?.properties as
    | Record<string, string>
    | undefined;
  if (!dataPoint) {
    return (
      <p className="p-2">
        The datafile provided could not be converted into geojson format.
        Generally, this occurs because the columns in the data sheet do not
        match the expected field names.
      </p>
    );
  }
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
          {geojson && (
            <PollutionLayer
              {...{
                geojson,
                circleCases,
                onSelectFeature: (feature) => {
                  if (fitBounds) setFitBounds(undefined);
                  if (center) {
                    setCenter(feature.geometry.coordinates as [number, number]);
                  }
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
