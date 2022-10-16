import { invariant } from "../../../invariant/mod.ts";

type Entry = { date: Date; pm_2_3: number; pm_2_7: number };
type State = {
  partial: string;
  headerIndiciesByName?: Record<string, number>;
  records: Entry[];
};

const usLocalDateTimetoDate = (v: string) =>
  new Date(
    v
      .trim()
      .split(" ")
      .map((part, i) => {
        if (i === 0) {
          const [y, m, d] = part.split("/");
          const pad = (v: string) => (v.length === 1 ? `0${v}` : v);
          return `${y}-${pad(m)}-${pad(d)}`;
        }
        return `T${part}.000-07:00`;
      })
      .join("")
  );

const float = (v: string) => parseFloat(v);
const fieldParsersByName = {
  date: usLocalDateTimetoDate,
  pm_2_3: float,
  pm_2_7: float,
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
       * if we're on the last "row", it could be partial, so stash it. if we're
       * done with the stream, it better not be partial, so proceed assuming
       * we have a complete csv row
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
          const date_raw = cells[state.headerIndiciesByName["Time"]!];
          const pm_2_3 = cells[state.headerIndiciesByName["2332.27 nm"]!];
          const pm_2_7 = cells[state.headerIndiciesByName["2745.80 nm"]!];
          invariant(date_raw, "date missing");
          invariant(pm_2_7, "2745.80 nm missing");
          state.records.push({
            date: fieldParsersByName.date(date_raw),
            pm_2_7: fieldParsersByName.pm_2_7(pm_2_7),
            pm_2_3: fieldParsersByName.pm_2_3(pm_2_3),
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
