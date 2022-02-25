CREATE VIEW observation_purpleair_minutely_agg as (
    SELECT 
      time_bucket('1 minutes', timestamp) AS bucket,
      sensor_id,
      min(timestamp) as timestamp,
      avg(pm_2_5_atm) as avg_pm_2_5_atm,
      avg(humidity) as avg_humidity,
      avg(temperature_f) as avg_temperature_f,
      avg(pm_2_5_cf) as avg_pm_2_5_cf,
      avg(pm_1_atm) as avg_pm_1_atm
    FROM observation_purpleair
    GROUP BY bucket, sensor_id
);
