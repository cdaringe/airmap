alter table "public"."sensor" drop constraint "sensor_pkey";
alter table "public"."sensor"
    add constraint "sensor_pkey"
    primary key ("id");
