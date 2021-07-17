import Head from "next/head";
import React from "react";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import { Props as ReactMapboxGlProps } from "react-mapbox-gl/lib/map";
import * as MapboxGL from "mapbox-gl";
import { useQuery } from "react-query";
import { useDataSource } from "../src/components/data-source/use-data-source";
import { getFromCsvUrl } from "../src/components/data/air-quality";
import { bbox } from "@turf/turf";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import AirIcon from "../src/components/icon/svg/air";
const MeasurementPopup = dynamic(
  () => import("../src/components/MeasurementPopup")
);

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

const circleLayout: MapboxGL.CircleLayout = { visibility: "visible" };
const circlePaint: MapboxGL.CirclePaint = {
  "circle-color": "purple",
  "circle-radius": 5,
};

export default function Map() {
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
  const router = useRouter();
  React.useEffect(
    () => (!url ? router.push("/") : undefined) && undefined,
    [url, router]
  );
  const [fitBounds, setFitBounds] =
    React.useState<ReactMapboxGlProps["fitBounds"]>();
  React.useEffect(() => {
    if (!geojson) return;
    const bounds = bbox(geojson);
    if (bounds[0] <= -Infinity || bounds[0] >= Infinity) {
      console.error("infitity detected. bounds skipped");
      return;
    }
    // @todo [[n,n], [n,n]] vs [n,n,n,n]
    setFitBounds(bounds as any);
  }, [geojson]);
  const { current: Map } = React.useRef(
    ReactMapboxGl({
      accessToken,
      transformRequest,
    })
  );
  const [focusCirclePM2Evt, setFocusCircleEvt] =
    React.useState<MapboxGL.MapMouseEvent | null>(null);
  const clearPopup = React.useCallback(
    () => setFocusCircleEvt(null),
    [setFocusCircleEvt]
  );
  if (error)
    return (
      <div>
        <h1>Error</h1>
        <p>
          {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
        </p>
      </div>
    );
  const layer = geojson ? (
    <GeoJSONLayer
      {...{
        id: "pm25Corrected",
        data: geojson,
        circleLayout,
        circlePaint,
        circleOnClick: (evt: MapboxGL.MapMouseEvent) => {
          setFocusCircleEvt(() => evt);
        },
        circleOnMouseEnter: (evt: MapboxGL.MapMouseEvent) => {
          evt.target.getCanvas().style.cursor = "pointer";
        },
        circleOnMouseLeave: (evt: MapboxGL.MapMouseEvent) => {
          evt.target.getCanvas().style.cursor = "";
        },
      }}
    />
  ) : undefined;
  if (geojson?.features.length === 0)
    return (
      <div className="p-4">
        <h1 className="text-xl">Missing data</h1>
        <p>The data has been downloaded, but is empty :/</p>
      </div>
    );
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
      <Map
        fitBounds={fitBounds}
        center={[-122.66155, 45.54846]}
        style="mapbox://styles/pdxcleanair/ckpx7yno443sa17p6iy65qn95"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        onClick={() => {
          clearPopup();
        }}
      >
        {layer}
        {focusCirclePM2Evt ? (
          <MeasurementPopup
            title="Measurements"
            className="h-96 overflow-auto"
            evt={focusCirclePM2Evt}
            geojson={geojson!}
            onClick={(evt) => {
              evt.preventDefault();
            }}
          />
        ) : undefined}
      </Map>
    </>
  );
}
