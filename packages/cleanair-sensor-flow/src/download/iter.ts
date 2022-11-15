export const take = <T>(n: number, ts: T[]): T[] => {
  const res: T[] = [];
  let count = 0;
  while (count < n) {
    res.push(ts[count]);
    ++count;
  }
  return res;
};
