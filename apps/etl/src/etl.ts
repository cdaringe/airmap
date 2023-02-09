import pino from "pino";
import { SensorAccess } from "./interfaces";
import * as sink from "./purpleair/sink/queries";
import * as source from "./purpleair/source/purpleapi";
import { sensors } from "./sensors";
import { addSeconds, differenceInHours } from "date-fns";
const { IS_VSCODE_DEBUG } = process.env;

const logger = pino({ level: "info" });

async function getOrAddSinkSensor(
  sensorIndex: number,
  isAssertingSensorExists = false
): Promise<sink.LocalSensor> {
  const sinkSensorResult = await sink.getSensor(sensorIndex);
  assertNoErrors(sinkSensorResult);
  const [sinkSensor] = sinkSensorResult.data?.sensor || [];
  if (!sinkSensor) {
    if (isAssertingSensorExists) {
      throw new Error(`sensor missing for sensor index: ${sensorIndex}`);
    }
    const sourceSensorRes = await source.getSourceSensor({ sensorIndex });
    await sink.createSinkSensor(sourceSensorRes.sensor);
    return getOrAddSinkSensor(sensorIndex, true);
  }
  return sinkSensor;
}

async function etl(
  access: SensorAccess,
  isColdStart = !IS_VSCODE_DEBUG
): Promise<void> {
  const { sensorIndex } = access;
  const sinkSensor = await getOrAddSinkSensor(sensorIndex);
  const nowDate = new Date();
  const lastSyncedDate = new Date(sinkSensor.latest_sync_timestamp);
  const hoursSinceSync = differenceInHours(nowDate, lastSyncedDate);
  /**
   * cold starts are subject to skipping all processing. if the process is
   * already hot, let it continue processing.
   */
  if (isColdStart && hoursSinceSync < 24) {
    logger.info(
      `skipping sync on ${sensorIndex} [hoursSinceSync: ${hoursSinceSync}]`
    );
    return;
  }
  const prettySensor = `(id: ${sinkSensor.id}, sensor_owned_id: ${sinkSensor.sensor_owned_id}, name: ${sinkSensor.name})`;
  logger.info(`processing sensor: ${prettySensor}`);
  const observations = await source.getSourceObservations({
    sensorId: sensorIndex,
    start: new Date("2022-01-26T00:00:56.000Z"),
    // start: addSeconds(new Date(sinkSensor.latest_observation_timestamp), 1),
  });
  // it's not _actually_ an observation, but it is the correct watermark
  const nextLatestObservationDate = new Date(observations.end_timestamp * 1000);
  await sink.updateSensorOnObservations({
    sensorId: sinkSensor.id,
    latest_sync_timestamp: nowDate,
    latest_observation_timestamp: nextLatestObservationDate,
  });
  const range = {
    start: new Date(observations.start_timestamp * 1000),
    end: nextLatestObservationDate,
  };
  logger.info({
    event: "etl",
    count: observations.data.length,
    range,
  });
  if (observations.data.length) {
    await sink.postRecords(sinkSensor, observations.data);
  }
  if (isProd) {
    await sleep(1000);
  }
  return etl(access, false);
}

const etlAll = async (sensors: SensorAccess[]) => {
  let count = 0;
  // const sensorsToEtl = sensors.slice(0, 1);
  const sensorsToEtl = sensors;
  for (const sensor of sensorsToEtl) {
    await etl(sensor);
    ++count;
    logger.info(`${count} sensors transferred`);
  }
};

import * as fs from "fs";
import { sleep } from "./util";
import { isProd } from "./env";

async function dumpSensorData(sensorIndex: number) {
  const sensor = await source.getSourceSensor({ sensorIndex });
  fs.appendFileSync(
    "./sensors.json",
    JSON.stringify({
      name: sensor.sensor.name,
      sensorIndex,
      type: sensor.sensor.location_type,
    }) + "\n"
  );
  await sleep(200);
}

function assertNoErrors<T extends { errors?: string[] }>(t: T) {
  if (t.errors?.length) {
    throw new Error(JSON.stringify(t.errors));
  }
}

export const run = () => etlAll(sensors);
