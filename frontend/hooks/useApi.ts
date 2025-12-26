import { useState } from "react";

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const callApi = async (fn: () => Promise<any>) => {
    setLoading(true);
    try {
      await fn();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return { callApi, loading };
};
