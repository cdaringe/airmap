CREATE VIEW observation_purpleair_monthly_agg as (
    SELECT
      time_bucket('1 month', timestamp) AS bucket,
      sensor_id,
      min(timestamp) as timestamp,
      avg(humidity) as avg_humidity,
      avg(pm_1_atm) as avg_pm_1_atm,
      avg(pm_2_5_atm) as avg_pm_2_5_atm,
      avg(pm_2_5_cf) as avg_pm_2_5_cf,
      avg(temperature_f) as avg_temperature_f,
      avg(voc) as avg_voc
    FROM observation_purpleair
    GROUP BY bucket, sensor_id
);
