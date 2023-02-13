import * as dateFns from "date-fns";
import { Entry } from "../../cleanair-sensor-pocketlabs/src/interfaces";

export type MiniWRASEntry = {
  date: Date;
  skip?: boolean;
  pm_2_5: number;
  sub500nm: number;
  // non-native datas to the miniwras
  pocketlabsEntry: Entry;
  latitude: number;
  longitude: number;
  humidity: number;
};

export type ModResources = {
  closestTo: typeof dateFns.closestTo;
};
