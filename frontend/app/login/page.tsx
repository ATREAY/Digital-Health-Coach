"use client";

import { useEffect, useState } from "react";
import { login } from "../../services/api";
import { setToken, getToken } from "../../services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      router.push("/profile");
    }
  }, []);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await login(form);
    setToken(res.data.access_token);
    router.push("/profile");
  };

  return (
    <div>
      <h2>Login</h2>
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
