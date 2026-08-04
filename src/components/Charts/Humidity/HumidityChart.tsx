import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { HumidityData } from "../../../types/chartsData";

interface HumidityChartProps {
  humidity: HumidityData[];
}

function HumidityChart({ humidity }: HumidityChartProps) {
  console.log(humidity);
  return (
    <div className="chart">
      <h3 className="chart__title">Влажность</h3>
      <p className="chart__info">Относительная влажность</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={humidity}>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 16, fontWeight: 700 }}
            axisLine={{ strokeWidth: 3 }}
            stroke="rgb(35, 203, 229)"
          />
          <YAxis
            tick={{ fontSize: 16, fontWeight: 700 }}
            axisLine={{ strokeWidth: 3 }}
            stroke="rgb(35, 199, 224)"
          />
          <Tooltip
            formatter={(value) => [`Влажность: ${value}%`]}
            cursor={{
              fill: "rgba(32, 106, 117, 0.78)",
            }}
            contentStyle={{
              backgroundColor: "#000000",
              borderColor: "var(--color-border-2)",
              padding: "6px 10px",
              fontSize: "16px",
            }}
            itemStyle={{
              padding: "0",
              color: "rgb(35, 199, 224)",
            }}
          />

          <Bar
            dataKey="humidity"
            radius={[30, 30, 0, 0]}
            fill="rgba(13, 165, 189, 0.72)"
            name={"Влажность"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HumidityChart;
