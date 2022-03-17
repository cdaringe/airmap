import { parse } from "./src/streams/parse-pocketlabs-stream";
import { normalizeMultiTableCsv } from "../../components/data/normalize-multi-table-csv";
import zip from "lodash/zip";
import { streamGoogleSheetsCsv } from "../sensor-flow/node_modules/cleanair-sensor-common";

type PocketEntry = {};

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
export const download = async (urls) => {
  const stream = await streamGoogleSheetsCsv(urls[0]).then(parse);
  const geojsonParticulate = await matrixToGeoJson<ParticulateFields>(
    normalizeMultiTableCsv(csv, HEADER_NAMES)
  );
  const geojsonHumidity = await matrixToGeoJson<HumidityFields>(
    normalizeMultiTableCsv(csv, HEADER_NAMES_HUMIDITY)
  );
  const combinedFeatures = zip(
    geojsonParticulate.features,
    geojsonHumidity.features
  );

  return {
    geojson,
  };
};

export const toGeoJSON = (data: PocketEntry[]) =>
  data
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

export const dateField = "Date";
