import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Props as MapProps } from "react-mapbox-gl/lib/map";
import { useQuery } from "react-query";
import "react-spring-bottom-sheet/dist/style.css";
import { MINIWRAS_ID } from "../../../../../../packages/cleanair-sensor-common/mod";
import { GeoJSONMiniWras } from "../../../../../../packages/cleanair-sensor-miniwras/mod";
import { useHandleNoDatasource } from "../../../hooks/use-handle-no-datasource";
import Loading from "../../atoms/loading";
import { useDataSource } from "../../data-source/use-data-source";
import { ErrorBoundary } from "../../error-boundary";
import { PollutionLayer } from "../../mapping/PollutionLayer";
import { useInitialBoundingBox } from "../../mapping/use-bounding-box";
import { useDateFilter } from "./hooks/use-date-filter";
import { useSensorMappingResources } from "./hooks/use-sensor-mapping-resources";
import { MapBottomSheet } from "./map-bottom-sheet";
import MapCssLink from "./map.csslink";
import MapError from "./map.error";
import NoDatapoint from "./map.nodatapoint";
import setupControls from "./map.setup-controls";
import { Overlay } from "./overlay";
import {
  accessToken,
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  normalizeMapboxUrl,
} from "./util";

const MeasurementPopup = dynamic(() => import("../../MeasurementPopup"));

export default function Map() {
  useHandleNoDatasource();
  const [fieldToMap, setMappingField] = useState("");
  const [isMinMaxDynamicRange, setIsMinMaxDynamicRange] = useState(true);
  const [isFilterAfterStart, setIsFilteringAfterStart] = useState(false);
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [isFilterBeforeEnd, setIsFilterBeforeEnd] = useState(false);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
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
    queryFn: (): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> => {
      const luggage = ds.value?.luggage;
      if (sensorType === MINIWRAS_ID && luggage) {
        // we only support MINIWRAS from file uploading from the home screen
        return Promise.resolve(luggage);
      }
      if (downloadGeoJSON) {
        return downloadGeoJSON(urls);
      }
      throw new Error(`no mechanism found to download map data`);
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
      const onCanvasClick = (_evt: WindowEventMap["click"]) => clearPopup();
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
  if (isLoading) return <Loading msg="Downloading data" />;
  if (!geojson) return <Loading msg="Preparing geojson" />;
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
        <>
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
                  const featureCopy = { ...feature };
                  [
                    "channels",
                    "debug",
                    "pocketlabsEntry",
                    "pm05EndCol",
                  ].forEach((fieldName) => {
                    const properties = featureCopy.properties;
                    if (properties) {
                      delete properties[fieldName as any];
                    }
                  });
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
              onClick={(evt) => evt.preventDefault()}
            />
          ) : null}
          {pollutionLevels ? (
            <Overlay
              {...{
                sensorType,
                startDate,
                setEndDate,
                setStartDate,
                setMappingField,
                setIsMinMaxDynamicRange,
                setIsFilteringAfterStart,
                setIsFilterBeforeEnd,
                setIsBottomSheetOpen,
                levels: pollutionLevels,
                isMinMaxDynamicRange,
                isFilterBeforeEnd,
                isFilterAfterStart,
                isBottomSheetOpen,
                getLevelsByField,
                endDate,
              }}
            />
          ) : null}
        </>
      </Map>
      <MapBottomSheet
        isOpen={isBottomSheetOpen}
        onDismiss={setIsBottomSheetOpen}
        geojson={geojson as GeoJSONMiniWras}
      />
    </ErrorBoundary>
  );
}
