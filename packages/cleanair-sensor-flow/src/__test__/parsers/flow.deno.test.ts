import mod, { moduleResources } from "../../download/mod_deno.ts";
import { assertEquals } from "https://deno.land/std@0.129.0/testing/asserts.ts";

const measures = [
  {
    date: new Date(10),
    voc_ppb: 0,
    pm_2_5: 0,
  },
  {
    date: new Date(16),
    voc_ppb: 0,
    pm_2_5: 0,
  },
  {
    date: new Date(20),
    voc_ppb: 0,
    pm_2_5: 0,
  },
  {
    date: new Date(30),
    voc_ppb: 0,
    pm_2_5: 0,
  },
];
const positions = [
  {
    timestamp: 0,
    latitude: 0,
    longitude: 0,
  },
  {
    timestamp: 5,
    latitude: 5,
    longitude: 5,
  },
  {
    timestamp: 10,
    latitude: 10,
    longitude: 10,
  },
  {
    timestamp: 11,
    latitude: 11,
    longitude: 11,
  },
  {
    timestamp: 15,
    latitude: 15,
    longitude: 15,
  },
  {
    timestamp: 21,
    latitude: 21,
    longitude: 21,
  },
  {
    timestamp: 25,
    latitude: 25,
    longitude: 25,
  },
];
Deno.test({
  name: "combine",
  fn: async () => {
    const result = await mod.combine({
      positions,
      measures,
      r: moduleResources,
    });
    assertEquals(
      result,
      [
        {
          date: "1970-01-01T00:00:00.010Z",
          voc_ppb: 0,
          pm_2_5: 0,
          latitude: 10,
          longitude: 10,
          skip: false,
        },
        {
          date: "1970-01-01T00:00:00.016Z",
          voc_ppb: 0,
          pm_2_5: 0,
          latitude: 15,
          longitude: 15,
          skip: false,
        },
        {
          voc_ppb: 0,
          pm_2_5: 0,
          date: "1970-01-01T00:00:00.020Z",
          latitude: 21,
          longitude: 21,
          skip: false,
        },
        {
          voc_ppb: 0,
          pm_2_5: 0,
          date: "1970-01-01T00:00:00.030Z",
          latitude: 25,
          longitude: 25,
          skip: false,
        },
      ].map((d) => ({ ...d, date: new Date(d.date) }))
    );
  },
});
