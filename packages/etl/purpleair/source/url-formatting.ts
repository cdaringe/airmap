export const asQueryParamDate = (date: Date) =>
  date
    .toISOString()
    .replace(/\.\d\d\dZ/, "")
    .replace("T", "%20");
