import { invariant } from "../../../invariant/mod.ts";

const COL_NAME_DATA_START = "10.00 nm";
const COL_NAME_DATA_END_SUB_500_NM = "449.48 nm";

const RHO_TRUE = 1800;
const V_AIR = 0.0012;

const toDensityContribution = (
  particleCount: number,
  particleDiameter: number,
) =>
  Math.PI / 6 * Math.pow(particleDiameter / 1000000000, 3) * RHO_TRUE *
  particleCount / V_AIR / 1000000000;

type Entry = { date: Date; sub500nm: number; pm_2_5: number };
type State = {
  partial: string;
  particleDiametersAscending: number[];
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
      .join(""),
  );

const float = (v: string) => parseFloat(v);
const fieldParsersByName = {
  date: usLocalDateTimetoDate,
  pm_2_5: float,
};

export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
  state: State = { records: [], partial: "", particleDiametersAscending: [] },
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
       * if we're on the last "row", it could be partial, so stash it. if we're
       * done with the stream, it better not be partial, so proceed assuming
       * we have a complete csv row
       */
      if (lastRowIdx === i && !done) {
        state.partial = row;
      } else {
        const cells = row.split(",");
        if (!state.headerIndiciesByName) {
          state.headerIndiciesByName = cells.reduce<Record<string, number>>(
            (acc, curr, i) => {
              const colName = curr.trim();
              acc[colName] = i;
              const particleDiameterMatch = colName.match(/\s*(\d+\.\d+)\s+nm/);
              if (particleDiameterMatch) {
                state.particleDiametersAscending.push(
                  parseInt(particleDiameterMatch[1], 10),
                );
              }
              return acc;
            },
            {},
          );
        } else {
          const date_raw = cells[state.headerIndiciesByName["Time"]!];
          const pm_2_5 = cells[state.headerIndiciesByName["pm2.5 [ug/m3]"]!];
          invariant(date_raw, "date missing");
          invariant(Number.isFinite(pm_2_5), "column 'pm2.5 [ug/m3]' missing");
          let sub500nm = 0;
          let colIdx = state.headerIndiciesByName[COL_NAME_DATA_START];
          const sub500nmEndCol =
            state.headerIndiciesByName[COL_NAME_DATA_END_SUB_500_NM];
          let j = 0;
          while (colIdx < sub500nmEndCol) {
            const numParticles = parseFloat(cells[colIdx]);
            const diameterMidpoint = (state.particleDiametersAscending[j] +
              state.particleDiametersAscending[j + 1]) / 2;
            sub500nm += toDensityContribution(numParticles, diameterMidpoint);
            ++j;
            ++colIdx;
          }
          state.records.push({
            date: fieldParsersByName.date(date_raw),
            sub500nm,
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
