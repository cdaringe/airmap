import { ofCsvUrl } from "../../components/data/geojson";
import { SensorDownloadHook } from "../inferaces";

const PM2_CORRECTED_FIELD_NAME = "PM2.5 Corrected";
const HEADER_NAMES = ["Lat", "Lng", "PM1.0 (µg/m³)", "PM2.5 (µg/m³)"];

let fieldpm2 = ["get", "PM2.5"];

const colors = [
  "#4d0173",
  "#991113",
  "#ff5600",
  "#ffaa00",
  "#feff00",
  "#6fc400",
  "#3aa702",
].reverse();
const lvl_pm2_1 = ["<=", fieldpm2, 0.25];
const lvl_pm2_2 = ["all", [">", fieldpm2, 0.25], ["<=", fieldpm2, 0.5]];
const lvl_pm2_3 = ["all", [">", fieldpm2, 0.5], ["<=", fieldpm2, 1]];
const lvl_pm2_4 = ["all", [">", fieldpm2, 1], ["<=", fieldpm2, 2.5]];
const lvl_pm2_5 = ["all", [">", fieldpm2, 2.5], ["<=", fieldpm2, 5]];
const lvl_pm2_6 = ["all", [">", fieldpm2, 5], ["<=", fieldpm2, 20]];
const lvl_pm2_7 = [">", fieldpm2, 20];

const pm2_levels = [
  lvl_pm2_1,
  lvl_pm2_2,
  lvl_pm2_3,
  lvl_pm2_4,
  lvl_pm2_5,
  lvl_pm2_6,
  lvl_pm2_7,
];

const extractPropertiesLegacy = (properties: RawGeoJsonFeaturesFromCsv) => {
  const { "PM2.5 (µg/m³)": pm2Str, "PM1.0 (µg/m³)": pm1Str } = properties;
  return { pm2Str, pm1Str, humidityStr: null };
};

// const extractPropertiesPurple = (properties: RawGeoJsonFeaturesFromCsv) => {
//   const {
//     "Particulate Matter-PM2.5 (ug/m^3)": pm2Str,
//     "Particulate Matter-PM1.0 (ug/m^3)": pm1Str,
//     "Humidity-Humidity (%RH)": humidityStr,
//   } = properties!;
//   return { pm2Str, pm1Str, humidityStr };
// };

const applyEpaCorrection = (old: number, humidity: number) =>
  0.0534 * old - 0.0844 * humidity + 5.604;

type RawGeoJsonFeaturesFromCsv = {
  "PM2.5 (µg/m³)": string;
  "PM1.0 (µg/m³)": string;
};

type ProcessedGeoJsonFeatures = {
  PM1?: number;
  "PM2.5"?: number;
  [PM2_CORRECTED_FIELD_NAME]: number;
  "PM1 Corrected": number;
};

const getPurple: SensorDownloadHook = async (urls) => {
  const geojson = await ofCsvUrl<
    ProcessedGeoJsonFeatures & RawGeoJsonFeaturesFromCsv
  >(urls[0], HEADER_NAMES);
  geojson.features.forEach((feature) => {
    const properties = feature.properties! || {};
    const { pm2Str, pm1Str, humidityStr } = extractPropertiesLegacy(properties);
    const pm2 = parseInt(pm2Str);
    const pm1 = parseInt(pm1Str);
    const humidity = humidityStr ? parseFloat(humidityStr as any) : 0;
    properties["PM2.5"] = pm2;
    properties["PM1"] = pm1;
    if (humidity) {
      properties[PM2_CORRECTED_FIELD_NAME] = applyEpaCorrection(pm2, humidity);
    }
    if (humidity) {
      properties["PM1 Corrected"] = applyEpaCorrection(pm1, humidity);
    }
  });
  return {
    circleCases: pm2_levels.flatMap((condition, i) => [condition, colors[i]]),
    geojson,
  };
};

export const download = getPurple;
