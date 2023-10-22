import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
  Label,
} from "recharts";

const data = [
  { name: "BTC", value: 400, color: "#2F80ED" },
  { name: "ETH", value: 300, color: "#B1D3FF" },
  { name: "USDT", value: 300, color: "#00C4DF" },
  { name: "Others", value: 200, color: "#2F80ED" },
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer
        className={"bg-white rounded-lg  font-poppins  cursor-pointer"}
        width="100%"
        height="100%"
      >
        <PieChart className="">
          <Pie
            innerRadius={70}
            outerRadius={100}
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label
              value="75%"
              position="center"
              fontSize={24}
              fill="#0D63D3"
              className="text-secondary font-medium"
            />
          </Pie>
          <Legend />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
