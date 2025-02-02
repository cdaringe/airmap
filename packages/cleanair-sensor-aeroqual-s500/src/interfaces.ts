export type AeroqualS500OnlyEntry = {
  date: Date;
  tvoc: number;
};

export type Entry = AeroqualS500OnlyEntry & {
  longitude: number;
  latitude: number;
};
