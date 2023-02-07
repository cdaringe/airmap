export interface PurpleBaseResponse {
  api_version: string;
  /**
   * seconds
   */
  time_stamp: number;
}

export type SensorLocationIndoor = 1;
export type SensorLocationOutdoor = 0;
export interface PurpleSensorResponse extends PurpleBaseResponse {
  data_time_stamp: number;
  sensor: {
    sensor_index: number;
    name: string;
    location_type: SensorLocationOutdoor | SensorLocationIndoor;
    model: string;
    latitude: number;
    longitude: number;
  };
}

export type PurpleHistoryDataRecord = {
  time_stamp: "string";
  humidity: number;
  temperature: number;
  pressure: number;
  voc: number;
  "pm1.0_atm": number;
  "pm2.5_atm": number;
  "pm2.5_cf_1": number;
};

export interface PurpleHistoryResponse extends PurpleBaseResponse {
  sensor_index: number;
  /**
   * seconds
   */
  start_timestamp: number;
  /**
   * seconds
   */
  end_timestamp: number;
  average: number;
  fields: [
    "time_stamp",
    "humidity",
    "temperature",
    "pressure",
    "voc",
    "pm1.0_atm",
    "pm2.5_atm",
    "pm2.5_cf_1"
  ];
  // this is not entirely true. the real data comes thru as an array, indexed
  // by `.fields` above. we do some casting in the query handler to make it nice
  data: PurpleHistoryDataRecord[];
}

export type Observation = {
  created_at: string;
  humidity: number;
  pm_1_atm: number;
  pm_2_5_atm: number;
  pm_2_5_cf: number;
  sensor_id: string;
  temperature_f: number;
};

export type SensorAccess = { key: string; sensorIndex: number };
