"use client";

import { data } from "./data";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export default function Dashboard() {
  const sentimentData = [
    { name: "Negative", value: data.sentiment.negative },
    { name: "Neutral", value: data.sentiment.neutral },
    { name: "Positive", value: data.sentiment.positive },
  ];

  const COLORS = ["#ef4444", "#facc15", "#22c55e"];

  const shiftData = data.commentShift.map((item) => ({
    name:
      item.type === "Scam / Fake concerns"
        ? "Skepticism"
        : item.type === "Curiosity (how does it work?)"
        ? "Curiosity"
        : "Neutral",
    before: item.before,
    after: item.after,
  }));

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        <h1 className="text-3xl font-bold text-gray-800">
          FoodieClub Reddit Campaign - Week 1
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Early indicators show a shift in user perception and trust formation
        </p>

        {/* Top Cards */}
        <div className="grid grid-cols-4 gap-6">
          <Card title="Impressions" value={data.impressions} />
          <Card title="Upvotes" value={data.upvotes} />
          <Card title="Comments" value={data.comments} />
          <Card title="Engagement Rate" value={data.engagementRate} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-10 items-start">

          {/* Sentiment */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Sentiment Breakdown
            </h2>

            <PieChart width={260} height={260}>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
              >
                {sentimentData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: "#111827",
                }}
              />
            </PieChart>

            {/* Legend */}
            <div className="mt-4 space-y-2 text-sm text-center">
              <p className="text-red-500">● Negative: {data.sentiment.negative}%</p>
              <p className="text-yellow-500">● Neutral: {data.sentiment.neutral}%</p>
              <p className="text-green-500">● Positive: {data.sentiment.positive}%</p>
            </div>
          </div>

          {/* Conversation Shift */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Conversation Shift
            </h2>

            <BarChart width={480} height={260} data={shiftData}>
              <XAxis dataKey="name" stroke="#374151" />
              <YAxis stroke="#374151" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: "#111827",
                }}
              />

              <Legend />

              <Bar
                dataKey="before"
                fill="#64748b"
                name="Before"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="after"
                fill="#16a34a"
                name="After"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </div>

        </div>

        {/* Insights */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Key Insights
          </h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            <li>Conversation is moving from skepticism to evaluation</li>
            <li>Users are engaging more thoughtfully instead of dismissing immediately</li>
            <li>More users are trying to understand how the discount model works</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-1">Week 1 performance</p>
    </div>
  );
}