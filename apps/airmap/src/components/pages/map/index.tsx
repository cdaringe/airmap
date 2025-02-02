import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { LngLatBoundsLike, Map } from "react-map-gl";
import { useQuery } from "react-query";
import "react-spring-bottom-sheet/dist/style.css";
import { GeoJSONMiniWras } from "../../../../../../packages/cleanair-sensor-miniwras/mod";
import {
  isLuggageBackedDatasource,
  useHandleNoDatasource,
} from "../../../hooks/use-handle-no-datasource";
import Loading from "../../atoms/loading";
import { useDataSource } from "../../data-source/use-data-source";
import { ErrorBoundary } from "../../error-boundary";
import {
  PollutionLayer,
  usePollutionHandlers,
} from "../../mapping/PollutionLayer";
import { useInitialBoundingBox } from "../../mapping/use-bounding-box";
import { useDateFilter } from "./hooks/use-date-filter";
import { useSensorMappingResources } from "./hooks/use-sensor-mapping-resources";
import { useSetupMap } from "./hooks/use-setup-map";
import { MapBottomSheet } from "./map-bottom-sheet";
import MapCssLink from "./map.csslink";
import MapError from "./map.error";
import NoDatapoint from "./map.nodatapoint";
// import setupControls from "./map.setup-controls";
import { Overlay } from "./overlay";
import {
  accessToken,
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  handleMatching,
} from "./util";

const MeasurementPopup = dynamic(() => import("../../MeasurementPopup"));

export default function MapView() {
  useHandleNoDatasource();
  const [fieldToMap, setMappingField] = useState("");
  const [isMinMaxDynamicRange, setIsMinMaxDynamicRange] = useState(true);
  const [isFilterAfterStart, setIsFilteringAfterStart] = useState(false);
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [isFilterBeforeEnd, setIsFilterBeforeEnd] = useState(false);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [fitBounds, setFitBounds] = React.useState<LngLatBoundsLike>();
  const [center, setCenter] = React.useState<[lat: number, lon: number]>([
    -122.66155, 45.54846,
  ]);
  const [i, setForceRenderCounter] = React.useState(0);
  const ds = useDataSource();
  const {
    value: { urls, sensorType },
  } = ds;
  const {
    isLoading: isSensorDownladerLoading,
    error: sensorDownloaderError,
    data: sensorResources,
  } = useSensorMappingResources(sensorType);
  const {
    mapbox: { getLevels: defaultGetLevels, getLevelsByField } = {},
    processGeoJSONMemoKey,
    processGeoJSON,
  } = sensorResources || {};
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
      if (luggage && isLuggageBackedDatasource(sensorType, luggage)) {
        // we only support MINIWRAS from file uploading from the home screen
        return Promise.resolve(luggage);
      }
      if (downloadGeoJSON) {
        return downloadGeoJSON(urls);
      }
      /**
       * On first render, downloadGeoJSON is undefined.
       */
      return Promise.resolve({
        type: "FeatureCollection",
        features: [],
      });
      // throw new Error(`no mechanism found to download map data`);
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

  const [selectedFeature, setFeature] =
    React.useState<GeoJSON.Feature<GeoJSON.Point> | null>(null);
  const clearPopup = () => setFeature(null);

  const mapRef = React.useRef<any | null>(null);
  useSetupMap({ mapRef, className: "w-full content" });

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

  const onSelectFeature = React.useCallback(
    (feature: GeoJSON.Feature<GeoJSON.Point>) => {
      if (fitBounds) {
        setFitBounds(undefined);
      }
      const coordinates = feature.geometry.coordinates as [number, number];
      if (center && coordinates) {
        setCenter(coordinates);
      }
      const featureCopy = { ...feature };
      ["channels", "debug", "pocketlabsEntry", "pm05EndCol"].forEach(
        (fieldName) => {
          const properties = featureCopy.properties;
          if (properties) {
            delete properties[fieldName as any];
          }
        }
      );
      setFeature(feature);
    },
    [center, fitBounds, setFeature]
  );

  const pollutionHandlers = usePollutionHandlers({ onSelectFeature });

  const processedGeoJSON = React.useMemo(() => {
    if (geojson && processGeoJSON) {
      return processGeoJSON(geojson);
    }
    return geojson;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geojson, processGeoJSONMemoKey?.(), i]);

  if (error) return <MapError error={error} datasource={ds} />;
  if (isLoading) return <Loading msg="Downloading data" />;
  if (!processedGeoJSON) return <Loading msg="Preparing geojson" />;

  const dataPoint = processedGeoJSON?.features[0]?.properties as
    | Record<string, string>
    | undefined;

  return (
    <ErrorBoundary>
      <MapCssLink />
      <Map
        style={{ width: "100vw", height: "100%" }}
        onClick={(evt) => handleMatching(evt, "onClick", pollutionHandlers)}
        onMouseEnter={(evt) =>
          handleMatching(evt, "onMouseEnter", pollutionHandlers)
        }
        onMouseLeave={(evt) =>
          handleMatching(evt, "onMouseLeave", pollutionHandlers)
        }
        interactiveLayerIds={[pollutionHandlers.layerId]}
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
          zoom: 12,
        }}
        mapboxAccessToken={accessToken}
        mapStyle="mapbox://styles/pdxcleanair/ckpx7yno443sa17p6iy65qn95"
        ref={mapRef}
      >
        <>
          <PollutionLayer
            id={pollutionHandlers.layerId}
            {...{
              geojson: processedGeoJSON,
              circleCases: pollutionLevels?.circleCases,
            }}
          />
          {dataPoint ? undefined : <NoDatapoint />}
          {selectedFeature ? (
            <MeasurementPopup
              title="Measurements"
              className="overflow-auto h-96"
              feature={selectedFeature}
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
                setCountForceRerender: setForceRenderCounter,
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
        geojson={processedGeoJSON as GeoJSONMiniWras}
      />
    </ErrorBoundary>
  );
}
