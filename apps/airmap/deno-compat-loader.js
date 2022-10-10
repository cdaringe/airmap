module.exports = function (source) {
  const callback = this.async();
  const nextSrc = source.replaceAll(/\.ts"/gm, '"');
  if (nextSrc !== source) {
    console.warn(`.ts write ${this.resourcePath}`);
  }
  callback(null, nextSrc);
};
