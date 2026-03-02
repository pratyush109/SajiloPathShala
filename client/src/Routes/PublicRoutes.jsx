import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "../Utils/storage.js";

const PublicRoutes = () => {
  const token = getToken(); // Use utility
  const userRole = getRole();

  if (token) {
    // Redirect to the correct dashboard based on role
    const dashboardRoutes = {
      admin: "/admindashboard",
      tutor: "/tutordashboard",
      student: "/studentdashboard",
    };
    
    return <Navigate to={dashboardRoutes[userRole] || "/"} replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;

      {/* */}