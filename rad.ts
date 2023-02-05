import type { Task, Tasks } from "https://deno.land/x/rad/src/mod.ts";

const format: Task = `deno fmt packages`;
const test: Task = `deno test --import-map import_map.json --unstable -A $(fd .test.ts packages)`;

/**
 * Launch dev docker based services
 */
const services: Task = [
  "PCA_DB_PASSWORD=airman",
  "PCA_GQL_ADMIN_SECRET=airman",
  "docker-compose -f docker-compose.pca.dev.yml -f docker-compose.pca.base.yml up --force-recreate",
].join(" ");

/**
 * Bundle packages to ESM for Observable and general JS ESM usage
 */
const bundleModules: Task = {
  fn: async ({ sh, logger, iter, path, fs }) => {
    const pkgDirEntries = await iter.toArray(Deno.readDir("./packages"));
    const pkgNames = pkgDirEntries.map((e) => e.name);
    const pkgsWithMod = await pkgNames
      .map((n) => path.join("./packages", n, "mod.ts"))
      .reduce<Promise<string[]>>(async (names, name) => {
        return (await fs.exists(name))
          ? names.then((ns) => [name, ...ns])
          : names;
      }, Promise.resolve([]));
    for (const modFilename of pkgsWithMod) {
      const dest = `build/${modFilename.replace(/ts$/, "js")}`;
      const cmd = `deno bundle ${modFilename} ${dest}`;
      await Deno.mkdir(path.dirname(dest), { recursive: true });
      logger.info(cmd);
      await sh(cmd);
    }
  },
};

const deploy: Task = {
  dependsOn: [bundleModules],
  fn: async ({ sh, logger }) => {
    logger.info(`rsync'ing ESM`);
    await sh(
      `rsync -r build/ $HTTP_SERVER_ADMIN@$HTTP_SERVER_IP:/www/static/airmap`
    );
  },
};

export const tasks: Tasks = {
  ...{ services, s: services },
  ...{ test, t: test },
  ...{ format, f: format },
  ...{ bundleModules, b: bundleModules },
  ...{ deploy, d: deploy },
};
