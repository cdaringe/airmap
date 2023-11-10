CREATE VIEW observation_purpleair_weekly_agg as (
    SELECT
      time_bucket('7 days', timestamp) AS bucket,
      sensor_id,
      min(timestamp) as timestamp,
      avg(pm_2_5_atm) as avg_pm_2_5_atm
    FROM observation_purpleair
    GROUP BY bucket, sensor_id
);
