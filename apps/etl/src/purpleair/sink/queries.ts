import {
  Observation,
  PurpleHistoryDataRecord,
  PurpleSensorResponse,
  SensorLocationOutdoor,
} from "../../interfaces";
import { graphQL } from "./gql-common";

const PURPLE_SENSOR_ID = 2;

const QUERY_GET_SENSOR = `
query GetSensor($sensor_owned_id: Int!) {
  sensor(where: {sensor_owned_id: {_eq: $sensor_owned_id}}) {
    id
    is_outdoor
    latest_sync_timestamp
    latest_observation_timestamp
    latitude
    longitude
    name
    sensor_owned_id
    sensor_type_id
  }
}
`.trim();

/**
 * This type is found/derived from GraphQL schema explorer.
 * I simply opened the docs in graphiql, searched for the input type,
 * copied it, and mapped the GQL types to TS types
 */
type Observation_purpleair_insert_input = {
  humidity: number;
  pm_1_atm: number;
  pm_2_5_atm: number;
  pm_2_5_cf: number;
  pressure: number;
  sensor_id: number;
  temperature_f: number;
  timestamp: string;
};
const MUTATION_UPLOAD_OBSERVATIONS = `
mutation UploadPurpleObservations($objects: [observation_purpleair_insert_input!]!) {
  insert_observation_purpleair(objects: $objects) {
    __typename
  }
}`.trim();

const MUTATION_CREATE_SENSOR = `
mutation CreateSensor(
  $is_outdoor:Boolean!,
  $latitude:Float,
  $longitude:Float,
  $name:String!,
  $sensor_owned_id:Int,
  $sensor_type_id:Int!
) {
  insert_sensor_one(object: {
    is_outdoor:$is_outdoor,
    latitude:$latitude,
    longitude:$longitude,
    name:$name,
    sensor_owned_id:$sensor_owned_id,
    sensor_type_id:$sensor_type_id
  }) {
    __typename
  }
}
`.trim();

/**
 * @example
 * ```
 * {
 *  "id": 1,
 *  "latest_observation_timestamp": "2023-02-07T03:10:13.627Z",
 *  "latest_sync_timestamp": "2023-02-07T03:10:13.627Z"
 *  }
 * ```
 */
const MUTATION_UPDATE_SENSOR_ON_OBSERVATION = `
mutation UpdateSensorOnObservations(
  $id: Int!,
  $latest_observation_timestamp:timestamptz!,
  $latest_sync_timestamp:timestamptz!
) {
  update_sensor(
    where: {
    	id: {_eq: $id}
    },
    _set: {
      latest_observation_timestamp: $latest_observation_timestamp,
      latest_sync_timestamp: $latest_sync_timestamp
    }
  )
  {
    returning {
      __typename
    }
  }
}
`.trim();

export type LocalSensor = {
  id: number;
  is_outdoor: boolean;
  latest_sync_timestamp: string;
  latest_observation_timestamp: string;
  latitude: number;
  longitude: number;
  name: string;
  sensor_owned_id: number;
  sensor_type_id: number;
};
export const getSensor = (sensorIndex: number) =>
  graphQL<{
    sensor: LocalSensor[];
  }>(QUERY_GET_SENSOR, "GetSensor", { sensor_owned_id: sensorIndex });

export const updateSensorOnObservations = (opts: {
  sensorId: number;
  latest_observation_timestamp: Date;
  latest_sync_timestamp: Date;
}) => {
  const input = {
    id: opts.sensorId,
    latest_observation_timestamp:
      opts.latest_observation_timestamp.toISOString(),
    latest_sync_timestamp: opts.latest_sync_timestamp.toISOString(),
  };
  return graphQL(
    MUTATION_UPDATE_SENSOR_ON_OBSERVATION,
    "UpdateSensorOnObservations",
    input
  ).then((result) => {
    if (result.errors) {
      throw new Error(
        JSON.stringify({
          error: result.errors,
          input,
        })
      );
    }
    return result;
  });
};

const uploadObservations = (objects: Observation_purpleair_insert_input[]) =>
  graphQL(MUTATION_UPLOAD_OBSERVATIONS, "UploadPurpleObservations", {
    objects: objects,
  }).then((result) => {
    if (result.errors) {
      throw new Error(
        JSON.stringify({
          errors: result.errors,
          sampleObservation: objects[0],
        })
      );
    }
    return result;
  });

export const createSinkSensor = (sensor: PurpleSensorResponse["sensor"]) => {
  const input = {
    is_outdoor: sensor.location_type === (0 as SensorLocationOutdoor),
    latitude: sensor.latitude,
    longitude: sensor.longitude,
    name: sensor.name,
    sensor_owned_id: sensor.sensor_index,
    sensor_type_id: PURPLE_SENSOR_ID,
  };
  return graphQL(MUTATION_CREATE_SENSOR, "CreateSensor", input).then((r) => {
    if (r.errors?.length) {
      throw new Error(
        JSON.stringify({
          errors: r.errors,
          input,
        })
      );
    }
    return r;
  });
};

export async function postRecords(
  localSensor: LocalSensor,
  purpleRecords: PurpleHistoryDataRecord[]
) {
  const records = purpleRecords.map((pr) => {
    const insertInput: Observation_purpleair_insert_input = {
      humidity: pr.humidity,
      pm_1_atm: pr["pm1.0_atm"],
      pm_2_5_atm: pr["pm2.5_atm"],
      pm_2_5_cf: pr["pm2.5_cf_1"],
      pressure: pr.pressure,
      sensor_id: localSensor.id,
      temperature_f: pr.temperature,
      timestamp: pr.time_stamp,
    };
    return insertInput;
  });
  const { errors, data: _ } = await uploadObservations(records);
  if (errors && errors.length) {
    throw new Error(
      JSON.stringify({
        errors,
        sampleInput: records[0],
      })
    );
  }
}
