export const tupleAsMapboxRange = (getField: ["get", string]) =>
  (
    [aGTE, bLT]: [number, number],
  ) => ["all", [">=", getField, aGTE], ["<", getField, bLT]];
