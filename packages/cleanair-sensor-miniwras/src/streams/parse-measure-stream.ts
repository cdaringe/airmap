import { invariant } from "../../../invariant/mod";
import { usLocalDateTimetoDate } from "./parse-utils";

const COL_NAME_DATA_START = "10.00 nm";
const COL_NAME_DATA_END_SUB_500_NM = "449.48 nm";

// 2745.80 nm
const COL_NAME_DATA_END_SUB_3000_NM = "3238.77 nm";

export const RHO_GRIMM = 1800; /* kg / m3 */

const calibration = [
  6.842765, 7.1751666, 7.0114602, 6.9088991, 7.0263146, 6.9180838, 7.0393966,
  6.989318, 6.9812267, 5.2701795, 14.0655402, 13.8262107, 14.1929174,
  14.0017841, 13.8883794, 13.9963284, 14.0409634, 14.2779903, 13.8513492,
  13.898864, 13.6873067, 14.3390373, 13.8184393, 14.1478588, 14.0655395,
  13.8262102, 14.1929179, 13.8296286, 14.062005, 13.9963317, 14.040958,
  14.001345, 13.96783, /* div/0 */ 14, 13.95533, 14.00924, /* div/0 */ 14,
  /* div/0 */ 14, /* div/0 */ 14, /* div/0 */ 14, /* div/0 */ 14,
];

export const sum = (...arr: number[]) =>
  arr.reduce((total, it) => total + it, 0);
const nmToM = (nm: number) => nm / 1e9;
const countsPerCm3ToM3 = (countsCm: number) => countsCm * (100 * 100 * 100);

export const toPartialμgPerM3 = (
  particleCount: number,
  particleNmDiameter: number,
  calibrationIndex: number,
  rho: number
) =>
  (countsPerCm3ToM3(
    particleCount /* particles / cm^3 */
  ) /* particles / m^3 */ /
    calibration[calibrationIndex]) *
  (Math.PI / 6) /* scalar: volume */ *
  nmToM(particleNmDiameter) ** 3 /* m^3 / 1 */ *
  rho /* kg / m^3 */ *
  (1e9 /* µg */ / /* kg */ 1); // /* µg / m^3 */

export const toPartialμgPerM3SansRho = (
  particleCount: number,
  particleNmDiameter: number,
  calibrationIndex: number
) =>
  (countsPerCm3ToM3(particleCount) /
    calibration[calibrationIndex]) /* particles / m^3 */ *
  (Math.PI / 6) *
  nmToM(particleNmDiameter) ** 3 /* m^3 / 1 */ *
  (1e9 /* µg */ / /* kg */ 1); /* µg / kg */

type ParticleDebug = {
  calibrationDivisor: number;
  diameterHeader: string;
  diameterMidpointNm: number;
  numParticles: number;
  μg: number;
};

type Channel = {
  value: number;
  diameterMidpointNm: number;
  calibrationIndex: number;
};

export type DatEntry = {
  date: Date;
  debug?: ParticleDebug[];
  channels: {
    sub500nm: Channel[];
    sub3000nm: Channel[];
  };
  pm_2_5: number;
  pm05: number;
  pm05EndCol: number;
};

type State = {
  partial: string;
  particleDiametersAscending: number[];
  headerIndiciesByName?: Record<string, number>;
  headerCells?: string[];
  records: DatEntry[];
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
          let pm05 = 0;
          let pm3 = 0;
          let colIdx = state.headerIndiciesByName[COL_NAME_DATA_START];
          const pm05EndCol =
            state.headerIndiciesByName[COL_NAME_DATA_END_SUB_500_NM];
          const pm3EndCol =
            state.headerIndiciesByName[COL_NAME_DATA_END_SUB_3000_NM];
          const debug: DatEntry["debug"] = [];
          /**
           * counter 0-N, where N = the final miniwras channel
           */
          let calibrationIndex = 0;
          const channels: DatEntry["channels"] = {
            sub500nm: [],
            sub3000nm: [],
          };

          // aggregrate channels => metrics of interest
          while (colIdx < pm3EndCol) {
            const numParticles = parseFloat(cells[colIdx]);
            const leadingDiameter =
              state.particleDiametersAscending[calibrationIndex];
            const trailingDiameter =
              state.particleDiametersAscending[calibrationIndex + 1];
            const diameterMidpointNm = (leadingDiameter + trailingDiameter) / 2;
            const channel: Channel = {
              value: numParticles,
              diameterMidpointNm,
              calibrationIndex,
            };
            const μg = toPartialμgPerM3(
              numParticles,
              diameterMidpointNm,
              calibrationIndex,
              RHO_GRIMM
            );
            if (colIdx < pm05EndCol) {
              channels.sub500nm.push(channel);
              // const calibrationDivisor = calibration[calibrationIndex];
              // debug.push({
              //   calibrationDivisor,
              //   diameterHeader: state.headerCells?.[colIdx] || "",
              //   diameterMidpointNm,
              //   numParticles,
              //   μg,
              // });
              pm05 += μg;
            }
            if (colIdx < pm3EndCol) {
              channels.sub3000nm.push(channel);
              pm3 += μg;
            }
            ++colIdx;
            ++calibrationIndex;
          }
          console.log({
            sampleNum: state.records.length,
            pm05,
            debug,
          });
          state.records.push({
            channels,
            date: fieldParsersByName.date(date_raw),
            debug,
            pm05EndCol,
            pm05,
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
