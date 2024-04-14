# etl

populate PCA analysis database.

## what it does

- loads in a list of [sensors](./src/sensors.ts)
- one sensor at a time...
  - loads a sensor into the PCA database, if missing ("sinkSensor")
  - asks for the latest sync date and the latest observation time for the sensor
  - asks if at least 14 days have passed since the last sync. halts if <14 days passed
  - gets all observations since the lastObservation, with fields as defined by [the purpleapi call](./src/purpleair/source/purpleapi.ts)

## build/deploy

- migrate the db before doing anything. see the migration instructions [here](../../pca_db_hasura/readme.md).
- `bash deploy.sh`
  - the container must be run manually or by an orchestrator
    - script builds the docker image and transports it, does not start it
    - it must be configured via ENV
