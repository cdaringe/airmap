import { useQuery } from "react-query";
import { parse } from "papaparse";
import { getDMY } from "../util/date";

export type RowData = [
  /* date */ Date,
  /* voc, ppm */ number,
  number,
  number,
  number,
  number,
  number,
  number
];

export const useAtmosTubeCsv = (
  name: string,
  startEndDates: [Date, Date],
  url: string,
  groupVocByDay: boolean = true
) => {
  const [startDate, endDate] = startEndDates;
  return useQuery({
    queryKey: `get-chart-${name}-${startDate.getTime()}-${endDate.getTime()}`,
    queryFn: async (ctx) => {
      let header: string[] | null = null;
      let rowsOfInterest: RowData[] = [];
      const res = await fetch(url);
      const body = res.body;
      if (!body) throw new Error("missing data");
      const reader = body.getReader();
      const decoder = new TextDecoder();
      const decode = decoder.decode.bind(decoder);
      const toDate = (s: string) => new Date(s);
      const toInt = (s: string) => parseInt(s, 10);
      const colParsers = [
        toDate,
        parseFloat,
        toInt,
        toInt,
        toInt,
        parseFloat,
        parseFloat,
        parseFloat,
      ] as const;
      const stream = new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const text = decode(value);
            const parsed = parse(text);
            if (parsed.errors.length) {
              throw new Error(JSON.stringify(parsed.errors));
            }
            for (const cells of parsed.data) {
              if (!header) {
                header = cells as string[];
              } else {
                const row = (cells as any[]).map((v, i) =>
                  colParsers[i](v)
                ) as RowData;
                const date = row[0];
                if (date >= startDate && date <= endDate) {
                  rowsOfInterest.push(row);
                }
              }
            }
            // pump _no_ data into the next stream
            // controller.enqueue(value);
          }

          // Close the stream
          controller.close();
          reader.releaseLock();
        },
      });
      await new Response(stream).blob();
      const rows = [
        ...rowsOfInterest
          .reduce<Map<string, RowData[]>>((acc, row) => {
            const [date] = row;
            const [day, month, year] = getDMY(date);
            const key = `${day}_${month}_${year}`;
            const rows = acc.get(key) || [];
            rows.push(row);
            acc.set(key, rows);
            return acc;
          }, new Map())
          .values(),
      ]
        .map((rowsForDay) => {
          const [row1] = rowsForDay;
          const [date1, _voc1, ...row1Rest] = row1;
          const vocAverage = parseFloat(
            (
              rowsForDay.reduce((acc, [, voc]) => acc + voc, 0) /
              rowsForDay.length
            ).toFixed(2)
          );
          const date = new Date(
            date1.getFullYear(),
            date1.getMonth(),
            date1.getDate()
          );
          return {
            date,
            prettyDate: `${date.getDate()} ${date.toLocaleString("default", {
              month: "long",
            })} ${date.getFullYear()}`,
            vocAverage,
          };
        })
        .sort(({ date: a }, { date: b }) => (a > b ? 1 : -1));
      return {
        header,
        rows,
      };
    },
  });
};
