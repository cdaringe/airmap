// https://www.mathworks.com/help/thingspeak/readdata.html
import _got from "got";
import { getConfig } from "../../config";
import { isProd } from "../../env";
import {
  PurpleSensorResponse,
  PurpleHistoryResponse,
  PurpleHistoryDataRecord,
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

const DAYS_MS = 1000 * 60 * 60 * 24;

const retry = { limit: isProd ? 2 : 0 };

const PURPLE_API_BASE_URL = `https://api.purpleair.com/v1`;

const jsonHeaders = (apiKey: string) => ({
  Referer: "https://api.purpleair.com/",
  "X-API-Key": apiKey,
  Accept: "application/json",
});

const getSensorObservationHistoryUrl = ({
  sensorId,
  start,
}: {
  sensorId: number;
  start: Date;
}) => {
  const url = [
    `${PURPLE_API_BASE_URL}/sensors/${sensorId}/history/json?`,
    `start_timestamp=${Math.ceil(start.getTime() / 1000)}`,
    `average=60`,
    "fields=pm2.5_atm,pm1.0_atm,pm2.5_cf_1,humidity,temperature,pressure",
  ].join("&");
  return url;
};

export const getSourceObservations = ({
  start,
  sensorId,
}: {
  start: Date;
  sensorId: number;
}) => {
  const readKey = getConfig().PURPLE_AIR_READ_KEY;
  const url = getSensorObservationHistoryUrl({ start, sensorId });
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
              [key]: value,
            };
          }, {} as PurpleHistoryDataRecord);
        }),
      };
      return result;
    });
};

export const getSourceSensor = ({ sensorIndex }: { sensorIndex: number }) => {
  const readKey = getConfig().PURPLE_AIR_READ_KEY;
  const url = `${PURPLE_API_BASE_URL}/sensors/${sensorIndex}?fields=name,model,location_type,latitude,longitude`;
  return rateLimitGot(url, {
    headers: jsonHeaders(readKey),
    retry,
  }).json<PurpleSensorResponse>();
};
