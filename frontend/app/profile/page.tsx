"use client";

import { useState } from "react";
import { Profile } from "../../types";
import { saveProfile } from "../../services/api";
import { useApi } from "../../hooks/useApi";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const { callApi, loading } = useApi();
  const router = useRouter();
  const [form, setForm] = useState<Profile>({
    name: "",
    age: 0,
    height: 0,
    weight_goal: 0,
    fitness_goal: "mix",
    start_date: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await callApi(() => saveProfile(form));
    setTimeout(() => router.push("/log"), 500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 page-transition">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-4">
          <span className="text-4xl">👤</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h2>
        <p className="text-gray-600">Tell us about yourself to personalize your experience</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                name="age"
                type="number"
                value={form.age || ""}
                onChange={handleChange}
                required
                placeholder="25"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                name="height"
                type="number"
                value={form.height || ""}
                onChange={handleChange}
                required
                placeholder="170"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight Goal (kg)
              </label>
              <input
                name="weight_goal"
                type="number"
                value={form.weight_goal || ""}
                onChange={handleChange}
                required
                placeholder="70"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fitness Goal
              </label>
              <select
                name="fitness_goal"
                value={form.fitness_goal}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="mix">🎯 Mix (Balanced)</option>
                <option value="weight_loss">⚡ Weight Loss</option>
                <option value="strength">💪 Strength Building</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                name="start_date"
                type="date"
                value={form.start_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "Saving..." : "Save Profile & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}