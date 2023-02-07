CREATE TABLE "public"."sensor" (
  "description" text,
  "id" serial NOT NULL,
  "is_outdoor" boolean,
  "latest_sync_timestamp" timestamptz not null default '2020-01-01T00:00:00.001Z',
  "latest_observation_timestamp" timestamptz not null default '2020-01-01T00:00:00.001Z',
  "latitude" float4,
  "longitude" float4,
  "name" varchar NOT NULL,
  "sensor_owned_id" integer null,
  "sensor_type_id" int NOT NULL
 not null,
 PRIMARY KEY ("id") );
