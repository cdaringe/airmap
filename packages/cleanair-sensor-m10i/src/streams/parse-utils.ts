export const parseDateString = (rawValue: string) => {
  return new Date(rawValue.replace(" ", "T").replace(/\(|\)/g, ""));
};
