module.exports = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
};

console.log(
  [`\n\nnext.js config\n\n`, JSON.stringify(module.exports), "\n\n"].join("\n")
);
