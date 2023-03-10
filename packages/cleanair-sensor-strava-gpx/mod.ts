export type Entry = { date: Date; lat: number; lon: number };

/**
 * Parse strava gpx to array of points
 */
export const ofGpxString = (input: string) => {
  const out = new DOMParser().parseFromString(input, "text/xml") as XMLDocument;
  const trksegs = out.getElementsByTagName("trkseg");
  if (!trksegs.length) {
    throw new Error("invalid gpx: missing trkseg");
  }
  const result = Array.from(trksegs).flatMap((trkseg) =>
    Array.from(trkseg.children).map((el) => {
      if (el.tagName === "trkpt") {
        const [lat, lon] = ["lat", "lon"].map((field) => {
          const raw = el.getAttribute(field);
          if (!raw) throw new Error(`missing ${field} attribute`);
          const value = parseFloat(raw);
          if (Number.isFinite(value)) {
            return value;
          }
          throw new Error(`invalid ${field}: ${value}`);
        });
        const [time] = Array.from(el.getElementsByTagName("time"));
        if (!time) throw new Error("missing time element.");
        const date = new Date(time.textContent || "");
        if (!date.valueOf()) {
          throw new Error(`invalid date: ${time.innerHTML}`);
        }
        return { date, lat, lon };
      } else {
        throw new Error(`invalid trkseg child: ${el.tagName}`);
      }
    })
  );
  return result;
};
