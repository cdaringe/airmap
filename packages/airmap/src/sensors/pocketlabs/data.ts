import {
  fetchGoogleSheetsCsv,
  matrixToGeoJson,
} from "../../components/data/geojson";
import { normalizeMultiTableCsv } from "../../components/data/normalize-multi-table-csv";
import { SensorDownloadHook } from "../interfaces";
import { tupleAsMapboxRange } from "../common";
import zip from "lodash/zip";

const RAW_PM1_HEADER = "PM1.0 (µg/m³)" as const;
const RAW_PM2_HEADER = "PM2.5 (µg/m³)" as const;
const PM2_CORRECTED_FIELD_NAME = "PM2.5 Corrected";
const HEADER_NAMES = ["Lat", "Lng", RAW_PM1_HEADER, RAW_PM2_HEADER, "t (s)"];
const HEADER_NAMES_HUMIDITY = ["Lat", "Lng", "t (s)", "Relative Humidity (%)"];

const COLORS = [
  "#4d0173",
  "#991113",
  "#ff5600",
  "#ffaa00",
  "#feff00",
  "#6fc400",
  "#3aa702",
].reverse();

let mapBoxGetPM2Field: ["get", string] = ["get", PM2_CORRECTED_FIELD_NAME];

const FIXED_PM2_LEVEL_RANGES: [number, number][] = [
  0, 0.25, 0.5, 1, 2.5, 5, 20,
].map((lower, i, arr) => {
  const upper = arr[i + 1] || Infinity;
  return [lower, upper] as [number, number];
});

const applyEpaCorrection = (old: number, humidity: number) =>
  0.0534 * old - 0.0844 * humidity + 5.604;

type HumidityFields = {
  "Relative Humidity (%)": string;
  "t (s)": string;
};
type ParticulateFields = {
  "PM2.5 (µg/m³)": string;
  "PM1.0 (µg/m³)": string;
  "t (s)": string;
};

/**
 * PocketLabs
 * > ...automatically applies the EPA correction which adjusts for humidity
 * > and removes an inaccuracy inherent to the widely used Plantower sensor.
 * > PurpleAir, DEQ's "SensOR" monitors, and our bike mounted GPS-equipped
 * > PocketLab monitors all use Plantower sensors
 */
const getPocketlabs: SensorDownloadHook = async (urls) => {
  const csv = await fetchGoogleSheetsCsv(urls[0]);
  const geojsonParticulate = await matrixToGeoJson<ParticulateFields>(
    normalizeMultiTableCsv(csv, HEADER_NAMES)
  );
  const geojsonHumidity = await matrixToGeoJson<HumidityFields>(
    normalizeMultiTableCsv(csv, HEADER_NAMES_HUMIDITY)
  );
  const combinedFeatures = zip(
    geojsonParticulate.features,
    geojsonHumidity.features
  )
    .map(([feature, featureHumidity], i) => {
      if (!feature) throw new Error("missing particulate row - invalid csv");
      if (!featureHumidity)
        throw new Error("missing humidity row - invalid csv");
      const tempProperties: ParticulateFields & HumidityFields = {
        ...featureHumidity.properties,
        ...feature.properties,
      };
      const humidityProperties = featureHumidity.properties;
      const humidity =
        parseFloat(humidityProperties["Relative Humidity (%)"]) / 100;
      const pm2 = parseInt(feature.properties[RAW_PM2_HEADER]);
      const pm2Corrected = applyEpaCorrection(pm2, humidity);
      return {
        ...feature,
        properties: {
          ...tempProperties,
          [PM2_CORRECTED_FIELD_NAME]: pm2Corrected,
          t1: feature.properties["t (s)"],
          t2: humidityProperties["t (s)"],
        },
      };
    })
    .filter(({ properties: { t1, t2 } }) => {
      if (t1 !== t2) {
        console.warn(
          ["Time mismatch.", `particulate: ${t1}`, `humidity: ${t2}`].join("\n")
        );
        return false;
      }
      return true;
    });
  const geojson = {
    ...geojsonParticulate,
    features: combinedFeatures,
  } as GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    ParticulateFields & HumidityFields & { [PM2_CORRECTED_FIELD_NAME]: number }
  >;
  return {
    geojson,
    getLevels: ({ isMinMaxDynamicRange, geojson }) => {
      let currentPm2 = 0;
      let min = Infinity;
      let max = -Infinity;
      for (const feature of geojson.features) {
        currentPm2 = feature.properties?.[PM2_CORRECTED_FIELD_NAME];
        if (currentPm2 > max) max = currentPm2;
        if (currentPm2 < min) min = currentPm2;
      }
      const numColors = COLORS.length;
      const levelSpan = isMinMaxDynamicRange ? (max - min) / numColors : 0;
      const pm2Ranges = isMinMaxDynamicRange
        ? [...new Array(numColors)].map((_, i) => {
            const base = min + i * levelSpan;
            return [base, base + levelSpan] as [number, number];
          })
        : FIXED_PM2_LEVEL_RANGES;
      return {
        fieldName: PM2_CORRECTED_FIELD_NAME,
        colors: COLORS,
        pm2Ranges,
        circleCases: pm2Ranges
          .map(tupleAsMapboxRange(mapBoxGetPM2Field))
          .flatMap((condition, i) => [condition, COLORS[i]]),
      };
    },
  };
};

export const download = getPocketlabs;
export const dateField = "Date";
