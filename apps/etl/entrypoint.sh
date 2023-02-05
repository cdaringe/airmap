# /usr/bin/env sh
# set -e
# echo '{"msg": "booting - next attempt in 1 hour"}'
# sleep 3600
while true; do
  # 1x day
  echo '{"msg": "attempting scrape"}'
  sleep 86400
  npm start
done
