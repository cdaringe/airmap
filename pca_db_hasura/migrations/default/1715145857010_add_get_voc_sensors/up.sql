drop function get_voc_sensors;
CREATE OR REPLACE FUNCTION get_voc_sensors(ts timestamp with time zone)
RETURNS SETOF pca_query_virt_voc_sensors as $$
select sensor_id, max(timestamp) as ts, max(voc) as voc from observation_purpleair
where timestamp < ts
group by sensor_id
$$ LANGUAGE sql STABLE;
