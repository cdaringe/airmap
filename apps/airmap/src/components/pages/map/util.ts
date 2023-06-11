export const isValidDate = (d: Date) => !d.toString().match(/Invalid/);

export const accessToken =
  "pk.eyJ1IjoicGR4Y2xlYW5haXIiLCJhIjoiY2tweDFuZmxpMjFmbzJ3bXVkajd4dDQ4dSJ9.LYiRB4TgOAckcqZGi-cUXg";

export const normalizeMapboxUrl = (url: string, _resourceType: string) => {
  const isMapboxRequest =
    url.slice(8, 22) === "api.mapbox.com" ||
    url.slice(10, 26) === "tiles.mapbox.com";
  return {
    url: isMapboxRequest ? url.replace("?", "?pluginName=sheetMapper&") : url,
  };
};

export const DEFAULT_START_DATE = new Date("2020-01-01");
export const DEFAULT_END_DATE = new Date(`${new Date().getFullYear()}-12-31`);
