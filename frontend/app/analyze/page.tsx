"use client";

import { useApi } from "../../hooks/useApi";
import { analyze } from "../../services/api";
import { useRouter } from "next/navigation";
import ProtectedPage from "../../components/Protected";


export default function AnalyzePage() {
  return (
    <ProtectedPage>
      <AnalyzeContent />
    </ProtectedPage>
  );
}

function AnalyzeContent() {
  const { callApi, loading } = useApi();
  const router = useRouter();

  const handleAnalyze = async () => {
    await callApi(analyze);
    // After analysis completes, navigate to updated progress page
    router.push("/progress");
  };

  return (
    <div>
      <h2>Run Analysis</h2>
      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{ marginTop: "8px" }}
      >
        Analyze & Adapt
      </button>
    </div>
  );
}
