import * as dateFns from "date-fns";

export type MeasureEntry = {
  date: Date;
  voc_ppb: number;
  pm_2_5: number;
};

export type Entry = {
  latitude?: number;
  longitude?: number;
  skip?: boolean;
} & MeasureEntry;

export type ModResources = {
  closestTo: typeof dateFns.closestTo;
};
