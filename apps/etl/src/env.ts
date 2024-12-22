import { url } from "node:inspector";
export const isProd = !!process.env.NODE_ENV?.match(/prod/i);
export const isDev = !isProd;
export const isDebug = Boolean(url());
