/**
 * Some devices record multiple datasets in a single worksheet with disjoint
 * columns.
 *
 * Take raw csv data and a list of columns. Parse the full csv, taking rows
 * from tables with the columns of interest, throw away the rest.
 */
export const normalizeMultiTableCsv = (csv: string, headerNames: string[]) => {
  const rows = csv.match(/[^\r\n]+/g)!;
  const results = [headerNames];
  let currentIndicies: number[] = [];
  let isPendingHeaderRow = true;
  for (const row of rows) {
    const firstChar = row[0];
    // case: empty line
    if (!firstChar || firstChar === ",") continue;
    // case: numeric data
    if (firstChar === "-" || firstChar.match(/\d/)) {
      if (isPendingHeaderRow) continue;
      const cells = row.split(",");
      results.push(currentIndicies.map((i) => cells[i]));
      continue;
    }
    // case: header
    const cells = row.split(",");
    currentIndicies = headerNames
      .map((h) => cells.findIndex((cell) => cell === h))
      .filter((v) => v >= 0);
    isPendingHeaderRow = currentIndicies.length !== headerNames.length;
  }
  return results;
};

export const asCsv = (v: string[][]) =>
  v.map((els) => els.join(",")).join("\n");
