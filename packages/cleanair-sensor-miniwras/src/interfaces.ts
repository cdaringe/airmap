import * as dateFns from "date-fns";
import { Entry as PocketEntry } from "../../cleanair-sensor-pocketlabs/src/interfaces";
import { DatEntry } from "./streams/parse-measure-stream";
export * from "./streams/parse-measure-stream";

export type Entry = {
  date: Date;
  pm_2_5: number;
  pm05To3Calibrated: number;
  pm05: number;
  pm05Calibrated: number;
  pm05EndCol: number;
  channels: DatEntry["channels"];

  // non-native datas to the miniwras
  pocketlabsEntry?: PocketEntry;
  latitude: number;
  longitude: number;
};

export type ModResources = {
  closestTo: typeof dateFns.closestTo;
};
