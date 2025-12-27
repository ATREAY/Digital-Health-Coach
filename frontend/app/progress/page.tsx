"use client";
import ProtectedPage from "../../components/Protected";
import { useProgress } from "../../hooks/useProgress";
import Dashboard from "../../components/Dashboard";
import PlanCard from "../../components/PlanCard";
import DecisionCard from "../../components/DecisionCard";

export default function ProgressPage() {
  return (
    <ProtectedPage>
      <ProgressContent />
    </ProtectedPage>
  );
}

function ProgressContent() {
  const { logs, plans, loading, latestDecision } = useProgress();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4 loading-pulse">
            <span className="text-6xl">💪</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading your progress...</h2>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4 page-transition">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-4">
            <span className="text-5xl">📊</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-xl text-gray-600">Keep up the great work! Here's how you're doing.</p>
        </div>

        {/* Dashboard */}
        <div className="mb-8">
          <Dashboard logs={logs} />
        </div>

        {/* Weekly Plan */}
        {plans && plans.length > 0 && plans[0]?.plan && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Weekly Plan</h2>
              <span className="text-3xl">📋</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans[0].plan.map((item: any, idx: number) => (
                <PlanCard key={idx} {...item} />
              ))}
            </div>
          </div>
        )}

        {/* AI Reasoning History */}
        {latestDecision && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">AI Insights</h2>
            <span className="text-3xl">🧠</span>
          </div>
          <DecisionCard reasoning={latestDecision.reasoning} />
        </div>
      )}

        {/* Empty State */}
        {(!logs || logs.length === 0) && (!plans || plans.length === 0) && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <span className="text-6xl mb-4 inline-block">🎯</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Journey</h3>
            <p className="text-gray-600 mb-6">
              Log your workouts and run an analysis to see your personalized plan here!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/log"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                Log Workout
              </a>
              <a
                href="/analyze"
                className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                Run Analysis
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}