import { Observation } from "../../interfaces.js";
import { graphQL } from "./gql-common.js";

const PURPLE_SENSOR_ID = 2;

const QUERY_GET_SENSOR = `
query GetSensor($id: String!) {
  sensors(where: {id: {_eq: $id}}) {
    id
  }
}`.trim();

const QUERY_GET_OBSERVATION_BOUNDS = `
query GetObservationBounds($id: String!) {
  last: observation(order_by: {timestamp: desc}, limit: 1, where: {sensor_id: {_eq: $id}}) {
    timestamp
  }
  first: observation(order_by: {timestamp: asc}, limit: 1, where: {sensor_id: {_eq: $id}}) {
    timestamp
  }
}`.trim();

const MUTATION_UPLOAD_OBSERVATIONS = `
mutation UploadPurpleObservations($objects: [observation_insert_input!]!) {
  insert_observation(objects: $objects) {
    __typename
  }
}`.trim();

const MUTATION_CREATE_SENSOR = `
mutation CreateSensor($id:String!,$name:String!,$typeId:Int!,$lat:numeric!,$lon:numeric!) {
  insert_sensors_one(object: {
    id:$id,
    name:$name,
    sensor_type_id:$typeId,
    lat:$lat,
    lon:$lon
  }) {
    __typename
  }
}`.trim();

export const getSensor = (id: string) =>
  graphQL<{ sensors: { id: string }[] }>(QUERY_GET_SENSOR, "GetSensor", { id });

export const getObservationBounds = (id: string) =>
  graphQL<{
    first: [
      {
        timestamp: string;
      }
    ];
    last: [
      {
        timestamp: string;
      }
    ];
  }>(QUERY_GET_OBSERVATION_BOUNDS, "GetObservationBounds", { id }).then(
    (result) => {
      if (result.errors) throw new Error(result.errors[0]);
      const { first, last } = result.data || {};
      return {
        first: first?.[0]?.timestamp,
        last: last?.[0]?.timestamp,
      };
    }
  );

const uploadObservations = (objects: unknown[]) =>
  graphQL(MUTATION_UPLOAD_OBSERVATIONS, "UploadPurpleObservations", {
    objects: objects,
  });

export const createSinkSensor = ({
  id,
  name,
  typeId = PURPLE_SENSOR_ID,
  lat,
  lon,
}: {
  id: string;
  name: string;
  typeId?: number;
  lat: number;
  lon: number;
}) =>
  graphQL(MUTATION_CREATE_SENSOR, "CreateSensor", {
    id,
    name,
    typeId,
    lat,
    lon,
  }).then((r) => {
    if (r.errors?.length) {
      throw new Error(JSON.stringify(r.errors));
    }
    return r;
  });

export async function postRecords(observations: Observation[]) {
  const records = observations.map(
    ({ created_at, sensor_id, ...observation }) => ({
      observation,
      sensor_id,
      timestamp: created_at,
    })
  );
  const { errors, data: _ } = await uploadObservations(records);
  if (errors && errors.length) {
    throw new Error(JSON.stringify(errors));
  }
}
