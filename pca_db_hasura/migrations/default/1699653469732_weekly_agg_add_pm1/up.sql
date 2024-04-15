CREATE OR REPLACE VIEW "public"."observation_purpleair_weekly_agg" AS
 SELECT time_bucket('7 days'::interval, observation_purpleair."timestamp") AS bucket,
    observation_purpleair.sensor_id,
    min(observation_purpleair."timestamp") AS "timestamp",
    avg(humidity) as avg_humidity,
    avg(pm_1_atm) as avg_pm_1_atm,
    avg(pm_2_5_atm) as avg_pm_2_5_atm,
    avg(pm_2_5_cf) as avg_pm_2_5_cf,
    avg(temperature_f) as avg_temperature_f,
    avg(voc) as avg_voc
   FROM observation_purpleair
  GROUP BY (time_bucket('7 days'::interval, observation_purpleair."timestamp")), observation_purpleair.sensor_id;
