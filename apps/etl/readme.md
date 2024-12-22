# etl

populate PCA analysis database.

## what it does

- loads in a list of [sensors](./src/sensors.ts)
- one sensor at a time...
  - loads a sensor into the PCA database, if missing ("sinkSensor")
  - asks for the latest sync date and the latest observation time for the sensor
  - asks if at least 14 days have passed since the last sync. halts if <14 days passed
  - gets all observations since the lastObservation, with fields as defined by [the purpleapi call](./src/purpleair/source/purpleapi.ts)

## develop

Development is done by the following:

1. Run the db & gql stack (e.g. `rad -l info services`) from the monorepo root
2. Only consider datasets as recent as 1-month ago, set XXX for this
3. `pnpm run dev`

Recall the following:

- in debug mode, we consider only the first sensor
- LOG_LEVEL=debug is useful. use it
- observations start 2020-01-01. You can mutate the `latest_observation_time` after the first etl to skip forward in time, which is very handy

## build/deploy

### overview

The deployment generally works as follows:

1. migrate a database
2. build artifacts
3. ship artifacts to the host
4. boot the artifacts

This repo has some knowledge of the deployment host, as opposed to letting
some arbitrary deployment orchestrator (k8s, ansible, whatever) do the work.
If you want to use those tools, only execute steps 1 & 2 above.

### steps

- consider backing up the db in the remote. good ol `cp -r db_data db_data.bak` is good enough.
- migrate the db before doing anything, if pertinent. see the migration instructions [here](../../pca_db_hasura/readme.md).
- `USER=$DROPLET_USER HOST=$DROPLET_IP pnpm run deploy`: clean, compile, build-image, ship, import-image on the remote server
  - the container must be run manually or by an orchestrator
    - the container must be configured via ENV (`cdaringe-provision` repo deployment scripts)

## Helpful scripts/tools/sql

### Purge and retry data from some-date onwards

1. disable the etl process

```sql
-- purge all observations since november
--- check first
select * from observation_purpleair where timestamp >= '2024-05-01' limit 50;

-- delete months of data
DELETE FROM observation_purpleair WHERE timestamp > '2024-05-01';

-- reset watermarks
UPDATE sensor SET latest_sync_timestamp = '2024-04-30';
UPDATE sensor SET latest_observation_timestamp = '2024-05-01';
```
