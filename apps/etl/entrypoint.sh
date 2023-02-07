#!/usr/bin/env sh
echo '{"msg": "booted"}'
# sleep 3600
while true; do
  echo '{"msg": "sleeping for 86400 seconds"}'
  # 1x day
  sleep 86400
  echo '{"msg": "attempting scrape"}'
  npm start
done
