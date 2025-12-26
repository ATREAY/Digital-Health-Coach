"use client";
import ProtectedPage from "../../components/Protected";
import { useProgress } from "../../hooks/useProgress";
import Dashboard from "../../components/Dashboard";
import PlanCard from "../../components/PlanCard";
import DecisionCard from "../../components/DecisionCard";

export default function ProgressPage() {
  return (
    <ProtectedPage>
      <ProgressContent />
    </ProtectedPage>
  );
}

function ProgressContent() {
  const { logs, plans, decisions, loading } = useProgress();
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Dashboard logs={logs} />
      <h3>Weekly Plan</h3>
      {plans.map((p: any, i: number) =>
        p.plan?.map((item: any, idx: number) => (
          <PlanCard key={idx} {...item} />
        ))
      )}

      <h3>AI Reasoning History</h3>
      {decisions.map((d, i) => (
        <DecisionCard key={i} reasoning={d.reasoning} />
      ))}
    </div>
  );
}
