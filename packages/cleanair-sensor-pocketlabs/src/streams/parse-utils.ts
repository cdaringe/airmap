export const normalizeDateString = (rawValue: string) =>
  rawValue
    .trim()
    .split(" ")
    .map((part, i) => {
      if (i === 0) {
        const [m, d, y] = part.split("/");
        const pad = (v: string) => (v.length === 1 ? `0${v}` : v);
        return `${y}-${pad(m)}-${pad(d)}`;
      }
      return `T${part}-08:00`;
    })
    .join("");
