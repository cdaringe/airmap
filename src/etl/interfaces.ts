export interface PurpleResponse {
  mapVersion: string;
  baseVersion: string;
  mapVersionString: string;
  results: [PurpleResult, PurpleResult];
}

export interface PurpleResult {
  ID: number;
  Label: string;
  DEVICE_LOCATIONTYPE?: string;
  THINGSPEAK_PRIMARY_ID: string;
  THINGSPEAK_PRIMARY_ID_READ_KEY: string;
  THINGSPEAK_SECONDARY_ID: string;
  THINGSPEAK_SECONDARY_ID_READ_KEY: string;
  Lat: number;
  Lon: number;
  PM2_5Value: string;
  LastSeen: number;
  Type?: string;
  Hidden: string;
  DEVICE_BRIGHTNESS?: string;
  DEVICE_HARDWAREDISCOVERED?: string;
  Version?: string;
  LastUpdateCheck?: number;
  Created: number;
  Uptime?: string;
  RSSI?: string;
  Adc?: string;
  p_0_3_um: string;
  p_0_5_um: string;
  p_1_0_um: string;
  p_2_5_um: string;
  p_5_0_um: string;
  p_10_0_um: string;
  pm1_0_cf_1: string;
  pm2_5_cf_1: string;
  pm10_0_cf_1: string;
  pm1_0_atm: string;
  pm2_5_atm: string;
  pm10_0_atm: string;
  isOwner: number;
  humidity?: string;
  temp_f?: string;
  pressure?: string;
  AGE: number;
  Stats: string;
  ParentID?: number;
  Flag?: number;
}

export interface ThingSpeakResponse {
  channel: ThingSpeakChannel;
  feeds: ThingSpeakFeed[];
}

export interface ThingSpeakChannel {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  created_at: string;
  updated_at: string;
  last_entry_id: number;
}

export interface ThingSpeakFeed {
  created_at: string;
  entry_id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
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

export type SensorAccess = { key: string; show: number };
