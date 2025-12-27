"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../services/auth";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUserAndProfile = async () => {
      const token = getToken();

      // Not logged in → go to login
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/profile/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // If we get a 200 with profile data
        const profile = res.data;

        if (
          profile &&
          profile.name &&
          profile.current_weight &&
          profile.training_preference
        ) {
          // Profile exists → send to log
          router.push("/log");
        } else {
          // Profile exists but missing required fields → go to profile
          router.push("/profile");
        }
      } catch (err: any) {
        // **Handle 404 specifically**
        if (err.response?.status === 404) {
          // No profile found → go to profile
          router.push("/profile");
        } else if (err.response?.status === 401) {
          // Token invalid/expired → go to login
          router.push("/login");
        } else {
          console.error("Profile check failed:", err);
          router.push("/login");
        }
      }
    };

    checkUserAndProfile();
  }, []);

  return null;
}
