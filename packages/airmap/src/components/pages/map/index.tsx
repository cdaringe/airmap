import React, { useMemo, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Props as MapProps } from "react-mapbox-gl/lib/map";
import { useDataSource } from "../../data-source/use-data-source";
import dynamic from "next/dynamic";
import Loading from "../../atoms/loading";
import { PollutionLayer } from "../../mapping/PollutionLayer";
import { useInitialBoundingBox } from "../../mapping/use-bounding-box";
import { useHandleNoDatasource } from "../../../hooks/use-handle-no-datasource";
import { useSensorMappingResources } from "../../../sensors/common";
import { useQuery } from "react-query";
import MapError from "./map.error";
import NoDatapoint from "./map.nodatapoint";
import MapCssLink from "./map.csslink";
import setupControls from "./map.setup-controls";

// map.addControl(new RulerControl(), 'top-right');
const MeasurementPopup = dynamic(() => import("../../MeasurementPopup"));

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
  const [isMinMaxDynamicRange, setIsMinMaxDynamicRange] = useState(true);
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
    data: { geojson, getLevels } = {},
  } = useQuery({
    // use `typeof download` to cache bust react-query when the download
    // function has not yet finished downloading
    queryKey: [...urls, typeof download],
    queryFn: () => download?.(urls),
    cacheTime: 1e9,
  });
  const pollutionLevels = useMemo(() => {
    if (!getLevels) return null;
    return getLevels(isMinMaxDynamicRange);
  }, [getLevels, isMinMaxDynamicRange]);

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
  if (error) return <MapError error={error} datasource={ds} />;
  if (isLoading) return <Loading />;
  const dataPoint = geojson?.features[0]?.properties as
    | Record<string, string>
    | undefined;
  if (!dataPoint) return <NoDatapoint />;
  return (
    <>
      <MapCssLink />
      {geojson?.features.length === 0 ? (
        <div className="p-4">
          <h1 className="text-xl">Missing data</h1>
          <p>The data has been downloaded, but is empty :/</p>
        </div>
      ) : (
        <Map
          onStyleLoad={setupControls}
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
                circleCases: pollutionLevels?.circleCases,
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
          <div className="map-overlay">
            <div className="map-overlay-control map-legend">
              <div style={{ fontWeight: "bold" }}>
                {pollutionLevels?.fieldName}
              </div>
              {pollutionLevels?.pm2Ranges.map(([lower, upper], i) => {
                return (
                  <div key={`${isMinMaxDynamicRange}-${i}`}>
                    <span
                      style={{ backgroundColor: pollutionLevels.colors[i] }}
                      className="map-legend-key"
                    />
                    <span>
                      [{lower.toFixed(1)}, {upper.toFixed(1)})
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="map-overlay-control map-pollution-range-mode">
              <input
                type="checkbox"
                checked={isMinMaxDynamicRange}
                onChange={() => setIsMinMaxDynamicRange(!isMinMaxDynamicRange)}
              />{" "}
              Dynamic Levels
            </div>
          </div>
        </Map>
      )}
    </>
  );
}
