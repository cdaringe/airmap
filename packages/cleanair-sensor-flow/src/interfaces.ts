export type FlowEntry = {
  timestamp: number;
  latitude: number;
  longitude: number;
  voc_ppb: number;
  skip?: boolean;
  pm_2_5: number;
};

export type ModResources = {
  closestTo: (a: unknown, ...b: unknown[]) => Date;
};
