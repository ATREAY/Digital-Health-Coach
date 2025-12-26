"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../services/auth"; // Adjust this path if your services folder is elsewhere

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user has a token (is logged in)
    const token = getToken();

    if (token) {
      // If logged in, go to profile
      router.push("/profile");
    } else {
      // If NOT logged in, go to signup
      router.push("/signup");
    }
  }, [router]);

  // Optional: Return a simple loading spinner here so the screen isn't just blank
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  );
}