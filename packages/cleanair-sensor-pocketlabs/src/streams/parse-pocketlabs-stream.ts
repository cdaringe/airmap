import { Entry } from "../interfaces.ts";

function invariant<TValue>(
  value: TValue,
  message: string,
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}

type SetKeys<T> = T extends Set<infer U> ? U : never;

const DEFAULT_ENTRY: Entry = {
  date: 0,
  counter_t: 0,
  pm_1_0: 0,
  pm_2_5: 0,
  latitude: 0,
  longitude: 0,
  humidity: 0,
};
const RAW_PM1_HEADER = "PM1.0 (µg/m³)" as const;
const RAW_PM2_HEADER = "PM2.5 (µg/m³)" as const;
const HEADER_NAMES = [
  "Date",
  "Lat",
  "Lng",
  RAW_PM1_HEADER,
  RAW_PM2_HEADER,
  "t (s)",
] as const;
const HEADER_NAMES_HUMIDITY = [
  "Lat",
  "Lng",
  "t (s)",
  "Relative Humidity (%)",
  // "Pressure (mBar)",
] as const;
const SUM_ALLOWED_HEADERS = new Set([
  ...HEADER_NAMES,
  ...HEADER_NAMES_HUMIDITY,
]);

type AllKeys = SetKeys<typeof SUM_ALLOWED_HEADERS>;

const entryKeyByColKey: Record<AllKeys, keyof Entry> = {
  Date: "date",
  Lat: "latitude",
  Lng: "longitude",
  "t (s)": "counter_t",
  "PM1.0 (µg/m³)": "pm_1_0",
  "PM2.5 (µg/m³)": "pm_2_5",
  "Relative Humidity (%)": "humidity",
};

const parserByColKey: Record<AllKeys, (v: string) => number> = {
  Date: (v) => new Date(v).getTime(),
  Lat: parseFloat,
  Lng: parseFloat,
  "t (s)": (v) => parseInt(v),
  "PM1.0 (µg/m³)": parseFloat,
  "PM2.5 (µg/m³)": parseFloat,
  "Relative Humidity (%)": parseFloat,
};

const ALPHAS = ["a", "A", "z", "Z"];
const MIN_CHAR = Math.min(...ALPHAS.map((c) => c.charCodeAt(0)));
const MAX_CHAR = Math.max(...ALPHAS.map((c) => c.charCodeAt(0)));

const isAlpha = (char: string) => {
  const code = char.charCodeAt(0);
  return MIN_CHAR <= code && code <= MAX_CHAR;
};

type State = {
  headerIndiciesByName: Partial<Record<AllKeys, number>>;
  partial: string;
  records: Entry[];
};

const fieldParsersByName = {
  voc_ppb: (v: string) => parseInt(v),
  timestamp: (v: string) => parseInt(v) * 1_000,
};
export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
  state: State = {
    headerIndiciesByName: {},
    partial: "",
    records: [],
  },
): Promise<State> => {
  const { done, value } = await stream.read();
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
      if (isAlpha(row[0] || "")) {
        // unused CSV tables
        state.headerIndiciesByName = cells.reduce(
          (acc, c, i) =>
            SUM_ALLOWED_HEADERS.has(c as AllKeys) ? { ...acc, [c]: i } : acc,
          {},
        );
      } else if (cells[0] === "") {
        // pass - empty row
      } else {
        const entry = Object.entries(state.headerIndiciesByName).reduce<Entry>(
          (acc, [header, idx]) => ({
            ...acc,
            [entryKeyByColKey[header as AllKeys]]: parserByColKey[
              header as AllKeys
            ](cells[idx]!),
          }),
          {} as Entry,
        );
        invariant(!Number.isNaN(entry.counter_t), "NaN");
        invariant(Number.isFinite(entry.counter_t), "t (s) not ok");
        state.records[entry.counter_t] = {
          ...(state.records[entry.counter_t] || {}),
          ...entry,
        };
        if (done) {
          state.partial = "";
        }
      }
    }
  });
  return done ? state : parse(stream, state);
};
