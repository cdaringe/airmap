import { Entry } from "../interfaces";
import { parseDateString } from "./parse-utils";

function invariant<TValue>(
  value: TValue,
  message: string
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}

type SetKeys<T> = T extends Set<infer U> ? U : never;

const HEADER_NAMES = [
  // "NO.", - only include header names of interest
  "Time",
  "HCHO(mg/m³)",
  "PM2.5(ug/m³)",
  "TVOC(mg/m³)",
  "AQI",
] as const;

const HEADER_NAME_SET = new Set(HEADER_NAMES);

type AllKeys = (typeof HEADER_NAMES)[number];

const entryKeyByColKey: Record<AllKeys, keyof Entry> = {
  Time: "date",
  "HCHO(mg/m³)": "hcho_mg_m3",
  "PM2.5(ug/m³)": "pm2_µg_m3",
  "TVOC(mg/m³)": "tvoc_mg_m3",
  AQI: "aqi",
};

const parserByColKey: Record<AllKeys, (v: string) => number | Date> = {
  Time: (rawValue) => parseDateString(rawValue),
  AQI: parseFloat,
  "TVOC(mg/m³)": parseFloat,
  "PM2.5(ug/m³)": parseFloat,
  "HCHO(mg/m³)": parseFloat,
};

type State = {
  headerIndiciesByName: Partial<Record<AllKeys, number>>;
  partial: string;
  records: Entry[];
};

const ALPHAS = ["a", "A", "z", "Z"];
const MIN_CHAR = Math.min(...ALPHAS.map((c) => c.charCodeAt(0)));
const MAX_CHAR = Math.max(...ALPHAS.map((c) => c.charCodeAt(0)));

const isAlpha = (char: string) => {
  const code = char.charCodeAt(0);
  return MIN_CHAR <= code && code <= MAX_CHAR;
};

export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
  state: State = {
    headerIndiciesByName: {},
    partial: "",
    records: [],
  }
): Promise<State> => {
  const { done, value } = await stream.read();
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
      const [_no, ...cells] = row.split(",").map((v) => v.trim());
      if (isAlpha(row[0] || "")) {
        // unused CSV tables
        state.headerIndiciesByName = cells.reduce(
          (acc, c, i) =>
            HEADER_NAME_SET.has(c as AllKeys) ? { ...acc, [c]: i } : acc,
          {}
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
          {} as Entry
        );
        state.records.push(entry);
        if (done) {
          state.partial = "";
        }
      }
    }
  });
  return done ? state : parse(stream, state);
};
