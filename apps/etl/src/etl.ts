import { addDays, addSeconds, differenceInHours } from "date-fns";
import pino from "pino";
import { ApiCallTracker } from "./api-call-tracker";
import { isDebug, isProd } from "./env";
import { SensorAccess } from "./interfaces";
import * as sink from "./purpleair/sink/queries";
import * as source from "./purpleair/source/purpleapi";
import { sensors } from "./sensors";
import { sleep } from "./util";

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });

/**
 * Get sensor from sink (database), or add it if it doesn't exist from purpleair!
 */
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
    const sourceSensorRes = await source.getSourceSensor({
      sensorIndex,
      sourceCallTracker,
    });
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
  logger.debug(`creating new daily meta`);
  return sink.createDailyApiMeta(date);
}

async function etl(opts: {
  access: SensorAccess;
  sourceCallTracker: ApiCallTracker;
  nowDate: Date;
  isColdStart?: boolean;
}): Promise<void> {
  const { access, sourceCallTracker, nowDate, isColdStart = !isDebug } = opts;
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
    logger.debug({
      sensor: prettySensor,
      processing: false,
      skip: true,
      reason: `OUT_OF_RANGE_14_DAYS`,
      timestamps: {
        last_db_observation: sinkSensor.latest_observation_timestamp,
        fourteen_days_ago: fourteenDaysAgo.toISOString(),
      },
    });
    return;
  }
  /**
   * A cold start means that the process has just fired up, and generally
   * that it's a first pass for this process loading data for this sensor.
   * Cold starts are subject to skipping all processing if we've already
   * tried syncing today. If the process is
   * already hot, let it continue processing.
   */
  if (isColdStart && hoursSinceSync < 24) {
    logger.debug({
      sensor: prettySensor,
      processing: false,
      skip: true,
      reason: `too recent of sync, hoursSinceSync: ${hoursSinceSync}`,
    });
    return;
  }

  // get observations
  /// @warn -- we always search a liiiiiitttle into the future from where we last left off
  const startDatetime = addSeconds(latestObservationTimestamp, 1);
  const endDatetime = addDays(startDatetime, 14);
  const observations = await source.getSourceObservations({
    sensorId: sensorIndex,
    start: startDatetime,
    sourceCallTracker,
    end: endDatetime,
  });

  await sink.updateSensorOnObservations({
    sensorId: sinkSensor.id,
    latest_sync_timestamp: nowDate,
    /**
     * @warn it's not _actually_ an observation, but it is the correct watermark
     */
    latest_observation_timestamp: endDatetime,
  });

  const sorted = observations.data.sort((a, b) => {
    return +new Date(a.time_stamp) - +new Date(b.time_stamp);
  });

  const [firstraw, lastraw] = [sorted[0], sorted[sorted.length - 1]];
  const firstTs = firstraw ? new Date(firstraw.time_stamp) : null;
  const lastTs = lastraw ? new Date(lastraw.time_stamp) : null;

  const range = {
    start: new Date(observations.start_timestamp * 1000),
    end: endDatetime,
  };
  logger.info({
    event: "etl",
    sensor: prettySensor,
    numObservations: observations.data.length,
    numSourceApiCalls: sourceCallTracker.count,
    range,
    observationBounds: observations.data.length
      ? {
          first: firstTs,
          last: lastTs,
        }
      : undefined,
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
  // @warn debug strategy to operate over small set of sensors
  const sensorsToEtl = isDebug ? sensors.slice(0, 1) : sensors;
  let dailyApiMeta = null;
  for (const sensor of sensorsToEtl) {
    // pre (etl)
    dailyApiMeta = await getOrCreateApiMeta(nowDate);
    logger.debug({ dailyApiMeta });
    const sourceCallTracker = new ApiCallTracker(
      dailyApiMeta.count_api_calls,
      nowDate
    );

    // etl
    await etl({ access: sensor, sourceCallTracker, nowDate }).then(
      () => {
        logger.debug(`etl success for sensor: ${sensor.sensorIndex}`);
        ++count;
        logger.debug(`${count} sensors transferred`);
      },
      (err) => {
        logger.error({
          kind: "FAILED_ETL",
          sensor,
          err,
        });
      }
    );
  }
  logger.info({ dailyApiMeta, count });
};

// async function dumpSensorData(sensorIndex: number) {
//   const sensor = await source.getSourceSensor({ sensorIndex, sou });
//   fs.appendFileSync(
//     "./sensors.json",
//     JSON.stringify({
//       name: sensor.sensor.name,
//       sensorIndex,
//       type: sensor.sensor.location_type,
//     }) + "\n"
//   );
//   await sleep(200);
// }

function assertNoErrors<T extends { errors?: string[] }>(t: T) {
  if (t.errors?.length) {
    throw new Error(JSON.stringify(t.errors));
  }
}

export const run = () =>
  etlAll(sensors).then(
    () => logger.info("done"),
    (err) => {
      logger.error(err);
      process.exit(1);
    }
  );
