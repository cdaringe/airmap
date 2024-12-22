import type { Task, Tasks } from "https://deno.land/x/rad/src/mod";

const format: Task = `npm run format`;
const test: Task = `npm run test`;

/**
 * Launch dev docker based services for PurpleAir ETL app.
 * 1. GraphQL hasura
 * 2. timescaledb/postgres
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
      // const cmd = `deno bundle ${modFilename} ${dest}`;
      logger.info(`bundling: ${modFilename}`);
      const cmd = `pnpm exec esbuild --format=esm --bundle ${modFilename} --outfile=${dest}`;
      await Deno.mkdir(path.dirname(dest), { recursive: true });
      logger.info(cmd);
      await sh(cmd);
    }
  },
};

const deploy: Task = {
  dependsOn: [bundleModules],
  fn: async ({ sh, logger }) => {
    const minVersion = 3; // manually up this time to time
    const versionRaw = Deno.env.get("VERSION");
    if (!versionRaw) {
      throw new Error(`VERSION expected!`);
    }
    const version = parseInt(versionRaw, 10);
    if (!Number.isInteger(version)) {
      throw new Error(`invalid version int ${version}`);
    }
    if (version < minVersion) {
      throw new Error(`version must be >= ${minVersion}`);
    }
    logger.info(`rsync'ing ESM`);
    await sh(
      `rsync -r build/ $HTTP_SERVER_ADMIN@$HTTP_SERVER_IP:/www/static/airmap/v${version}`
    );
  },
};

// @wip @todo do we wanna try observable's new static app building?
// const airdash = `pnpm run --filter ./apps/airdash dev`;
// ...{ dash: airdash, airdash, ad: airdash },

export const tasks: Tasks = {
  ...{ bundleModules, b: bundleModules },
  ...{ deploy, d: deploy },
  ...{ format, f: format },
  ...{ services, s: services },
  ...{ test, t: test },
};
