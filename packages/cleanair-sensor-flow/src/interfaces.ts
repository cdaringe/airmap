export type MeasureEntry = {
  timestamp: number;
  voc_ppb: number;
  pm_2_5: number;
};

export type FlowEntry = {
  latitude?: number;
  longitude?: number;
  skip?: boolean;
} & MeasureEntry;

export type ModResources = {
  closestTo: (a: unknown, ...b: unknown[]) => Date;
};
