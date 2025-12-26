import { useEffect, useState } from "react";
import { fetchProgress } from "../services/api";
import { Log, Decision } from "../types";

export const useProgress = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetchProgress();

      // ✔ Correctly access the response data
      const data = res.data;

      setLogs(data.logs);          // now TS knows these exist
      setPlans(data.plans);
      setDecisions(data.decisions);

    } catch (err) {
      console.error("Fetch Progress Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { logs, plans, decisions, loading };
};
