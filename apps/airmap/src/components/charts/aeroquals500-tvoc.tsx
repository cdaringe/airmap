import { format } from "date-fns";
import React, { PropsWithChildren } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Entry } from "../../../../../packages/cleanair-sensor-aeroqual-s500/src/interfaces";

const dateFormatter = (date: Date) => {
  return format(new Date(date), "dd MMM H:m");
};

/**
 * @see https://recharts.org/en-US/examples/SynchronizedLineChart
 */
export const TVOC: React.FC<
  PropsWithChildren<{
    geojson: GeoJSON.FeatureCollection<GeoJSON.Point, Entry>;
  }>
> = ({ geojson }) => {
  return (
    <>
      <h3>TVOC Aeroqual S500</h3>
      <ResponsiveContainer aspect={3} width="100%">
        <LineChart
          data={geojson.features}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={(p: GeoJSON.Feature<GeoJSON.Point, Entry>) =>
              p.properties.date
            }
            tickFormatter={dateFormatter}
            label="Time"
            interval="preserveStartEnd"
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis yAxisId="left">
            <Label
              angle={-90}
              value="ppm"
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Legend
            wrapperStyle={{ marginLeft: 10 }}
            align="right"
            verticalAlign="middle"
            layout="vertical"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey={(p: GeoJSON.Feature<GeoJSON.Point, Entry>) =>
              p.properties.tvoc
            }
            name="tvoc"
            stroke="red"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
