import { Link, useNavigate } from "react-router-dom";
import { getToken, getRole, clearAuth } from "../Utils/storage";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const role = getRole();

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  const handleLogoClick = () => {
    if (!token) {
      navigate("/"); 
      return;
    }

    if (role === "student") navigate("/studentdashboard");
    else if (role === "tutor") navigate("/tutordashboard");
    else if (role === "admin") navigate("/admindashboard");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">

     
        <div
          className="navbar-brand d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
          onClick={handleLogoClick}
        >
          <img src={logo} alt="Logo" width="38" height="38" />
          <span className="fw-bold brand-text">SajiloPathShala</span>
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
          <div className="navbar-nav ms-auto align-items-center gap-3">

          
            {!token && (
              <>
                <Link to="/" className="nav-link nav-hover">
                  Home
                </Link>
               
                <Link to="/login" className="nav-link nav-hover">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-brand rounded-pill px-4">
                  Get Started
                </Link>
              </>
            )}

            {token && role === "student" && (
              <>
                <Link to="/browser" className="nav-link nav-hover">
                  Browse Tutors
                </Link>
                <Link to="/studentdashboard" className="nav-link nav-hover">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-brand rounded-pill px-4"
                >
                  Logout
                </button>
              </>
            )}

            {token && role === "tutor" && (
              <>
                
                <Link to="/tutordashboard" className="nav-link nav-hover">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-brand rounded-pill px-4"
                >
                  Logout
                </button>
              </>
            )}

      
            {token && role === "admin" && (
              <>
                <Link
                  to="/admindashboard"
                  className="nav-link fw-semibold text-danger"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger rounded-pill px-4"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
