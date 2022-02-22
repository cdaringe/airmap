// https://www.mathworks.com/help/thingspeak/readdata.html
import got from "got";
import {
  SensorAccess,
  ThingSpeakResponse,
  PurpleResponse,
} from "../../interfaces.js";
import { asQueryParamDate } from "./url-formatting.js";

const DAYS_MS = 1000 * 60 * 60 * 24;

const getPurpleUrl = ({ key, show }: SensorAccess) =>
  `https://www.purpleair.com/json?key=${key}&show=${show}`;

const getThingspeakUrl = ({
  channel,
  fmt = "json",
  apiKey,
  start,
  end,
}: {
  channel: string;
  fmt?: "json" | "csv";
  apiKey: string;
  start: Date;
  end: Date;
}) => {
  const url = [
    `https://api.thingspeak.com/channels/${channel}/feeds.${fmt}?`,
    `start=${asQueryParamDate(start)}`,
    `end=${asQueryParamDate(end)}`,
    `results=8000`,
    `api_key=${apiKey}`,
  ]
    .filter(Boolean)
    .join("&");
  // console.log(url);
  return url;
};

export const getSourceObservations = ({
  channelId,
  apiKey,
  end,
  start,
}: {
  channelId: string;
  apiKey: string;
  start: Date;
  end: Date;
}) =>
  got(
    getThingspeakUrl({ channel: channelId, apiKey, start, end })
  ).json<ThingSpeakResponse>();

export const getSourceSensor = (sensorAccess: SensorAccess) =>
  got(getPurpleUrl(sensorAccess))
    .json<PurpleResponse>()
    .then((r) => r.results);
