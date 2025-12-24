import React, { useState } from "react";
import { FiBook } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(credentials);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <FiBook className="text-blue-600 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800">OBE System</h1>
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Sign In
        </h2>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={credentials.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="email"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Demo Credentials:
          </p>

          <p className="text-sm text-gray-700">
            <strong>Admin:</strong> admin@obe.edu / admin123
          </p>

          <p className="text-sm text-gray-700">
            <strong>HOD:</strong> hod@college.edu / hod123
          </p>

          <p className="text-sm text-gray-700">
            <strong>Faculty:</strong> faculty.cse@obe.edu / faculty123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
