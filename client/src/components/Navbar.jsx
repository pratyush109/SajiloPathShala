import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-inner">
        {/* LEFT */}
        <Link to="/" className="nav-brand">
          <img src={logo} alt="Logo" />
        </Link>

        <div className="nav-actions">
          <Link to="/browser" className="nav-link">
            Browse Tutors
          </Link>

          <Link to="/signup" className="nav-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
