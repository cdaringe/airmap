CREATE TABLE "public"."sensor" ("id" serial NOT NULL, "sensor_type_id" int NOT NULL, "name" varchar NOT NULL, "description" text, "latitude" float4, "longitude" float4, PRIMARY KEY ("id") );
