import React from "react";
import { useAuth } from "../../contexts/AuthContext";

// Simple inline SVG icons (lightweight, no library)
const IconCourses = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16v4H4z" />
    <path d="M4 12h16v8H4z" />
  </svg>
);

const IconList = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 6h13M8 12h13M8 18h13" />
    <circle cx="4" cy="6" r="1" />
    <circle cx="4" cy="12" r="1" />
    <circle cx="4" cy="18" r="1" />
  </svg>
);

const IconClipboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
  </svg>
);

const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 20V10M10 20V4M16 20v-6M22 20V8" />
  </svg>
);

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { title: "Total Courses", value: "12", icon: <IconCourses />, color: "text-blue-600" },
    { title: "Active CLOs", value: "45", icon: <IconList />, color: "text-green-600" },
    { title: "Program Outcomes", value: "12", icon: <IconClipboard />, color: "text-orange-600" },
    { title: "Pending Reviews", value: "8", icon: <IconChart />, color: "text-red-600" },
  ];

  return (
    <div className="w-full px-4 md:px-8 mt-6 mb-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user?.name}!
      </h1>
      <p className="text-gray-600 mt-1">
        {user?.role} Dashboard – {user?.department?.name}
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-semibold">{stat.value}</p>
              </div>
              <div className={`${stat.color}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Recent Activities */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Recent Activities
          </h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• New course "Advanced Algorithms" added</li>
            <li>• CLO mappings updated for "Database Systems"</li>
            <li>• Attainment report generated for Semester 1</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Actions
          </h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• Manage courses and CLOs</li>
            <li>• Review attainment reports</li>
            <li>• Generate analytics reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
