CREATE TABLE "public"."observation_purpleair" (
  "id" serial NOT NULL,
  "sensor_id" integer NOT NULL,
  "timestamp" timestamptz NOT NULL DEFAULT now(),
  "pm_2_5_atm" real NOT NULL,
  "pm_2_5_cf" real NOT NULL,
  "pm_1_atm" real NOT NULL,
  "humidity" real NOT NULL,
  "pressure" real,
  "temperature_f" real NOT NULL,
  PRIMARY KEY ("id") ,
  FOREIGN KEY ("sensor_id") REFERENCES "public"."sensor"("id") ON UPDATE restrict ON DELETE cascade,
  UNIQUE ("timestamp", "sensor_id"));
