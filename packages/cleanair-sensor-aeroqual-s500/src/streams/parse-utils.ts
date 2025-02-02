import { add } from "date-fns";

export const parseDate = (rawValue: string) => {
  const offset = 7; // PST. we'll check later if PDT
  const date = new Date(
    rawValue
      .trim()
      .split(" ")
      .map((part, i) => {
        if (i === 0) {
          const [m, d, y] = part.split("/");
          const pad = (v: string) => (v.length === 1 ? `0${v}` : v);
          return `${y}-${pad(m)}-${pad(d)}`;
        }
        return `T${part}-07:00`;
      })
      .join("")
  );
  if (isNaN(date.getTime())) {
    throw new Error(`invalid date ${date}`);
  }
  if (offset === date.getTimezoneOffset() / 60) {
    return date;
  }
  return add(date, { hours: 1 });
};
