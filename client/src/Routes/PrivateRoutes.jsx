import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken, getRole } from "../Utils/storage.js";

const PrivateRoute = ({ allowedRoles }) => {
  const token = getToken();
  const userRole = getRole();
  const location = useLocation();

  // Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role not allowed → redirect to their dashboard
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const defaultDashboard =
      userRole === "admin"
        ? "/admindashboard"
        : userRole === "tutor"
        ? "/tutordashboard"
        : "/studentdashboard";

    return <Navigate to={defaultDashboard} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;