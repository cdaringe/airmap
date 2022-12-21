import React, { PropsWithChildren } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

/**
 * @see https://recharts.org/en-US/examples/SynchronizedLineChart
 */
export const MiniWrasStats: React.FC<
  PropsWithChildren<{
    geojson: GeoJSON.FeatureCollection;
  }>
> = ({ geojson }) => {
  return (
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
        <XAxis dataKey="name" label="Time" />
        <YAxis yAxisId="left">
          <Label
            angle={-90}
            value="ug/m3"
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <YAxis yAxisId="right" orientation="right">
          <Label
            angle={90}
            value="Relative Humidity %"
            position="insideRight"
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
          dataKey={(p) => p.properties.pm_2_5}
          name="PM2.5 (MW)"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey={(p) => p.properties.pocketlabsEntry.pm_2_5}
          name="PM2.5 (PL)"
          stroke="#6684d8"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={(p) => p.properties.pocketlabsEntry.humidity}
          name="Humidity (PL)"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
