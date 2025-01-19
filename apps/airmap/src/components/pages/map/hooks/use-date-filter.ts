import React from "react";

export const useDateFilter = <T extends { features?: any[] } | undefined>({
  dateField,
  endDate,
  isFilterAfterStart,
  isFilterBeforeEnd,
  startDate,
  unfilteredGeojson,
}: {
  dateField: string;
  endDate: Date;
  isFilterAfterStart: boolean;
  isFilterBeforeEnd: boolean;
  startDate: Date;
  unfilteredGeojson: T;
}): T =>
  React.useMemo(() => {
    if (!isFilterAfterStart && !isFilterBeforeEnd) {
      return unfilteredGeojson;
    }
    if (!dateField) {
      throw new Error(`sensor type missing dateField column name`);
    }
    const features = unfilteredGeojson?.features;
    if (!features) return unfilteredGeojson;
    return {
      ...unfilteredGeojson,
      features: features.filter((feature) => {
        const featureDate = new Date(feature.properties[dateField]);
        if (isFilterAfterStart && featureDate <= startDate) {
          return false;
        }
        if (isFilterBeforeEnd && featureDate >= endDate) {
          return false;
        }
        return true;
      }),
    };
  }, [
    dateField,
    endDate,
    isFilterAfterStart,
    isFilterBeforeEnd,
    startDate,
    unfilteredGeojson,
  ]);
