CREATE TABLE "public"."observation_purpleair" (
  "id" serial NOT NULL,
  "sensor_id" integer NOT NULL,
  "timestamp" timestamptz NOT NULL DEFAULT now(),
  "pm_2_5_atm" real NOT NULL,
  "pm_2_5_cf" real,
  "pm_1_atm" real,
  "humidity" real,
  "pressure" real,
  "temperature_f" real,
  PRIMARY KEY ("id") ,
  FOREIGN KEY ("sensor_id") REFERENCES "public"."sensor"("id") ON UPDATE restrict ON DELETE cascade,
  UNIQUE ("timestamp", "sensor_id"));
