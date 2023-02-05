module.exports = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // update the ts loaders to first re-write "import x from '/a/b/c.ts'" to
    // drop .ts.
    if (nextRuntime === "edge") return config;

    /**
     * @warn
     * Not working?
     * NODE_OPTIONS='--inspect-brk' ./node_modules/.bin/next dev
     */
    const loader = { loader: "./deno-compat-loader.js" };
    // next@12
    const swcLoaderUses = config.module.rules[2].oneOf[2].use;
    // next@13
    // const swcLoaderUses = config.module.rules[3].oneOf[2].use;

    if (!swcLoaderUses) {
      throw new Error(
        `couldnt find the swc ${isServer ? "server" : "browser"} loader, bro`
      );
    }
    config.module.rules.unshift({
      test: /packages\/(cleanair|fetch|invariant).*(j|t)s$/,
      use: [
        ...(Array.isArray(swcLoaderUses) ? swcLoaderUses : [swcLoaderUses]),
        loader,
      ],
    });
    // config.module.rules
    //   .find((r) => r.oneOf)
    //   .oneOf.filter((r) => r.test?.toString().match(/ts/))
    //   .forEach((r) => {
    //     r.use = Array.isArray(r.use) ? [...r.use, loader] : [r.use, loader];
    //   });
    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
