import { readLines } from "../../../fetch-streaming/mod";
import { AeroqualS500OnlyEntry } from "../interfaces";

export const parse = async (
  stream: ReadableStreamDefaultReader<Uint8Array>
): Promise<AeroqualS500OnlyEntry[]> => {
  const entries: AeroqualS500OnlyEntry[] = [];
  let headers: string[] | undefined = undefined;
  for await (const line of readLines(stream)) {
    const cells = line.split(",");
    if (!headers) {
      headers = cells;
      continue;
    }
    const [rawDateString, rawTVOC] = cells;
    const date = new Date(rawDateString);
    const tvoc = Number(rawTVOC);
    entries.push({ date, tvoc });
  }
  return entries;
};
