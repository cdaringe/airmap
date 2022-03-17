function invariant<TValue>(
  value: TValue,
  message: string
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}

type Entry = { timestamp: number; voc_ppb: number };
type State = {
  partial: string;
  headerIndiciesByName?: Record<string, number>;
  records: Entry[];
};

const fieldParsersByName = {
  voc_ppb: (v: string) => parseInt(v),
  timestamp: (v: string) => parseInt(v) * 1_000,
};
export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
  state: State = { records: [], partial: "" }
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
            {}
          );
        } else {
          const voc_raw = cells[state.headerIndiciesByName["VOC (ppb)"]!];
          const timestamp_raw = cells[state.headerIndiciesByName["timestamp"]!];
          invariant(voc_raw, "voc missing");
          invariant(timestamp_raw, "timestamp missing");
          state.records.push({
            voc_ppb: fieldParsersByName.voc_ppb(voc_raw),
            timestamp: fieldParsersByName.timestamp(timestamp_raw),
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
