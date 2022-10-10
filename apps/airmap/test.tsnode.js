require("ts-node").register({ project: "./tsconfig.test.json" });
require("browser-env")();
require("raf/polyfill");
