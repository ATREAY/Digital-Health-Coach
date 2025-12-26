"use client";

export default function DecisionCard({ reasoning }: { reasoning: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #ddd", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
      <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>AI Reasoning</h3>
      <p>{reasoning}</p>
    </div>
  );
}
