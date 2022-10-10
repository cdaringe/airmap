import type { Task, Tasks } from "https://deno.land/x/rad/src/mod.ts";

const format: Task = `deno fmt packages`;
const test: Task = `deno test --import-map import_map.json --unstable -A $(fd .test.ts packages)`;

export const tasks: Tasks = {
  ...{ test, t: test },
  ...{ format, f: format },
};
