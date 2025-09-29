import { format } from "date-fns";
import {
  AEROQUAL_S500_ID,
  MapLevels,
  MappingMod,
  MINIWRAS_ID,
  sensorNameById,
  TIGER_XT_ID,
} from "../../../../../../packages/cleanair-sensor-common/mod";
import Button from "../../atoms/button";
import { isValidDate } from "./util";

type Setter<V> = (v: V) => void;

export type Props = {
  sensorType: number;
  startDate: Date;
  setEndDate: Setter<Date>;
  setStartDate: Setter<Date>;
  setMappingField: Setter<string>;
  setIsMinMaxDynamicRange: Setter<boolean>;
  setIsFilteringAfterStart: Setter<boolean>;
  setIsFilterBeforeEnd: Setter<boolean>;
  setIsBottomSheetOpen: Setter<boolean>;
  setCountForceRerender: (fn: (i: number) => number) => void;
  levels: MapLevels;
  isMinMaxDynamicRange: boolean;
  isFilterBeforeEnd: boolean;
  isFilterAfterStart: boolean;
  isBottomSheetOpen: boolean;
  getLevelsByField: MappingMod<any, any>["getLevelsByField"];
  endDate: Date;
};
export const Overlay: React.FC<Props> = ({
  sensorType,
  setIsBottomSheetOpen,
  setEndDate,
  startDate,
  setStartDate,
  setMappingField,
  setIsMinMaxDynamicRange,
  setIsFilteringAfterStart,
  setIsFilterBeforeEnd,
  levels,
  isMinMaxDynamicRange,
  isBottomSheetOpen,
  isFilterBeforeEnd,
  isFilterAfterStart,
  getLevelsByField,
  endDate,
  setCountForceRerender,
}) => {
  const sensorName = sensorNameById[sensorType] ?? "Unknown Sensor";
  return (
    <div id="pollution-map-overlay" className="map-overlay">
      <div className="map-overlay-control map-legend">Sensor: {sensorName}</div>
      <div className="map-overlay-control map-legend">
        <div style={{ fontWeight: "bold" }}>{levels?.fieldName}</div>
        {levels?.ranges.map((range, i) => {
          const [lower, upper] = range;
          return (
            <div key={`${isMinMaxDynamicRange}-${i}`}>
              <span
                style={{ backgroundColor: levels.colors[i] }}
                className="map-legend-key"
              />
              <span>
                [{lower < 1 ? lower.toFixed(3) : lower.toFixed(1)},{" "}
                {upper < 1 ? upper.toFixed(3) : upper.toFixed(1)})
              </span>
            </div>
          );
        })}
      </div>
      {getLevelsByField ? (
        <div className="map-overlay-control map-pollution-range-mode">
          <h4 className="font-bold">Field to map</h4>
          {Object.keys(getLevelsByField).map((fieldName, i) => (
            <div key={fieldName}>
              <input
                type="radio"
                key={fieldName}
                name="field-to-map"
                onClick={() => setMappingField(fieldName)}
                defaultChecked={i === 0}
              />
              <label htmlFor="field-to-map">{` ${fieldName}`}</label>
              <br />
            </div>
          ))}
        </div>
      ) : null}
      <div className="map-overlay-control map-pollution-range-mode">
        <input
          type="checkbox"
          checked={isMinMaxDynamicRange}
          onChange={() => setIsMinMaxDynamicRange(!isMinMaxDynamicRange)}
        />{" "}
        Dynamic Levels
      </div>
      <div className="map-overlay-control map-pollution-range-mode">
        <input
          type="checkbox"
          checked={isFilterAfterStart}
          onChange={() => setIsFilteringAfterStart(!isFilterAfterStart)}
        />{" "}
        After Date
        <br />
        <input
          type="datetime-local"
          disabled={!isFilterAfterStart}
          value={format(startDate, "yyyy-MM-dd'T'HH:mm")}
          onChange={(evt) => {
            const next = new Date(evt.currentTarget.value);
            if (isValidDate(next)) setStartDate(next);
          }}
        />
      </div>
      <div className="map-overlay-control map-pollution-range-mode">
        <input
          type="checkbox"
          checked={isFilterBeforeEnd}
          onChange={() => setIsFilterBeforeEnd(!isFilterBeforeEnd)}
        />{" "}
        End Date
        <br />
        <input
          type="datetime-local"
          disabled={!isFilterBeforeEnd}
          value={format(endDate, "yyyy-MM-dd'T'HH:mm")}
          onChange={(evt) => {
            const next = new Date(evt.currentTarget.value);
            if (isValidDate(next)) setEndDate(next);
          }}
        />
      </div>
      {sensorType === MINIWRAS_ID ||
      sensorType === AEROQUAL_S500_ID ||
      sensorType === TIGER_XT_ID ? (
        <div className="map-overlay-control map-pollution-range-mode">
          <Button
            onClick={() => {
              setIsBottomSheetOpen(!isBottomSheetOpen);
            }}
          >
            Show charts
          </Button>
        </div>
      ) : null}

      {sensorType === AEROQUAL_S500_ID ? (
        <div className="map-overlay-control map-pollution-range-mode">
          <label htmlFor="isoscalar">Isobutylene scalar</label>:
          <input
            id="isoscalar"
            className="ml-1"
            type="input"
            defaultValue={1.0}
            onChange={(evt) => {
              const num = Number(evt.currentTarget.value);
              if (Number.isFinite(num)) {
                window.__AEROQUAL_S500_SCALAR__ = num;
                setCountForceRerender((i) => i + 1);
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
