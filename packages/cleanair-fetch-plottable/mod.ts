import { streamGoogleSheetsCsv } from "../google-sheets/mod.ts";
import { invariant } from "../invariant/mod.ts";

type Entry = {
  device: string;
  urls: string[];
};
type State = {
  partial: string;
  headerIndiciesByName?: Record<string, number>;
  records: Entry[];
};

export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
  state: State = { records: [], partial: "" },
): Promise<State> => {
  const { done, value } = await stream.read();
  if (value || done) {
    state.partial += value || "";
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
            (acc, curr, i) => ({ ...acc, [curr]: i }),
            {},
          );
        } else {
          const device = cells[state.headerIndiciesByName["device"]!];
          const url1 = cells[state.headerIndiciesByName["url1"]!];
          const url2 = cells[state.headerIndiciesByName["url2"]!];
          invariant(device, "device missing");
          invariant(url1, "url1 missing");
          state.records.push({ device, urls: [url1, url2] });
          if (done) {
            state.partial = "";
          }
        }
      }
    });
  }
  return done ? state : parse(stream, state);
};

export async function fetchObservations(
  url =
    "https://docs.google.com/spreadsheets/d/1_j058uBscRIwCTTIWcUkFQjl-QODwcb-yQvrNy1QP30/edit#gid=0",
) {
  return streamGoogleSheetsCsv(url).then(parse);
}
