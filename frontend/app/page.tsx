"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../services/auth";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();

      if (!token) {
        // Not logged in
        router.push("/login");
        return;
      }

      try {
        // Try to fetch profile
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/profile/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data && res.data.name) {
          // Profile exists
          router.push("/log");
        } else {
          // Profile is empty
          router.push("/profile");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        // Token might be invalid → send to login
        router.push("/login");
      }
    };

    checkUser();
  }, []);

  // Optional: Return a simple loading spinner here so the screen isn't just blank
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  );
}