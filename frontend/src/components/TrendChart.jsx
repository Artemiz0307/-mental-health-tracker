import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { useEffect, useState } from "react";

export default function TrendChart({ dataKey, color, label, data }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="h-[260px] sm:h-64">
      <h4 className="mb-2 text-sm text-gray-400">{label}</h4>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            interval={isMobile ? 1 : 0}
          />
          <YAxis
            domain={[0, 10]}
            tick={{ fontSize: 10 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "12px"
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={isMobile ? 2 : 3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
