alter table "public"."observation_purpleair"
  add constraint "observation_purpleair_sensor_id_fkey"
  foreign key ("sensor_id")
  references "public"."sensor"
  ("id") on update restrict on delete cascade;
