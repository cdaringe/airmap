/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/geojson/index.d.ts" />
import { streamGoogleSheetsCsv } from "../../../cleanair-google-sheets/mod";
import { type GeoJSON } from "../../../cleanair-sensor-common/mod";
import { invariant } from "../../../invariant/mod";
import { Entry } from "../interfaces";

type State = {
  partial: string;
  headerIndiciesByName?: Record<string, number>;
  records: Entry[];
};

export const createModule = () => {
  const download = async (urls: string[]) => {
    const [url] = urls;
    invariant(url, "missing airmap gps url");
    const [{ records: measures }] = await Promise.all([
      streamGoogleSheetsCsv(url).then(async function parse(
        stream: ReadableStreamDefaultReader<Uint8Array>,
        state: State = { records: [], partial: "" }
      ): Promise<State> {
        const { done, value } = await stream.read();
        if (value || done) {
          state.partial +=
            typeof value === "string"
              ? value
              : value
              ? new TextDecoder().decode(value)
              : "";
          const rows = state.partial.split(/\n/g);
          const lastRowIdx = rows.length - 1;
          rows.forEach((row, i) => {
            /**
             * if we're on the last "row", it may be partial. if we're done,
             * it better not be partial, so proceed assuming it's completely csv row
             */
            if (lastRowIdx === i && !done) {
              state.partial = row;
            } else {
              const cells = row.split(",");
              if (!state.headerIndiciesByName) {
                state.headerIndiciesByName = cells.reduce(
                  (acc, curr, i) => ({ ...acc, [curr.trim()]: i }),
                  {}
                );
              } else {
                const latitude = cells[state.headerIndiciesByName["latitude"]!];
                const timestamp =
                  cells[state.headerIndiciesByName["timestamp"]!];
                const longitude =
                  cells[state.headerIndiciesByName["longitude"]!];
                invariant(latitude, `lat :(`);
                invariant(longitude, `long :(`);
                invariant(timestamp, "timestamp :(");
                state.records.push({
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude),
                  timestamp: new Date(timestamp),
                  _: 0,
                } as Entry);
                if (done) {
                  state.partial = "";
                }
              }
            }
          });
        }
        return done ? state : parse(stream, state);
      }),
    ]);
    return measures;
  };

  const toGeoJSON = (
    datas: Entry[]
  ): GeoJSON.FeatureCollection<GeoJSON.Point, Entry> => ({
    type: "FeatureCollection",
    features: datas.map((properties) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [properties.longitude, properties.latitude],
      },
      properties: { ...properties },
    })),
  });

  const downloadGeoJSON = (urls: string[]) => download(urls).then(toGeoJSON);

  const dateField = /* transformed from "date (UTC)"" on download */ "date";

  return {
    download,
    downloadGeoJSON,
    dateField,
    toGeoJSON,
  };
};
