export type TigerXtOnlyEntry = {
  date: Date;
  isobutylene: number;
};

export type Entry = TigerXtOnlyEntry & {
  longitude: number;
  latitude: number;
};