"use client";

import { useEffect, useState } from "react";
import { signup } from "../../services/api";
import { useRouter } from "next/navigation";
import { getToken } from "../../services/auth";

export default function SignupPage() {
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

  const handleSubmit = () => {
    signup(form);
    alert("Signup success! Now login.");
  };

  return (
    <div>
      <h2>Signup</h2>
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}
