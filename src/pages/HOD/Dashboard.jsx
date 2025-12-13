import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { hodAPI } from "../../apis/HOD";

// Icons
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
  const { user, loading: authLoading} = useAuth();
  
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCLOs: 0,
    programmeCount: 0,
    programOutcomes: 0,
    pendingReviews: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Stats
  useEffect(() => {

    if(!user || authLoading){
      return;
    }
    const fetchStats = async () => {
      try {
        const res = await hodAPI.getDashboardStats(user?.token);
        setStats({
          totalCourses: res.data.totalCourses,
          activeCLOs: res.data.activeCLOs,
          programmeCount: res.data.programmesCount,
          programOutcomes: res.data.programOutcomes,
          pendingReviews: res.data.pendingReviews,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, authLoading]);

  const cards = [
    { title: "Programmes", value: stats.programmeCount, icon: <IconClipboard />, color: "text-orange-600" },
    { title: "Program Outcomes", value: stats.programOutcomes, icon: <IconClipboard />, color: "text-orange-600" },
    { title: "Total Courses", value: stats.totalCourses, icon: <IconCourses />, color: "text-blue-600" },
    { title: "Active CLOs", value: stats.activeCLOs, icon: <IconList />, color: "text-green-600" },
    { title: "Pending Reviews", value: stats.pendingReviews, icon: <IconChart />, color: "text-red-600" },
  ];

  if (loading) {
    return (
      <div className="w-full text-center mt-20 text-gray-500 text-xl">
        Loading dashboard...
      </div>
    );
  }

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
        {cards.map((stat, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-semibold">{stat.value}</p>
              </div>
              <div className={stat.color}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Extra sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Activities</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• Curriculum structure updated</li>
            <li>• Programme-level CLO mappings refreshed</li>
            <li>• Attainment analytics generated</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• Manage courses and CLOs</li>
            <li>• Review attainment reports</li>
            <li>• View department programmes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
