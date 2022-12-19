export type MiniWRASEntry = {
  date: Date;
  skip?: boolean;
  pm_2_7: number;
  // non-native datas to the miniwras
  latitude: number;
  longitude: number;
  humidity: number;
};

export type ModResources = {
  closestTo: (a: unknown, ...b: unknown[]) => Date;
};
