module.exports = function (source) {
  const callback = this.async();
  // dude, really? parse the AST
  const nextSrc = source.replaceAll(/\.ts"/gm, '"');
  if (nextSrc !== source) {
    console.warn(`[cdaringe-deno-compat-lame] .ts write ${this.resourcePath}`);
  }
  callback(null, nextSrc);
};
