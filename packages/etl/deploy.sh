set -exo pipefail

BUILD_DIR=/www/pca/tmp-etl-build
TAG=cdaringe/etl-purple
ssh $USER@$HOST rm -rf $BUILD_DIR
ssh $USER@$HOST mkdir -p $BUILD_DIR
rsync -a \
  --exclude 'node_modules' \
  --exclude 'dist' \
  . $USER@$HOST:$BUILD_DIR
ssh $USER@$HOST "
ls;
cd $BUILD_DIR;
ls;
docker build -t $TAG .;
"
# https://docs.shakiba.net/container/docker/moving-docker-images-around-using-ssh-and-pipe#from-local-to-remote

# docker build -t $TAG .
# docker save $TAG  | ssh $USER@$HOST docker load
