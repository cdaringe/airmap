#!/usr/bin/env sh
while true; do
  npm start
  echo '{"msg": "sleeping for 3600 seconds"}'
  sleep 3600
done
