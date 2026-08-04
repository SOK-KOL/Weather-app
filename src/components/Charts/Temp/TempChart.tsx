import type { TempData } from "../../../types/chartsData";

import "../Chart.scss";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface tempProps {
  temp: TempData[];
}

function TempChart({ temp }: tempProps) {
  return (
    <div className="chart ">
      <h3 className="chart__title">Температура</h3>
      <p className="chart__info">Утро/День/Вечер</p>
      <ResponsiveContainer width={"100%"} height={200}>
        <LineChart data={temp}>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 16, fontWeight: 700 }}
            axisLine={{ strokeWidth: 3 }}
            stroke="#1060e2"
          />
          <YAxis
            tick={{ fontSize: 16, fontWeight: 700 }}
            axisLine={{ strokeWidth: 3 }}
            stroke="#1060e2"
          />
          <Line
            type="monotone"
            strokeDasharray="10 4"
            dataKey="morning"
            stroke="#3b82f6"
            name="Утро"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="dayTime"
            stroke="#edf63b"
            name="День"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="evening"
            stroke="#f6803b"
            name="Вечер"
            strokeWidth={3}
          />
          <Tooltip
            formatter={(value, name) => [`${name}: ${value}\u00B0`]}
            cursor={{
              stroke: "var(--color-border-2)",
            }}
            contentStyle={{
              backgroundColor: "#000000",
              borderColor: "var(--color-border-2)",
              padding: "6px 10px",
              fontSize: "14px",
            }}
            itemStyle={{
              padding: "0",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TempChart;
