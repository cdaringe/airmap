// https://www.mathworks.com/help/thingspeak/readdata.html
import got from "got";
import { isProd } from "../../env";
import {
  PurpleResponse,
  SensorAccess,
  PurpleHistoryResponse,
} from "../../interfaces";
import { asQueryParamDate } from "./url-formatting";

const DAYS_MS = 1000 * 60 * 60 * 24;

const retry = { limit: isProd ? 3 : 0 };

const getPurpleUrl = ({ key, show }: SensorAccess) =>
  `https://www.purpleair.com/json?key=${key}&show=${show}`;

const getSensorUrl = ({
  sensorId,
  start,
}: {
  sensorId: number;
  start: Date;
}) => {
  const url = [
    `https://api.purpleair.com/v1/sensors/${sensorId}/json?`,
    `start_timestamp=${start}`,
    `average=60`,
    "fields=pm2.5_atm,humidity",
  ].join("&");
  return encodeURIComponent(url);
};

export const getSourceObservations = ({
  apiKey,
  start,
  sensorId,
}: {
  apiKey: string;
  start: Date;
  sensorId: number;
}) => {
  const url = getSensorUrl({ start, sensorId });
  return got(url, {
    headers: {
      Referer: "https://api.purpleair.com/",
      "X-API-Key": apiKey,
      Accept: "application/json",
    },
    retry,
  }).json<PurpleHistoryResponse>();
};

export const getSourceSensor = (sensorAccess: SensorAccess) => {
  const url = getPurpleUrl(sensorAccess);
  return got(url, { retry })
    .json<PurpleResponse>()
    .then((r) => r.results);
};
