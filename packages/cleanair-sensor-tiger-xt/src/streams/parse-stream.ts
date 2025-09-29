import { readLines } from "../../../fetch-streaming/mod";
import { TigerXtOnlyEntry } from "../interfaces";

export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>
): Promise<TigerXtOnlyEntry[]> => {
  const entries: TigerXtOnlyEntry[] = [];
  let foundHeaders = false;
  let measurementHeaders: string[] | undefined = undefined;

  for await (const line of readLines(stream)) {
    // Look for the header line that contains "Date,Time" pattern
    if (!foundHeaders && line.includes("Date") && line.includes("Time")) {
      measurementHeaders = line.split(",");
      foundHeaders = true;
      continue;
    }

    // Skip lines until we find headers
    if (!foundHeaders) {
      continue;
    }

    // Parse measurement data
    const cells = line.split(",");
    if (cells.length >= 3) {
      const [rawDateString, rawTimeString, rawIsobutylene] = cells;
      const dateTimeString = `${rawDateString} ${rawTimeString} UTC`;
      const date = new Date(dateTimeString);
      const isobutylene = Number(rawIsobutylene);

      if (!isNaN(date.getTime()) && !isNaN(isobutylene)) {
        entries.push({ date, isobutylene });
      }
    }
  }

  return entries;
};
