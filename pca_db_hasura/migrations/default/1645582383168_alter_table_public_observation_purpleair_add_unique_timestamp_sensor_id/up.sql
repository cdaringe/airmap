alter table "public"."observation_purpleair" add constraint "observation_purpleair_timestamp_sensor_id_key" unique ("timestamp", "sensor_id");
