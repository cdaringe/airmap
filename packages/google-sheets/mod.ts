import { fetchTextStreamReader } from "../fetch-streaming/mod.ts";

export const streamGoogleSheetsCsv = (sheetsCsvUrl: string) => {
  const url = new URL(sheetsCsvUrl);
  const params = new URLSearchParams(url.search);
  if (!params.has("format")) params.set("format", "csv");
  url.search = params.toString();
  return fetchTextStreamReader(url.toString(), {
    mode: "cors",
    redirect: "follow",
    headers: { accept: "text" },
  });
};
