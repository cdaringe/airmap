import * as dateFns from "date-fns";
import { Entry as PocketEntry } from "../../cleanair-sensor-pocketlabs/src/interfaces";
export * from "./streams/parse-measure-stream";

export type Entry = {
  date: Date;
  pm_2_5: number;
  sub500nm: number;

  // non-native datas to the miniwras
  pocketlabsEntry?: PocketEntry;
  latitude: number;
  longitude: number;
};

export type ModResources = {
  closestTo: typeof dateFns.closestTo;
};
