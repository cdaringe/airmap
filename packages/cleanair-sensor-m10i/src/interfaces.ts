export type Entry = {
  /**
   * Time
   */
  date: Date;
  /**
   * HCHO(mg/m³)
   */
  hcho_mg_m3: number;
  /**
   * PM2.5(ug/m³)
   */
  pm2_µg_m3: number;
  /**
   * TVOC(mg/m³)
   */
  tvoc_mg_m3: number;
  /**
   * AQI
   */
  aqi: number;
};
