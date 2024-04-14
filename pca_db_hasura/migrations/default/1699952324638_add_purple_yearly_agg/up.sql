CREATE VIEW observation_purpleair_yearly_agg as (
    SELECT
      time_bucket('1 year', timestamp) AS bucket,
      sensor_id,
      min(timestamp) as timestamp,
      avg(pm_2_5_atm) as avg_pm_2_5_atm,
      avg(pm_1_atm) as avg_pm_1_atm,
      avg(voc) as avg_voc
    FROM observation_purpleair
    GROUP BY bucket, sensor_id
);
