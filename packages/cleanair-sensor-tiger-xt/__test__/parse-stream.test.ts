import test from "ava";
import { parse } from "../src/streams/parse-stream";

// Helper to create a ReadableStream from string data
function createStreamFromString(
  data: string
): ReadableStreamDefaultReader<Uint8Array> {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(data));
      controller.close();
    },
  });
  return stream.getReader();
}

test("parse should skip metadata and find headers dynamically", async (t) => {
  const csvData = `Instrument IRN,T000001C86D7C
Selected calibration,Factory
Factory calibration date,Tuesday, May 13, 2025
User calibration date,Wednesday, July 23, 2025
Select calibration date,Friday, July 18, 2025
Instrument ID,
Gas,Isobutylene
Units,ppb
Session Number,2
Download date,Saturday, September 13, 2025 4:07:55 PM
Zone,001
Record Mode,Single reading
Upper Alarm,100000,ppb
Lower Alarm,50000,ppb
Log Start,1/1/1980 12:00:00 AM
Log End,1/1/1980 12:02:27 AM
Interval,1
Tiger Select
Max Reading,245,ppb,1/1/1980 12:02:27 AM
Date,Time,Isobutylene (ppb)
1/1/1980,12:00:00 AM,176
1/1/1980,12:00:01 AM,179
1/1/1980,12:00:02 AM,175`;

  const reader = createStreamFromString(csvData);
  const entries = await parse(reader);

  t.is(entries.length, 3);
  t.is(entries[0].isobutylene, 176);
  t.is(entries[1].isobutylene, 179);
  t.is(entries[2].isobutylene, 175);

  // Check that dates are parsed correctly
  t.true(entries[0].date instanceof Date);
  t.is(entries[0].date.getTime(), new Date("1/1/1980 12:00:00 AM").getTime());
});

test("parse should handle variable metadata length", async (t) => {
  const csvData = `Instrument IRN,T000001C86D7C
Selected calibration,Factory
Some extra metadata line
Another metadata line
Even more metadata
Date,Time,Isobutylene (ppb)
1/1/1980,12:00:00 AM,200
1/1/1980,12:00:01 AM,205`;

  const reader = createStreamFromString(csvData);
  const entries = await parse(reader);

  t.is(entries.length, 2);
  t.is(entries[0].isobutylene, 200);
  t.is(entries[1].isobutylene, 205);
});

test("parse should skip invalid data rows", async (t) => {
  const csvData = `Date,Time,Isobutylene (ppb)
1/1/1980,12:00:00 AM,176
invalid,data,NaN
1/1/1980,12:00:02 AM,175
incomplete,row`;

  const reader = createStreamFromString(csvData);
  const entries = await parse(reader);

  t.is(entries.length, 2);
  t.is(entries[0].isobutylene, 176);
  t.is(entries[1].isobutylene, 175);
});
