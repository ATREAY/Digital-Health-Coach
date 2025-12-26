"use client";

export default function DecisionCard({ reasoning }: { reasoning: string }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-md p-6 border border-purple-200 card-transition">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-2xl">🤖</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            AI Reasoning
            <span className="ml-2 text-xs font-normal bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
              Insight
            </span>
          </h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{reasoning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}