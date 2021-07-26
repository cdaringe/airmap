import "../styles/globals.css";
import "mapbox-gl-controls/lib/controls.css";
import { Nav } from "../src/components/nav";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import * as ds from "../src/components/data-source/use-data-source";
import * as mapAuth from "../src/components/mapping/use-map-auth";
import Head from "next/head";
import React from "react";
import type { AppProps } from "next/app";

const IS_SERVER = typeof window === "undefined";

const { DataSourceProvider, read: dsRead, persist: dsPersist } = ds;
const { MapAuthProvider, read: mapAuthRead, persist: mapAuthPersist } = mapAuth;
const initialDataSource = dsRead();
const initialMapAuth = mapAuthRead();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { current: queryClient } = React.useRef(new QueryClient());
  const [dsValue, dsSetValue] = React.useState(initialDataSource);
  const [mapAuthValue, mapAuthSetValue] = React.useState(initialMapAuth);
  const updateDataSource = React.useCallback((ds: ds.DataSource) => {
    dsPersist(ds);
    dsSetValue(ds);
  }, []);
  const updateMapAuth = React.useCallback((payload: mapAuth.MapAuth) => {
    mapAuthPersist(payload);
    mapAuthSetValue(payload);
  }, []);
  if (IS_SERVER) return null;
  return (
    <DataSourceProvider value={{ value: dsValue, update: updateDataSource }}>
      <MapAuthProvider value={{ value: mapAuthValue, update: updateMapAuth }}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>airmap</title>
            <meta
              name="description"
              content="air-quality-data in, map-wise air data out!"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div id="layout">
            <Nav />
            <Component {...pageProps} />
            {router.pathname === "/" ? (
              <footer className="border-t border-blue-200 flex-0 text-center p-2 visited:text-purple-600 text-blue-600 hover:underline">
                <a
                  href="http://portlandcleanair.org/"
                  rel="noopener noreferrer"
                >
                  By your friends at portlandcleanair.org
                </a>
              </footer>
            ) : undefined}
          </div>
        </QueryClientProvider>
      </MapAuthProvider>
    </DataSourceProvider>
  );
}
export default MyApp;
