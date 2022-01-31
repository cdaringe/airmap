import { useState, PureComponent, useLayoutEffect } from "react";
import { useAtmosTubeCsv, RowData } from "../src/hooks/useAtmotubeCsv";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const DUMMY_DATES = [
  new Date("2021-08-17 00:00:00"),
  new Date("2021-09-23 00:00:00"),
];

class CustomizedAxisTick extends PureComponent<any> {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}
const getWidth = () => window.document.body.getBoundingClientRect().width;

function ChartPages() {
  const [date1] = useState(DUMMY_DATES[0]);
  const [date2] = useState(DUMMY_DATES[1]);
  const [width, setWidth] = useState(getWidth());
  useLayoutEffect(() => {
    const onResize = () => {
      setWidth(getWidth());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const {
    isLoading,
    error,
    data: atmosTable,
  } = useAtmosTubeCsv(
    "sampleatmos",
    [date1, date2],
    [IS_PRODUCTION ? "/airmap" : "", "/atmotube__bank_st__sample.csv"].join("")
  );
  if (isLoading) {
    return "is loading";
  } else if (error) {
    return String(error);
  } else {
    const data = atmosTable?.rows;
    if (!data) throw new Error("missing data");
    // console.log(data);
    return (
      <div>
        <h1 className="text-xl block text-center">VOC, ppm</h1>
        <br />
        <AreaChart
          width={width}
          height={600}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorVoc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            fillOpacity={1}
            fill="url(#colorVoc)"
            type="monotone"
            dataKey="vocAverage"
            stroke="#8884d8"
          />
          <CartesianGrid
            vertical
            horizontal
            stroke="#ccc"
            strokeDasharray="3 3"
          />
          <Tooltip />
          <XAxis
            label="Date"
            height={200}
            dataKey="prettyDate"
            tick={<CustomizedAxisTick />}
          />
          <YAxis />
        </AreaChart>
      </div>
    );
  }
}

export default ChartPages;
