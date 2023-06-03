import { MappingResourcesMod } from "../../cleanair-sensor-common/mod";

/**
 * @warn fake!
 */
export const mapbox: MappingResourcesMod<unknown>["mapbox"] = {
  getLevels() {
    return {
      fieldName: "",
      colors: [],
      ranges: [],
      circleCases: [],
    };
  },
};
