// https://www.mathworks.com/help/thingspeak/readdata.html
import _got from "got";
import { ApiCallTracker } from "../../api-call-tracker";
import { getConfig } from "../../config";
import { isProd } from "../../env";
import {
  PurpleHistoryDataRecord,
  PurpleHistoryResponse,
  PurpleSensorResponse,
} from "../../interfaces";

const rateLimitGot = (() => {
  // we honor the 1000x max daily limit by only running the service 1x/day
  const maxRequests = isProd ? 900 : 500;
  let count = 0;
  return (...params: Parameters<typeof _got>) => {
    ++count;
    if (count === maxRequests) {
      throw new Error(`max requests hit: ${maxRequests}`);
    }
    return _got(...params);
  };
})() as typeof _got;

const retry = { limit: isProd ? 2 : 0 };

const PURPLE_API_BASE_URL = `https://api.purpleair.com/v1`;

const jsonHeaders = (apiKey: string) => ({
  Referer: "https://api.purpleair.com/",
  "X-API-Key": apiKey,
  Accept: "application/json",
});

const getSensorObservationHistoryUrl = ({
  end,
  sensorId,
  start,
}: {
  end: Date;
  sensorId: number;
  start: Date;
}) => {
  const url = [
    `${PURPLE_API_BASE_URL}/sensors/${sensorId}/history/json?`,
    `start_timestamp=${Math.ceil(start.getTime() / 1000)}`,
    `end_timestamp=${Math.ceil(end.getTime() / 1000)}`,
    `average=60`,
    "fields=voc,pm2.5_atm,pm1.0_atm,pm2.5_cf_1,humidity,temperature,pressure",
  ].join("&");
  return url;
};

export const getSourceObservations = async ({
  start,
  end,
  sensorId,
  sourceCallTracker,
}: {
  start: Date;
  end: Date;
  sensorId: number;
  sourceCallTracker: ApiCallTracker;
}) => {
  const readKey = getConfig().PURPLE_AIR_READ_KEY;
  const url = getSensorObservationHistoryUrl({ start, end, sensorId });
  await sourceCallTracker.incr();
  return rateLimitGot(url, {
    headers: jsonHeaders(readKey),
    retry,
  })
    .json<PurpleHistoryResponse>()
    .catch((error) => {
      console.error(error.response.body);
      throw error;
    })
    .then((r) => {
      const lastData = r.data as unknown as any[][];
      const result: PurpleHistoryResponse = {
        ...r,
        data: lastData.map((recordArr) => {
          return r.fields.reduce<PurpleHistoryDataRecord>((acc, key, i) => {
            const value = recordArr[i];
            if (value === undefined) {
              throw new Error(
                `value undefined: ${JSON.stringify({
                  key,
                  i,
                  recordArr,
                  fields: r.fields,
                })}`
              );
            }
            return {
              ...acc,
              [key]: key === "time_stamp" ? new Date(value * 1000) : value,
            };
          }, {} as PurpleHistoryDataRecord);
        }),
      };
      return result;
    });
};

export const getSourceSensor = async ({
  sensorIndex,
  sourceCallTracker,
}: {
  sensorIndex: number;
  sourceCallTracker: ApiCallTracker;
}) => {
  const readKey = getConfig().PURPLE_AIR_READ_KEY;
  const url = `${PURPLE_API_BASE_URL}/sensors/${sensorIndex}?fields=name,model,location_type,latitude,longitude`;
  await sourceCallTracker.incr();
  return rateLimitGot(url, {
    headers: jsonHeaders(readKey),
    retry,
  }).json<PurpleSensorResponse>();
};
