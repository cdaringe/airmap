import React, { useEffect, useMemo, useState } from "react";
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
import { format } from "date-fns";

const isValidDate = (d: Date) => !d.toString().match(/Invalid/);

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

const DEFAULT_START_DATE = new Date("2020-01-01");
const DEFAULT_END_DATE = new Date(`${new Date().getFullYear()}-12-31`);

export default function Map() {
  const [isMinMaxDynamicRange, setIsMinMaxDynamicRange] = useState(true);
  const [isFilterAfterStart, setIsFilteringAfterStart] = useState(false);
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [isFilterBeforeEnd, setFilterBeforeEnd] = useState(false);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);
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
    data: { download, dateField } = {},
  } = useSensorMappingResources(sensorType);
  const {
    isLoading: isDataLoading,
    error: dataDownloadError,
    data: { geojson: unfilteredGeojson, getLevels } = {},
  } = useQuery({
    // use `typeof download` to cache bust react-query when the download
    // function has not yet finished downloading
    queryKey: [...urls, typeof download],
    queryFn: () => download?.(urls),
    cacheTime: 1e9,
  });
  const error = sensorDownloaderError || dataDownloadError;
  const isLoading = isSensorDownladerLoading || isDataLoading;
  const geojson = React.useMemo(() => {
    if (!isFilterAfterStart && !isFilterBeforeEnd) return unfilteredGeojson;
    if (!dateField) {
      throw new Error(`sensor type missing dateField column name`);
    }
    const features = unfilteredGeojson?.features;
    if (!features) return unfilteredGeojson;
    return {
      ...unfilteredGeojson,
      features: features.filter((feature) => {
        const featureDate = new Date(feature.properties[dateField]);
        if (isFilterAfterStart && featureDate <= startDate) {
          return false;
        }
        if (isFilterBeforeEnd && featureDate >= endDate) {
          return false;
        }
        return true;
      }),
    };
  }, [
    unfilteredGeojson,
    startDate,
    isFilterAfterStart,
    isFilterBeforeEnd,
    endDate,
    dateField,
  ]);
  const pollutionLevels = useMemo(() => {
    if (!getLevels || !geojson) return null;
    return getLevels({ isMinMaxDynamicRange, geojson });
  }, [getLevels, isMinMaxDynamicRange, geojson]);
  useInitialBoundingBox(geojson, setFitBounds);
  const { current: Map } = React.useRef(
    ReactMapboxGl({
      accessToken,
      transformRequest: normalizeMapboxUrl,
    })
  );
  const [selectedFeature, setFeature] =
    React.useState<GeoJSON.Feature<GeoJSON.Point> | null>(null);
  const clearPopup = () => setFeature(null);
  useEffect(
    function tearDownPopup() {
      const onKeyup = (evt: WindowEventMap["keyup"]) => {
        if (evt.key.match(/esc/i)) {
          clearPopup();
        }
      };
      const onCanvasClick = (evt: WindowEventMap["click"]) => clearPopup();
      const [canvas] = document.getElementsByTagName("canvas") || [];
      canvas?.addEventListener("click", onCanvasClick);
      window.addEventListener("keyup", onKeyup);
      return () => {
        window.removeEventListener("keyup", onKeyup);
        canvas?.removeEventListener("click", onCanvasClick);
      };
    },
    [selectedFeature]
  );
  if (error) return <MapError error={error} datasource={ds} />;
  if (isLoading) return <Loading />;
  const dataPoint = geojson?.features[0]?.properties as
    | Record<string, string>
    | undefined;
  return (
    <>
      <MapCssLink />
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
      >
        {dataPoint ? undefined : <NoDatapoint />}
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
          <div className="map-overlay-control map-pollution-range-mode">
            <input
              type="checkbox"
              checked={isFilterAfterStart}
              onChange={() => setIsFilteringAfterStart(!isFilterAfterStart)}
            />{" "}
            After Date
            <br />
            <input
              type="datetime-local"
              disabled={!isFilterAfterStart}
              value={format(startDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={(evt) => {
                const next = new Date(evt.currentTarget.value);
                if (isValidDate(next)) setStartDate(next);
              }}
            />
          </div>
          <div className="map-overlay-control map-pollution-range-mode">
            <input
              type="checkbox"
              checked={isFilterBeforeEnd}
              onChange={() => setFilterBeforeEnd(!isFilterBeforeEnd)}
            />{" "}
            End Date
            <br />
            <input
              type="datetime-local"
              disabled={!isFilterBeforeEnd}
              value={format(endDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={(evt) => {
                const next = new Date(evt.currentTarget.value);
                if (isValidDate(next)) setEndDate(next);
              }}
            />
          </div>
        </div>
      </Map>
    </>
  );
}
