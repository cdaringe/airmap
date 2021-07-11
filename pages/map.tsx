import Head from "next/head";
import React from "react";
import ReactMapboxGl, { GeoJSONLayer, Popup } from "react-mapbox-gl";
import { Props as ReactMapboxGlProps } from "react-mapbox-gl/lib/map";
import * as MapboxGL from "mapbox-gl";
import { useQuery } from "react-query";
import { useDataSource } from "../src/components/data-source/use-data-source";
import { getFromCsvUrl } from "../src/components/data/air-quality";
import { bbox } from "@turf/turf";

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
  const [fitBounds, setFitBounds] =
    React.useState<ReactMapboxGlProps["fitBounds"]>();
  React.useEffect(() => {
    if (!geojson) return;
    const bounds = bbox(geojson);
    // @todo [[n,n], [n,n]] vs [n,n,n,n]
    setFitBounds(bounds as any);
  }, [geojson]);
  const { current: Map } = React.useRef(
    ReactMapboxGl({
      accessToken,
      transformRequest,
    })
  );
  const [focusCircleEvt, setFocusCircleEvt] =
    React.useState<MapboxGL.MapMouseEvent | null>(null);
  if (isLoading) return <span>loading</span>;
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
        id: "pm2Corrected",
        data: geojson,
        circleLayout,
        circlePaint,
        circleOnClick: (evt: MapboxGL.MapMouseEvent) => setFocusCircleEvt(evt),
      }}
    />
  ) : undefined;
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
      >
        {layer}
        {focusCircleEvt ? (
          <Popup coordinates={focusCircleEvt.lngLat.toArray()} />
        ) : null}
      </Map>
    </>
  );
}
