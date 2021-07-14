import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import {
  DataSource,
  DataSourceProvider,
  read,
  persist,
} from "../src/components/data-source/use-data-source";
import { Nav } from "../src/components/nav";

const IS_SERVER = typeof window === "undefined";

const initialDataSource = read();

function MyApp({ Component, pageProps }: AppProps) {
  const { current: queryClient } = React.useRef(new QueryClient());
  const [value, setValue] = React.useState(initialDataSource);
  const update = React.useCallback((ds: DataSource) => {
    persist(ds);
    setValue(ds);
  }, []);
  if (IS_SERVER) return null;
  return (
    <DataSourceProvider value={{ value, update }}>
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
          <footer className="flex-0">
            <a
              href="http://portlandcleanair.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By your friends at portlandcleanair.org
            </a>
          </footer>
        </div>
      </QueryClientProvider>
    </DataSourceProvider>
  );
}
export default MyApp;
