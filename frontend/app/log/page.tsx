"use client";

import { useState } from "react";
import { Log } from "../../types";
import { saveLog } from "../../services/api";
import { useApi } from "../../hooks/useApi";
import { useRouter } from "next/navigation";

export default function LogForm() {
  const { callApi, loading } = useApi();
  const router = useRouter();
  const [log, setLog] = useState<Log>({
    date: new Date().toISOString().split('T')[0],
    workout_done: false,
    duration: 0,
    weight: 0,
    mood: 3,
    notes: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setLog({
      ...log,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await callApi(() => saveLog(log));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      // Reset form
      setLog({
        date: new Date().toISOString().split('T')[0],
        workout_done: false,
        duration: 0,
        weight: 0,
        mood: 3,
        notes: "",
      });
    }, 2000);
  };

  const moodEmojis = ["😢", "😕", "😐", "🙂", "😄"];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 page-transition">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-4">
          <span className="text-4xl">📝</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Daily Log</h2>
        <p className="text-gray-600">Track your progress and stay motivated</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg flex items-center card-transition">
          <span className="text-2xl mr-3">✅</span>
          <span>Log saved successfully!</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              name="date"
              type="date"
              value={log.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-100">
            <label className="flex items-center cursor-pointer">
              <input
                name="workout_done"
                type="checkbox"
                checked={log.workout_done}
                onChange={handleChange}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="ml-3 text-lg font-medium text-gray-900">
                💪 Workout Completed Today
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                name="duration"
                type="number"
                value={log.duration || ""}
                onChange={handleChange}
                required
                placeholder="30"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Weight (kg)
              </label>
              <input
                name="weight"
                type="number"
                step="0.1"
                value={log.weight || ""}
                onChange={handleChange}
                required
                placeholder="70.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mood (1-5)
            </label>
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="mood"
                    value={value}
                    checked={log.mood === value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`text-4xl transition-all transform hover:scale-110 ${
                      log.mood === value ? "scale-125" : "opacity-50"
                    }`}
                  >
                    {moodEmojis[value - 1]}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={log.notes}
              onChange={handleChange}
              rows={4}
              placeholder="How did you feel today? Any observations?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "Saving..." : "Save Log Entry"}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => router.push("/analyze")}
          className="text-purple-600 hover:text-purple-700 font-semibold"
        >
          Ready to analyze your progress? →
        </button>
      </div>
    </div>
  );
}