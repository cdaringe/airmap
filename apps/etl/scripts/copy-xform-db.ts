/**
 * @info CHANGE ME to select action
 * @example
 * ```sh
 * node -r ts-node/register -r ./scripts/secrets.ts ./scripts/copy-xform-db.ts
 * ```
 */
const FN_TO_RUN = observationsToDisk;

import * as pg from "pg";
const pool = process.env.PGPASSWORD
  ? new pg.Pool()
  : (() => {
      throw new Error(
        "add a secrets.ts file, and include it via `node -r ./secrets.ts` style"
      );
    })();
import QueryStream from "pg-query-stream";
const JSONStream = require("JSONStream");

async function observationsToDisk() {
  // const client = await pool.connect();
  const sensorIds = await pool.query("select id from sensor").then((res) => {
    return res.rows.map((row) => row.id as string);
  });
  async function streamSingleSensor(sensorId: string) {
    const client = await pool.connect();
    const queryStr = `select * from observation_purpleair_daily_agg where sensor_id='${sensorId}'`;
    const query = new QueryStream(queryStr);
    return new Promise<void>((res, rej) => {
      const stream = client.query(query);
      //release the client when the stream is finished
      stream.on("end", () => {
        client.release();
        res();
      });
      stream.on("err", rej);
      debugger; // eslint-disable-line
      const jsonPipe = JSONStream.stringify();
      stream.pipe(jsonPipe).pipe(process.stdout);
    });
  }
  for (const sensorId of sensorIds) {
    await streamSingleSensor(sensorId);
  }
}

FN_TO_RUN();
