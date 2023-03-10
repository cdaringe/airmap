import Head from "next/head";

export default function MapCssLink() {
  return (
    <Head key="mapboxstyle">
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
        rel="stylesheet"
      />
    </Head>
  );
}
