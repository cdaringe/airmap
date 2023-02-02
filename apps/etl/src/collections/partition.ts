export const partition = <T>(arr: T[], partitionSize: number) => {
  const partitions: T[][] = [];
  let current: T[] = [];
  const mutableArr = [...arr];
  while (mutableArr.length) {
    current.push(mutableArr.shift()!);
    if (current.length === partitionSize) {
      partitions.push(current);
      current = [];
    }
  }
  if (current.length) partitions.push(current);
  return partitions;
};
