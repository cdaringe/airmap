import { sensors } from "./sensors.js";
import { SensorAccess } from "./interfaces.js";
import pAll from "p-all";
import { sleep } from "./util.js";
import {
  getSourceSensor,
  getSourceObservations,
} from "./purpleair/source/thingspeak.js";
import * as sink from "./purpleair/sink/queries.js";
import assert from "assert";
import { asQueryParamDate } from "./purpleair/source/url-formatting.js";

const OLDEST_ALLOWED_DATA_DATE = new Date("2020-01-01");

async function etl(sensorAccess: SensorAccess) {
  let searchBounds = [
    { earliest: OLDEST_ALLOWED_DATA_DATE, latest: new Date() },
  ];
  const [sourceSensor] = await getSourceSensor(sensorAccess);
  const {
    Label,
    Lat,
    Lon,
    THINGSPEAK_PRIMARY_ID,
    THINGSPEAK_PRIMARY_ID_READ_KEY,
  } = sourceSensor;
  const channelId = sourceSensor.THINGSPEAK_PRIMARY_ID;
  const sinkSensor = await sink.getSensor(channelId);
  if (sinkSensor.errors?.length) throw new Error(sinkSensor.errors[0]);
  const numMatchingSensors = sinkSensor.data?.sensors.length;
  assert(typeof numMatchingSensors === "number");
  const prettySensor = `${Label} ${THINGSPEAK_PRIMARY_ID}`;
  console.log(`processing sensor: ${prettySensor}`);
  if (numMatchingSensors === 0) {
    await sink.createSinkSensor({
      id: channelId,
      name: Label,
      lat: Lat,
      lon: Lon,
    });
  } else {
    const { first, last } = await sink.getObservationBounds(channelId);
    if (first && last) {
      // data exists, so get new datas AND ensure that we
      // slurp up old datas _before_ our earliest known point
      searchBounds = [
        {
          earliest: OLDEST_ALLOWED_DATA_DATE,
          latest: new Date(new Date(first).getTime() - 1_000),
        },
        {
          earliest: new Date(new Date(last).getTime() + 1_000),
          latest: new Date(),
        },
      ].reverse();
    } else {
      // pass, use default full range
    }
  }
  const prettyRange = (bounds: { earliest: Date; latest: Date }) =>
    [bounds.earliest, bounds.latest]
      .map((d) => d.toISOString().replace(/T.*/, ""))
      .join(" -> ");
  /**
   * The Thingspeak API is weird and annoying.
   * If you query GET ?start=...&end=..., you'd expect data from
   * start to end. But, you actually get data from end -> start,
   * always. You cannot request data in ascending order :|. So,
   * we must search backwards.
   */
  for (const bounds of searchBounds.filter(
    ({ earliest, latest }) => latest > earliest
  )) {
    console.log(`  searching bounds: ${prettyRange(bounds)}`);
    let isFetchingMore = true;
    while (isFetchingMore) {
      console.log(
        `    fetching backwards from ${bounds.latest
          .toISOString()
          .replace(/T.*/, "")}`
      );
      await sleep(1_000);
      const { feeds } = await getSourceObservations({
        channelId,
        start: bounds.earliest,
        end: bounds.latest,
        apiKey: THINGSPEAK_PRIMARY_ID_READ_KEY,
      });
      const pm1_atm = "field1";
      const pm2_atm = "field2";
      const pm2_cf1 = "field8";
      const pm3_atm = "field3";
      const temperature = "field6";
      const humidity = "field7";
      const records = feeds.map((it) => ({
        pm1_atm: parseInt(it[pm1_atm], 10),
        pm2_atm: parseInt(it[pm2_atm], 10),
        pm2_cf1: parseInt(it[pm2_cf1], 10),
        pm3_atm: parseInt(it[pm3_atm], 10),
        temperature: parseFloat(it[temperature]),
        humidity: parseFloat(it[humidity]),
        sensor_id: channelId,
        created_at: it.created_at,
      }));
      if (feeds.length) {
        await sink.postRecords(records);
        await sleep(1_000);
      }
      const earliestFoundDate = feeds.reduce<null | Date>((earliest, curr) => {
        const currDate = new Date(curr.created_at);
        if (!earliest) return currDate;
        return currDate < earliest ? currDate : earliest;
      }, null);
      isFetchingMore =
        !!earliestFoundDate && earliestFoundDate > bounds.earliest;
      if (isFetchingMore && earliestFoundDate) {
        bounds.latest = new Date(earliestFoundDate?.getTime() - 1_000);
      }
    }
  }
  await sleep(1_000);
  console.log(`\tfinished ${prettySensor}`);
}

const etlAll = (sensors: SensorAccess[]) =>
  pAll(
    sensors.map((s) => () => etl(s)),
    {
      concurrency: 1,
    }
  );

etlAll(sensors);
