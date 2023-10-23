import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "react-responsive";
const LineChart = () => {
    const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
    const data = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];
  return (
    <ResponsiveContainer
      width="100%"
      aspect={isMobile ? 1 : 2.5}
      className={"w-full  "}
    >
      <AreaChart
        data={data}
        margin={{ top: 10, left: isMobile ? 15: 25, right: 10, bottom: 0 }}
        className="mt-10"
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0D63D3" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0D63D3" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          vertical={false}
        />
        <XAxis dataKey="name" axisLine={true} fill="#0D63D3" />
        <YAxis
          axisLine={true}
          padding={{ top: 0, bottom: 0 }}
          minTickGap={0}
          width={35}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#0D63D3"
          activeDot={{ r: 8 }}
          fill="url(#colorPv)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default LineChart;