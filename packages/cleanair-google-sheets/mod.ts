import { fetchTextStreamReader } from "../fetch-streaming/mod.ts";

export function isGoogleSheetsCompatibleUrl(urlstr: string) {
  try {
    const url = new URL(urlstr);
    const [p1, p2, p3] = url.pathname.substr(1).split("/");
    if (
      p1 === "spreadsheets" &&
      p2 === "d" &&
      !!p3 &&
      !!url.host.match("google.com")
    ) {
      return true;
    }
  } catch {}
  return false;
}

export function toSheetsDataExportUrl(urlstr: string) {
  const url = new URL(urlstr);
  url.pathname = [
    ...url.pathname.substr(1).split("/").splice(0, 3),
    "export",
  ].join("/");
  return String(url);
}

export const streamGoogleSheetsCsv = (sheetsCsvUrl: string) => {
  const url = new URL(sheetsCsvUrl);
  const params = new URLSearchParams(url.search);
  if (!params.has("format")) params.set("format", "csv");
  url.search = params.toString();
  return fetchTextStreamReader(toSheetsDataExportUrl(url.toString()), {
    mode: "cors",
    redirect: "follow",
    headers: { accept: "text" },
  });
};
