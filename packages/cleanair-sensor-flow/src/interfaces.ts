export type FlowEntry = {
  timestamp: number;
  latitude: number;
  longitude: number;
  voc_ppb: number;
  skip?: boolean;
  pm_2_5: number;
};
