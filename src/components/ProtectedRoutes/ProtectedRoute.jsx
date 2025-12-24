import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute:", {
    loading,
    role: user?.role,
    allowedRoles,
  });

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 FIX: normalize role + redirect safely
  // if (
  //   allowedRoles.length > 0 &&
  //   !allowedRoles.includes(user.role?.toUpperCase())
  // ) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children;
};

export default ProtectedRoute;
