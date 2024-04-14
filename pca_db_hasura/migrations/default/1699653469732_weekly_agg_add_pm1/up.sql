CREATE OR REPLACE VIEW "public"."observation_purpleair_weekly_agg" AS
 SELECT time_bucket('7 days'::interval, observation_purpleair."timestamp") AS bucket,
    observation_purpleair.sensor_id,
    min(observation_purpleair."timestamp") AS "timestamp",
    avg(observation_purpleair.pm_2_5_atm) AS avg_pm_2_5_atm,
    avg(pm_1_atm) as avg_pm_1_atm,
    avg(voc) as avg_voc
   FROM observation_purpleair
  GROUP BY (time_bucket('7 days'::interval, observation_purpleair."timestamp")), observation_purpleair.sensor_id;
