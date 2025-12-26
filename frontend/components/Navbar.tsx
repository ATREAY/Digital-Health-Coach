"use client";

import Link from "next/link";
import { getToken, clearToken } from "../services/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const token = getToken();
  const router = useRouter();

  const logout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <nav className="navbar">
      {token ? (
        <>
          <Link href="/profile">Profile</Link>
          <Link href="/log">Log</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/analyze">Analyze</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
