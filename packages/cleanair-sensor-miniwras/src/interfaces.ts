export type MiniWRASEntry = {
  date: Date;
  latitude: number;
  longitude: number;
  skip?: boolean;
  pm_2_7: number;
};

export type ModResources = {
  closestTo: (a: unknown, ...b: unknown[]) => Date;
};
