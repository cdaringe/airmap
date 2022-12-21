export type PositionsEntry = {
  timestamp: number;
  latitude: number;
  longitude: number;
};
type State = {
  partial: string;
  headerIndiciesByName?: Record<string, number>;
  records: PositionsEntry[];
};

const fieldParsersByName = {
  timestamp: (v: string) => parseInt(v) * 1_000,
  latitude: (v: string) => parseFloat(v),
  longitude: (v: string) => parseFloat(v),
};
export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
  state: State = { records: [], partial: "" },
): Promise<State> => {
  const { done, value } = await stream.read();
  if (value || done) {
    state.partial += typeof value === "string"
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
            {},
          );
        } else {
          state.records.push({
            timestamp: fieldParsersByName.timestamp(
              cells[state.headerIndiciesByName["timestamp"]!],
            ),
            latitude: fieldParsersByName.latitude(
              cells[state.headerIndiciesByName["latitude"]!],
            ),
            longitude: fieldParsersByName.longitude(
              cells[state.headerIndiciesByName["longitude"]!],
            ),
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
