import type { WindData } from "../../../types/chartsData";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WindChartPRops {
  wind: WindData[];
}

function WindChart({ wind }: WindChartPRops) {
  return (
    <div className="chart">
      <h3 className="chart__title">Ветренность</h3>
      <p className="chart__info">Скорость ветра</p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={wind}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 16, fontWeight: 700 }}
            axisLine={{ strokeWidth: 3 }}
            stroke="#10e28e"
          />
          <YAxis
            tick={{ fontSize: 16, fontWeight: 700 }}
            axisLine={{ strokeWidth: 3 }}
            stroke="#10e28e"
          />
          <Tooltip
            formatter={(value) => [`Ветер: ${value} М/c `]}
            cursor={{
              stroke: "var(--color-border-2)",
            }}
            contentStyle={{
              backgroundColor: "#000000",
              borderColor: "var(--color-border-2)",
              padding: "6px 10px",
              fontSize: "16px",
            }}
            itemStyle={{
              padding: "0",
              color: "#10df5f",
            }}
          />
          <Area
            type="monotone"
            dataKey="wind"
            stroke="#82ca9d"
            fill="url(#colorPv)"
            name="Ветер"
            dot={{ fill: "#0bf50b", r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WindChart;
