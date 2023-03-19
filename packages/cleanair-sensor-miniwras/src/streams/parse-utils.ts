export const usLocalDateTimetoDate = (v: string) =>
  new Date(
    v
      .trim()
      .split(" ")
      .map((part, i) => {
        if (i === 0) {
          const [y, m, d] = part.split("/");
          const pad = (v: string) => (v.length === 1 ? `0${v}` : v);
          return `${y}-${pad(m)}-${pad(d)}`;
        }
        return `T${part}.000+01:00`; // germany, device hardcoded locale
      })
      .join("")
  );
