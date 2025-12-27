import { useState, useEffect } from "react";
import { fetchProgress } from "../services/api";

export const useProgress = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [latestDecision, setLatestDecision] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadProgress = async () => {
    try {
      const res = await fetchProgress();
      const data = res.data;

      setLogs(data.logs || []);
      setPlans(data.plans || []);

      // updated field
      setLatestDecision(data.latest_decision || null);
    } catch (err) {
      console.error("Failed to fetch progress:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return { logs, plans, latestDecision, loading };
};
