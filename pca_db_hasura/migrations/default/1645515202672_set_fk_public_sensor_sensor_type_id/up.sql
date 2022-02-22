alter table "public"."sensor"
  add constraint "sensor_sensor_type_id_fkey"
  foreign key ("sensor_type_id")
  references "public"."sensor_type"
  ("id") on update restrict on delete restrict;
