#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const rootDirname = path.resolve(__dirname, "..");
const packagesDirname = path.join(rootDirname, "packages");
fs.readdirSync(packagesDirname)
  .map((f) => path.join(packagesDirname, f))
  .filter(
    (f) =>
      !f.startsWith(".") &&
      fs.statSync(f).isDirectory() &&
      !fs.existsSync(path.join(f, "package.json"))
  )
  .forEach((f) => {
    const filename = path.join(f, "package.json");
    fs.writeFileSync(
      filename,
      JSON.stringify(
        {
          name: path.basename(f),
          main: "mod.js",
          types: "mod.d.ts",
        },
        null,
        2
      )
    );
  });
