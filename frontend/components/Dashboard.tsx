"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Log } from "../types";

export default function Dashboard({ logs }: { logs: Log[] }) {
  return (
    <div style={{ background: "#fafafa", padding: "10px", borderRadius: "8px" }}>
      <h3>Weight Trend</h3>
      <LineChart width={600} height={300} data={logs}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#0070f3" />
      </LineChart>
    </div>
  );
}
