export type Entry = {
  timestamp: Date;
  latitude: number;
  longitude: number;
  _: 0;
};

export type ModResources = {
  closestTo: (a: unknown, ...b: unknown[]) => Date;
};
