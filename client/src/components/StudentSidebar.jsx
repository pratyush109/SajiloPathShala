import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaClipboardList } from "react-icons/fa";
import "../style/StudentDashboard.css"; 
const StudentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-sidebar">
    

      <div className="sidebar-user">
        Student Panel
      </div>

      
      <div className="d-flex flex-column gap-2">
        <button
          className={`sidebar-link ${isActive("/studentdashboard") ? "active" : ""}`}
          onClick={() => navigate("/studentdashboard")}
        >
          <FaHome />
          Dashboard
        </button>

        <button
          className={`sidebar-link ${isActive("/studentprofile") ? "active" : ""}`}
          onClick={() => navigate("/studentprofile")}
        >
          <FaUser />
          Profile
        </button>
        <button
          className={`sidebar-link ${isActive("/bookings") ? "active" : ""}`}
          onClick={() => navigate("/bookings")}
        >
      
         
        </button>
      </div>


    </div>
  );
};

export default StudentSidebar;
