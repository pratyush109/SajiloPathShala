// Pages/public/HomeRedirect.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../../Utils/storage";
import Home from "./Home";

const HomeRedirect = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const token = getToken();
    const role = getRole();

    if (!token) {
      setRedirectTo("home");
      return;
    }

    if (role === "tutor") setRedirectTo("/tutordashboard");
    else if (role === "student") setRedirectTo("/studentdashboard");
    else if (role === "admin") setRedirectTo("/admindashboard");
    else setRedirectTo("home");
  }, []);

  if (redirectTo === null) return null; // wait until useEffect runs

  return redirectTo === "home" ? <Home /> : <Navigate to={redirectTo} replace />;
};

export default HomeRedirect;
      {/* */}