import React, {
  useState,
  PureComponent,
  useLayoutEffect,
  ChangeEventHandler,
} from "react";
import { useAtmosTubeCsv, RowData } from "../src/hooks/useAtmotubeCsv";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getDMY } from "../src/util/date";

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

type DatePickerProps = Omit<React.HTMLProps<HTMLInputElement>, "value"> & {
  value: Date;
};
const DatePicker = ({ onChange, value }: DatePickerProps) => {
  const [d, m, y] = getDMY(value);
  const dayStr = [y, m, d]
    .map((v, i) => {
      const s = String(v);
      if (i === 0) return s;
      if (s.length === 1) return `0${s}`;
      return s;
    })
    .join("-");
  return (
    <input
      type="date"
      pattern="\d{4}-\d{2}-\d{2}"
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Select date"
      onChange={onChange}
      value={dayStr}
    />
  );
};

function ChartPages() {
  const [date1, setDate1] = useState(DUMMY_DATES[0]);
  const [date2, setDate2] = useState(DUMMY_DATES[1]);
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
    return (
      <div>
        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          name="start-date"
          value={date1}
          onChange={(evt) => {
            const d1 = new Date(evt.currentTarget.value);
            if (d1 > date2) return;
            setDate1(d1);
          }}
        />
        <label htmlFor="end-date">End Date</label>
        <DatePicker
          name="end-date"
          value={date2}
          onChange={(evt) => {
            const d2 = new Date(evt.currentTarget.value);
            if (d2 < date1) return;
            setDate2(d2);
          }}
        />
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
          <YAxis label="VOC, ppm" />
        </AreaChart>
      </div>
    );
  }
}

export default ChartPages;
