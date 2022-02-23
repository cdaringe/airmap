alter table "public"."sensor" alter column "id" set default nextval('sensor_id_seq'::regclass);
alter table "public"."sensor" alter column "id" drop not null;
alter table "public"."sensor" add column "id" int4;
