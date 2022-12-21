import { Entry } from "../../cleanair-sensor-pocketlabs/src/interfaces.ts";

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
  closestTo: (a: unknown, ...b: unknown[]) => Date;
};
