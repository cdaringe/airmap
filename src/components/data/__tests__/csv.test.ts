import test from "ava";
import { normalizeMultiTableCsv } from "../normalize-multi-table-csv";

const csvInput = `
Lat,Lng,Date,t (s),Pressure (mBar),Temperature (°C),Relative Humidity (%),Light Intensity (Lux),,,
-180,-180,11/13/2021 8:31:59,0,1018.319702,20.85,47.813705,2.796,,,
-180,-180,11/13/2021 8:32:00,1,1018.339417,20.84,49.094906,2.796,,,

,,,,,,,,,,
,,,,,,,,,,
Lat,Lng,Date,t (s),PM1.0 (µg/m³),Mean PM1.0 (µg/m³),PM2.5 (µg/m³),Mean PM2.5 (µg/m³),PM10 (µg/m³),Mean PM10 (µg/m³),AQI
45.54481,-122.60523,11/13/2021 8:31:59,0,5,5,13,13,16,16,52.892704
45.54481,-122.60523,11/13/2021 8:32:00,1,6,5.5,14,13.5,17,16.5,54.995708
45.54481,-122.60523,11/13/2021 8:32:01,2,6,5.666667,14,13.666667,17,16.666667,54.995708
`;

test("multi table csv parse", async (t) => {
  const headerNames = ["Date", "PM2.5 (µg/m³)"];
  const result = normalizeMultiTableCsv(csvInput, headerNames);
  t.deepEqual(result, [
    headerNames,
    ["11/13/2021 8:31:59", "13"],
    ["11/13/2021 8:32:00", "14"],
    ["11/13/2021 8:32:01", "14"],
  ]);
});
