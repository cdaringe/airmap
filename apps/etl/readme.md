# etl

populate PCA analysis database.

## build/deploy

- `bash deploy.sh`
  - the container must be run manually or by an orchestrator
    - script builds the docker image and transports it, does not start it
    - it must be configured via ENV
