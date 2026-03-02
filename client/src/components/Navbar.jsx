import { Link, useNavigate, useLocation } from "react-router-dom";
import { getToken, getRole, clearAuth } from "../Utils/storage";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ token: null, role: null });

  // Read storage on mount & location change
  useEffect(() => {
    setUser({ token: getToken(), role: getRole() });
  }, [location]);

  const handleLogout = () => {
    clearAuth();
    setUser({ token: null, role: null });
    navigate("/login", { replace: true });
  };

  const handleLogoClick = () => {
    if (!user.token) return navigate("/");

    const dashboardRoutes = {
      student: "/studentdashboard",
      tutor: "/tutordashboard",
      admin: "/admindashboard",
    };

    navigate(dashboardRoutes[user.role] || "/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
        <div
          className="navbar-brand d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
          onClick={handleLogoClick}
        >
          <img src={logo} alt="Logo" width="150" height="38" />
        </div>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            {!user.token ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link nav-hover">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link nav-hover">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="btn btn-brand rounded-pill px-4"
                  >
                    Get Started
                  </Link>
                </li>
              </>
            ) : (
              <>
                {user.role === "student" && (
                  <li className="nav-item">
                    <Link to="/browser" className="nav-link nav-hover">
                      Browse Tutors
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link
                    to={
                      user.role === "admin"
                        ? "/admindashboard"
                        : `/${user.role}dashboard`
                    }
                    className={`nav-link ${
                      user.role === "admin"
                        ? "text-danger fw-bold"
                        : "nav-hover"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-brand rounded-pill px-4"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;