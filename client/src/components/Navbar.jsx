import { Link, useNavigate } from "react-router-dom";
import { getToken, getRole, clearAuth } from "../Utils/storage";
import logo from "../assets/logo.png";
import "../css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const role = getRole();

  const handleLogout = () => {
    clearAuth();
    navigate("/", { replace: true });
  };

  return (
    <nav className="nav-wrapper">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <img src={logo} alt="Logo" />
          <span>SajiloPathShala</span>
        </Link>

        <div className="nav-actions">
          <Link to="/browser" className="nav-link">Browse Tutors</Link>

          {!token && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-btn">Get Started</Link>
            </>
          )}

          {token && role === "student" && (
            <>
              <Link to="/studentdashboard" className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="nav-btn">Logout</button>
            </>
          )}

          {token && role === "tutor" && (
            <>
              <Link to="/tutordashboard" className="nav-link">Tutor Dashboard</Link>
              <button onClick={handleLogout} className="nav-btn">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
