import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken, getRole } from "../Utils/storage.js";

const PrivateRoute = ({ allowedRoles }) => {
  const token = getToken();
  const userRole = getRole();
  const location = useLocation();

  // 1. If not logged in, send to login and save the attempted URL
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If user tries to access a route they don't have permission for
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const defaultDashboard = 
      userRole === "admin" ? "/admindashboard" : 
      userRole === "tutor" ? "/tutordashboard" : "/studentdashboard";

    return <Navigate to={defaultDashboard} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;