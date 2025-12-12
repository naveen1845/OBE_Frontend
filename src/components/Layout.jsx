import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FiMenu,
  FiBook,
  FiLogOut,
  FiUser,
  FiSettings,
  FiList,
  FiGrid,
  FiMap,
  FiClipboard,
  FiCheckCircle,
  FiFileText,
  FiBarChart2
} from "react-icons/fi";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <FiGrid />, path: "/dashboard", roles: ["HOD", "FACULTY", "ADMIN"] },
  { text: "Course Management", icon: <FiBook />, path: "/courses", roles: ["HOD", "ADMIN"] },
  { text: "CLO Management", icon: <FiList />, path: "/clos", roles: ["HOD", "FACULTY"] },
  { text: "PO/PSO Management", icon: <FiClipboard />, path: "/pos", roles: ["HOD", "ADMIN"] },
  { text: "Mapping Matrix", icon: <FiMap />, path: "/mapping", roles: ["HOD", "FACULTY"] },
  { text: "Faculty Assignment", icon: <FiClipboard />, path: "/faculty-assignment", roles: ["HOD"] },
  { text: "Attainment Review", icon: <FiCheckCircle />, path: "/attainment-review", roles: ["HOD"] },
  { text: "Question Bank", icon: <FiFileText />, path: "/question-bank", roles: ["HOD"] },
  { text: "Reports", icon: <FiBarChart2 />, path: "/reports", roles: ["HOD", "FACULTY", "ADMIN"] },
  { text: "Settings", icon: <FiSettings />, path: "/settings", roles: ["HOD", "FACULTY", "ADMIN"] },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredMenu = menuItems.filter((i) => i.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR (desktop) */}
      <aside
        className="hidden md:flex flex-col w-60 bg-white shadow-lg fixed h-full"
      >
        <div className="p-5 border-b text-xl font-bold">OBE System</div>

        <ul className="mt-2">
          {filteredMenu.map((item) => (
            <li
              key={item.text}
              onClick={() => navigate(item.path)}
              className={`flex items-center px-5 py-3 cursor-pointer hover:bg-blue-100
              ${location.pathname === item.path ? "bg-blue-200 font-semibold" : ""}
            `}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </aside>

      {/* MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-full w-60 bg-white shadow-lg transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 md:hidden`}
      >
        <div className="p-5 border-b text-xl font-bold">OBE System</div>

        <ul className="mt-2">
          {filteredMenu.map((item) => (
            <li
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`flex items-center px-5 py-3 cursor-pointer hover:bg-blue-100
              ${location.pathname === item.path ? "bg-blue-200 font-semibold" : ""}
            `}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </aside>

      {/* TOP NAVBAR */}
      <header
        className="fixed md:ml-60 w-full md:w-[calc(100%-240px)] bg-white shadow-sm z-20"
      >
        <div className="flex items-center justify-between px-4 py-3">

          {/* Mobile Sidebar Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>

          <h1 className="font-semibold text-lg">
            Outcome-Based Education Management System
          </h1>

          {/* User Menu */}
          <div className="relative">
            <button
              className="text-2xl"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <FiUser />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-40 z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 md:ml-60 mt-16 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
