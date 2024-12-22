#!/usr/bin/env bash
set -exo pipefail

IMAGE=cdaringe/etl-purple
IMAGE_TAR_FILENAME=.tmp_docker_etl-purple.tar
REMOTE_IMAGE_TAR_FILENAME=/www/$IMAGE_TAR_FILENAME

if [[ -z "${USER}" ]]; then
  echo "missing USER"
  exit 1
fi
if [[ -z "${HOST}" ]]; then
  echo "missing HOST"
  exit 1
fi

docker save -o $IMAGE_TAR_FILENAME $IMAGE
rsync -avz $IMAGE_TAR_FILENAME $USER@$HOST:$REMOTE_IMAGE_TAR_FILENAME

ssh $USER@$HOST "
set -exo pipefail;
docker load -i $REMOTE_IMAGE_TAR_FILENAME
rm $REMOTE_IMAGE_TAR_FILENAME;
docker images | grep $IMAGE;
"

echo "etl image (tag: $TAG) built on $HOST"
echo "ok. now run standard provisioning"
