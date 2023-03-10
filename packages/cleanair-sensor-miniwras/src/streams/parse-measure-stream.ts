import { invariant } from "../../../invariant/mod";

const COL_NAME_DATA_START = "10.00 nm";
const COL_NAME_DATA_END_SUB_500_NM = "449.48 nm";

const RHO_TRUE = 1800; /* kg / m3 */

const calibration = [
  6.842765, 7.1751666, 7.0114602, 6.9088991, 7.0263146, 6.9180838, 7.0393966,
  6.989318, 6.9812267, 5.2701795, 14.0655402, 13.8262107, 14.1929174,
  14.0017841, 13.8883794, 13.9963284, 14.0409634, 14.2779903, 13.8513492,
  13.898864, 13.6873067, 14.3390373, 13.8184393, 14.1478588, 14.0655395,
  13.8262102, 14.1929179, 13.8296286, 14.062005, 13.9963317, 14.040958,
  14.001345, 13.96783, /* div/0 */ 14, 13.95533, 14.00924, /* div/0 */ 14,
  /* div/0 */ 14, /* div/0 */ 14, /* div/0 */ 14, /* div/0 */ 14,
];

const nmToM = (nm: number) => nm / 1e9;
const countsPerCm3ToM3 = (countsCm: number) => countsCm * (100 * 100 * 100);

const toPartialμgPerM3 = (
  particleCount: number,
  particleNmDiameter: number,
  calibrationDivisor: number
) =>
  (countsPerCm3ToM3(
    particleCount /* particles / cm^3 */
  ) /* particles / m^3 */ /
    calibrationDivisor) *
  (Math.PI / 6) /* scalar: volume */ *
  nmToM(particleNmDiameter) ** 3 /* m^3 / 1 */ *
  RHO_TRUE /* kg / m^3 */ *
  (1e9 /* µg */ / /* kg */ 1); // /* µg / m^3 */

type ParticleDebug = {
  calibrationDivisor: number;
  diameterHeader: string;
  diameterMidpointNm: number;
  numParticles: number;
  μg: number;
};
export type DatEntry = {
  date: Date;
  debug?: ParticleDebug[];
  pm_2_5: number;
  sub500nm: number;
};

type State = {
  partial: string;
  particleDiametersAscending: number[];
  headerIndiciesByName?: Record<string, number>;
  headerCells?: string[];
  records: DatEntry[];
};

const usLocalDateTimetoDate = (v: string) => {
  return new Date(
    v
      .trim()
      .split(" ")
      .map((part, i) => {
        if (i === 0) {
          const [y, m, d] = part.split("/");
          const pad = (v: string) => (v.length === 1 ? `0${v}` : v);
          return `${y}-${pad(m)}-${pad(d)}`;
        }
        return `T${part}.000+01:00`;
      })
      .join("")
  );
};

const float = (v: string) => parseFloat(v);
const fieldParsersByName = {
  date: usLocalDateTimetoDate,
  pm_2_5: float,
};

export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
  state: State = { records: [], partial: "", particleDiametersAscending: [] }
): Promise<State> => {
  const { done, value } = await stream.read();
  if (value || done) {
    state.partial +=
      typeof value === "string"
        ? value
        : value
        ? new TextDecoder().decode(value)
        : "";
    const rawRows = state.partial.split(/\n/g);
    const rows = rawRows.map((v) => v.trim()).filter((x) => !!x);
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
        const cells = row.includes(",") ? row.split(",") : row.split("\t");
        if (!state.headerIndiciesByName) {
          state.headerCells = cells;
          state.headerIndiciesByName = cells.reduce<Record<string, number>>(
            (acc, curr, i) => {
              const colName = curr.trim();
              acc[colName] = i;
              const particleDiameterMatch = colName.match(/\s*(\d+\.\d+)\s+nm/);
              if (particleDiameterMatch) {
                state.particleDiametersAscending.push(
                  parseInt(particleDiameterMatch[1], 10)
                );
              }
              return acc;
            },
            {}
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
          const debug: DatEntry["debug"] = [];
          let calibrationIndex = 0;
          while (colIdx < sub500nmEndCol) {
            const numParticles = parseFloat(cells[colIdx]);
            const diameterMidpointNm =
              (state.particleDiametersAscending[j] +
                state.particleDiametersAscending[j + 1]) /
              2;
            ++calibrationIndex;
            const calibrationDivisor = calibration[calibrationIndex];
            const μg = toPartialμgPerM3(
              numParticles,
              diameterMidpointNm,
              calibrationDivisor
            );
            debug.push({
              calibrationDivisor,
              diameterHeader: state.headerCells?.[colIdx] || "",
              diameterMidpointNm,
              μg,
              numParticles,
            });
            sub500nm += μg;
            ++j;
            ++colIdx;
          }
          console.log({
            sampleNum: state.records.length,
            sub500nm,
            debug,
          });
          state.records.push({
            date: fieldParsersByName.date(date_raw),
            // debug,
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
