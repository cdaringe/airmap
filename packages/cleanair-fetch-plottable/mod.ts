import { streamGoogleSheetsCsv } from "../cleanair-google-sheets/mod";
import { invariant } from "../invariant/mod";

type Entry = {
  device: string;
  urls: string[];
  date: Date;
  description?: string;
};
type State = {
  partial: string;
  headerIndiciesByName?: Record<string, number>;
  records: Entry[];
};

export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
  state: State = { records: [], partial: "" }
): Promise<State> => {
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
          if (!cells[0].startsWith("device")) {
            return;
          }
          state.headerIndiciesByName = cells.reduce(
            (acc, curr, i) => ({ ...acc, [curr.trim()]: i }),
            {}
          );
        } else {
          const device = cells[state.headerIndiciesByName["device"]!];
          const url1 = cells[state.headerIndiciesByName["url1"]!];
          const url2 = cells[state.headerIndiciesByName["url2"]!];
          const date = new Date(cells[state.headerIndiciesByName["date"]!]);
          const description = cells[state.headerIndiciesByName["description"]!];
          invariant(device, "device missing");
          invariant(url1, "url1 missing");
          state.records.push({
            device,
            urls: [url1, url2].filter(Boolean),
            date,
            description,
          });
          if (done) {
            state.partial = "";
          }
        }
      }
    });
  }
  return done ? state : parse(stream, state);
};

export function fetchObservations(url: string) {
  return streamGoogleSheetsCsv(url)
    .then(parse)
    .then((v) => v.records);
}
