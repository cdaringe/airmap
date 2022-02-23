BEGIN TRANSACTION;
ALTER TABLE "public"."sensor" DROP CONSTRAINT "sensor_pkey";

ALTER TABLE "public"."sensor"
    ADD CONSTRAINT "sensor_pkey" PRIMARY KEY ("uid");
COMMIT TRANSACTION;
