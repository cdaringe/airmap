const {
  PURPLE_AIR_READ_KEY = "",
  PURPLE_AIR_WRITE_KEY = "",
  SOURCE_CONCURRENCY = "",
  PCA_DB_PASSWORD = "",
  PCA_DB_PORT = "",
  PCA_DB_HOST = "",
  PCA_DB_USER = "",
} = process.env;

export const getConfig = () => {
  const config = {
    PURPLE_AIR_READ_KEY,
    PURPLE_AIR_WRITE_KEY,
    SOURCE_CONCURRENCY,
    PCA_DB_PASSWORD,
    PCA_DB_PORT,
    PCA_DB_HOST,
    PCA_DB_USER,
  };
  Object.entries(config).forEach(([k, v]) => {
    if (!v) {
      throw new Error(`config key: ${k} has empty value: ${v}`);
    }
  });
  return config;
};
