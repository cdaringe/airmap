import pino from "pino";
import { SensorAccess } from "./interfaces";
import * as sink from "./purpleair/sink/queries";
import * as source from "./purpleair/source/purpleapi";
import { sensors } from "./sensors";
import { addSeconds, differenceInHours } from "date-fns";
import { ApiCallTracker } from "./api-call-tracker";
import * as fs from "fs";
import { sleep } from "./util";
import { isProd } from "./env";

const { IS_VSCODE_DEBUG } = process.env;

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

const logger = pino({ level: "info" });

async function getOrAddSinkSensor({
  sourceCallTracker,
  sensorIndex,
  isAssertingSensorExists = false,
}: {
  sourceCallTracker: ApiCallTracker;
  sensorIndex: number;
  isAssertingSensorExists?: boolean;
}): Promise<sink.LocalSensor> {
  const sinkSensorResult = await sink.getSensor(sensorIndex);
  assertNoErrors(sinkSensorResult);
  const [sinkSensor] = sinkSensorResult.data?.sensor || [];
  if (!sinkSensor) {
    if (isAssertingSensorExists) {
      throw new Error(`sensor missing for sensor index: ${sensorIndex}`);
    }
    const sourceSensorRes = await source.getSourceSensor({ sensorIndex });
    sourceCallTracker.incr();
    await sink.createSinkSensor(sourceSensorRes.sensor);
    return getOrAddSinkSensor({
      sensorIndex,
      sourceCallTracker,
      isAssertingSensorExists: true,
    });
  }
  return sinkSensor;
}

async function getOrCreateApiMeta(date: Date) {
  const meta = await sink.getDailyApiMeta(date);
  if (meta) {
    return meta;
  }
  return sink.createDailyApiMeta(date);
}

async function etl(opts: {
  access: SensorAccess;
  sourceCallTracker: ApiCallTracker;
  nowDate: Date;
  isColdStart?: boolean;
}): Promise<void> {
  const {
    access,
    sourceCallTracker,
    nowDate,
    isColdStart = !IS_VSCODE_DEBUG,
  } = opts;
  const { sensorIndex } = access;
  const sinkSensor = await getOrAddSinkSensor({
    sensorIndex,
    sourceCallTracker,
  });
  const lastSyncedDate = new Date(sinkSensor.latest_sync_timestamp);
  const latestObservationTimestamp = new Date(
    sinkSensor.latest_observation_timestamp
  );
  const hoursSinceSync = differenceInHours(nowDate, lastSyncedDate);
  const fourteenDaysAgo = new Date(nowDate.getTime() - FOURTEEN_DAYS_MS);
  const isFourteenDaySampleAvailable =
    latestObservationTimestamp.getTime() < fourteenDaysAgo.getTime();
  const prettySensor = {
    id: sinkSensor.id,
    purpleId: sinkSensor.sensor_owned_id,
    name: sinkSensor.name,
  };
  if (!isFourteenDaySampleAvailable) {
    logger.info({
      sensor: prettySensor,
      processing: false,
      skip: true,
      reason: `14 days of data unavailable`,
    });
    return;
  }
  /**
   * cold starts are subject to skipping all processing. if the process is
   * already hot, let it continue processing.
   */
  if (isColdStart && hoursSinceSync < 24) {
    logger.info({
      sensor: prettySensor,
      processing: false,
      skip: true,
      reason: `too recent of sync, hoursSinceSync: ${hoursSinceSync}`,
    });
    return;
  }
  logger.info({ sensor: prettySensor, processing: true });

  // get observations
  sourceCallTracker.incr();
  const observations = await source.getSourceObservations({
    sensorId: sensorIndex,
    start: addSeconds(latestObservationTimestamp, 1),
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
  return etl({ ...opts, isColdStart: false });
}

const etlAll = async (sensors: SensorAccess[]) => {
  const nowDate = new Date();
  let count = 0;
  // const sensorsToEtl = sensors.slice(0, 1);
  const sensorsToEtl = sensors;
  for (const sensor of sensorsToEtl) {
    // pre (etl)
    const dailyApiMeta = await getOrCreateApiMeta(nowDate);
    if (dailyApiMeta.count_api_calls > 900) {
      logger.info({
        dailyApiMeta,
        warning: "api limit near. halting",
      });
      break;
    }
    const sourceCallTracker = new ApiCallTracker();

    // etl
    await etl({ access: sensor, sourceCallTracker, nowDate });

    // post (etl)
    await sink.updateDailyApiMeta({
      date: nowDate,
      count_api_calls: dailyApiMeta.count_api_calls + sourceCallTracker.count,
    });
    ++count;
    logger.info(`${count} sensors transferred`);
  }
};

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
