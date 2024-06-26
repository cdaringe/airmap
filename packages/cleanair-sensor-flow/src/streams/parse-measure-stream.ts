import { invariant } from "../../../invariant/mod";
import type { MeasureEntry } from "../interfaces";
export type { MeasureEntry } from "../interfaces";
type State = {
  partial: string;
  headerIndiciesByName?: Record<string, number>;
  records: MeasureEntry[];
};

const fieldParsersByName = {
  voc_ppb: (v: string) => parseInt(v),
  date: (v: string) => new Date(parseInt(v) * 1_000),
  pm_2_5: (v: string) => parseFloat(v),
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
          state.headerIndiciesByName = cells.reduce(
            (acc, curr, i) => ({ ...acc, [curr.trim()]: i }),
            {}
          );
        } else {
          const vocFieldName = "VOC (ppb)" as const;
          const voc_raw = cells[state.headerIndiciesByName[vocFieldName]!];
          const timestamp_raw = cells[state.headerIndiciesByName["timestamp"]!];
          const pm_2_5 = cells[state.headerIndiciesByName["pm 2.5 (ug/m3)"]!];
          invariant(
            voc_raw,
            `voc missing (${vocFieldName}, value: ${voc_raw})`
          );
          invariant(timestamp_raw, "timestamp missing");
          invariant(pm_2_5, "pm25 missing");
          state.records.push({
            voc_ppb: fieldParsersByName.voc_ppb(voc_raw),
            date: fieldParsersByName.date(timestamp_raw),
            pm_2_5: fieldParsersByName.pm_2_5(pm_2_5),
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
