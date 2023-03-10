import { MINIWRAS_ID } from "../../../../../../packages/cleanair-sensor-common/mod";
import React, { useEffect, useMemo, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Props as MapProps } from "react-mapbox-gl/lib/map";
import { useDataSource } from "../../data-source/use-data-source";
import dynamic from "next/dynamic";
import Loading from "../../atoms/loading";
import { PollutionLayer } from "../../mapping/PollutionLayer";
import { useInitialBoundingBox } from "../../mapping/use-bounding-box";
import { useHandleNoDatasource } from "../../../hooks/use-handle-no-datasource";
import { useSensorMappingResources } from "./hooks/use-sensor-mapping-resources";
import { useQuery } from "react-query";
import MapError from "./map.error";
import NoDatapoint from "./map.nodatapoint";
import MapCssLink from "./map.csslink";
import setupControls from "./map.setup-controls";
import Button from "../../atoms/button";
import { format } from "date-fns";
import { useDateFilter } from "./hooks/use-date-filter";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { MiniWrasStats } from "../../charts/miniwras-pm2-humidity";
import { ErrorBoundary } from "../../error-boundary";

const isValidDate = (d: Date) => !d.toString().match(/Invalid/);

// map.addControl(new RulerControl(), 'top-right');
const MeasurementPopup = dynamic(() => import("../../MeasurementPopup"));

const accessToken =
  "pk.eyJ1IjoicGR4Y2xlYW5haXIiLCJhIjoiY2tweDFuZmxpMjFmbzJ3bXVkajd4dDQ4dSJ9.LYiRB4TgOAckcqZGi-cUXg";

const normalizeMapboxUrl = (url: string, _resourceType: string) => {
  const isMapboxRequest =
    url.slice(8, 22) === "api.mapbox.com" ||
    url.slice(10, 26) === "tiles.mapbox.com";
  return {
    url: isMapboxRequest ? url.replace("?", "?pluginName=sheetMapper&") : url,
  };
};

const DEFAULT_START_DATE = new Date("2020-01-01");
const DEFAULT_END_DATE = new Date(`${new Date().getFullYear()}-12-31`);

export default function Map() {
  useHandleNoDatasource();
  const [fieldToMap, setMappingField] = useState("");
  const [isMinMaxDynamicRange, setIsMinMaxDynamicRange] = useState(true);
  const [isFilterAfterStart, setIsFilteringAfterStart] = useState(false);
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [isFilterBeforeEnd, setFilterBeforeEnd] = useState(false);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
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
    data: sensorResources,
  } = useSensorMappingResources(sensorType);
  const { getLevels: defaultGetLevels, getLevelsByField } =
    sensorResources?.mapbox || {};
  const getLevels = fieldToMap
    ? getLevelsByField?.[fieldToMap]
    : defaultGetLevels;
  const { downloadGeoJSON, dateField } = sensorResources?.download || {};
  const {
    isLoading: isDataLoading,
    error: dataDownloadError,
    data: unfilteredGeojson,
  } = useQuery({
    // use `typeof download` to cache bust react-query when the download
    // function has not yet finished downloading
    queryKey: ["map", `sensor-${sensorType}`, ...urls, typeof downloadGeoJSON],
    queryFn: () => {
      if (sensorType === MINIWRAS_ID) {
        // we only support MINIWRAS from file uploading from the home screen
        return ds.value.luggage;
      }
      return downloadGeoJSON?.(urls);
    },
    cacheTime: 1e9,
  });
  const error = sensorDownloaderError || dataDownloadError;
  const isLoading = isSensorDownladerLoading || isDataLoading;
  const geojson = useDateFilter({
    unfilteredGeojson,
    dateField: dateField || "",
    startDate,
    isFilterAfterStart,
    isFilterBeforeEnd,
    endDate,
  });
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
    <ErrorBoundary>
      <MapCssLink />
      <Map
        onStyleLoad={setupControls}
        className="w-full content"
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
                if (fitBounds) {
                  setFitBounds(undefined);
                }
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
            className="overflow-auto h-96"
            feature={selectedFeature}
            onClick={(evt) => {
              evt.preventDefault();
            }}
          />
        ) : undefined}
        <div id="pollution-map-overlay" className="map-overlay">
          <div className="map-overlay-control map-legend">
            <div style={{ fontWeight: "bold" }}>
              {pollutionLevels?.fieldName}
            </div>
            {pollutionLevels?.ranges.map((range, i) => {
              const [lower, upper] = range;
              return (
                <div key={`${isMinMaxDynamicRange}-${i}`}>
                  <span
                    style={{ backgroundColor: pollutionLevels.colors[i] }}
                    className="map-legend-key"
                  />
                  <span>
                    [{lower < 1 ? lower.toFixed(3) : lower.toFixed(1)},{" "}
                    {upper < 1 ? upper.toFixed(3) : upper.toFixed(1)})
                  </span>
                </div>
              );
            })}
          </div>
          {getLevelsByField ? (
            <div className="map-overlay-control map-pollution-range-mode">
              <h4 className="font-bold">Field to map</h4>
              {Object.keys(getLevelsByField).map((fieldName) => (
                <div key={fieldName}>
                  <input
                    type="radio"
                    key={fieldName}
                    name="field-to-map"
                    onClick={() => setMappingField(fieldName)}
                  />
                  <label htmlFor="field-to-map">{` ${fieldName}`}</label>
                  <br />
                </div>
              ))}
            </div>
          ) : null}
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
          {sensorType === MINIWRAS_ID ? (
            <div className="map-overlay-control map-pollution-range-mode">
              <Button onClick={() => setBottomSheetOpen(!isBottomSheetOpen)}>
                Show charts
              </Button>
            </div>
          ) : null}
        </div>
      </Map>
      <BottomSheet
        blocking={false}
        open={isBottomSheetOpen}
        onDismiss={() => setBottomSheetOpen(false)}
      >
        <div className="p-4">
          <h3>PM2.5 & Humidity - MiniWRAS & PocketLabs</h3>
          <MiniWrasStats geojson={geojson} />
        </div>
      </BottomSheet>
    </ErrorBoundary>
  );
}
