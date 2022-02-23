alter table "public"."observation_purpleair" add constraint "observation_purpleair_timestamp_sensor_id_key" unique (timestamp, sensor_id);
alter table "public"."observation_purpleair" alter column "sensor_id" drop not null;
alter table "public"."observation_purpleair" add column "sensor_id" int4;
