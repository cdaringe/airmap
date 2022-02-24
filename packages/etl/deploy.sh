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
cd $BUILD_DIR;
docker build -t $TAG .;
"
