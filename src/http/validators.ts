export function isValidHttpUrl(string: string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

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
  if (!isGoogleSheetsCompatibleUrl(urlstr)) {
    throw new Error(`url incompatible ${urlstr}`);
  }
  const url = new URL(urlstr);
  url.pathname = [
    ...url.pathname.substr(1).split("/").splice(0, 3),
    "gviz",
    "tq",
  ].join("/");
  return String(url);
}
