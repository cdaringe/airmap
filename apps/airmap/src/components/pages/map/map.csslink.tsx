"use client";

import Head from "next/head";

/**
 * @warn The version below needs to by sync'd with the package.json version
 */
export default function MapCssLink() {
  return (
    <Head key="mapboxstyle">
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.9.3/mapbox-gl.css"
        rel="stylesheet"
      />
    </Head>
  );
}
