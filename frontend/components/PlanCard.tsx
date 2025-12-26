"use client";
import { PlanItem } from "../types";

export default function PlanCard({ day, activity }: PlanItem) {
  return (
    <div style={{ background: "#f1f1f1", padding: "10px", margin: "8px 0", borderRadius: "8px" }}>
      <strong>{day}:</strong> {activity}
    </div>
  );
}
