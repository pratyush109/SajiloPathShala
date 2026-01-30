import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaClipboardList } from "react-icons/fa";

const StudentSidebar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column p-3 border-end"
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <h4 className="fw-bold mb-4">TutorHub</h4>

      <ul className="nav nav-pills flex-column gap-2">
        <li className="nav-item">
          <button
            className="nav-link active text-start"
            onClick={() => navigate("/student/dashboard")}
          >
            <FaHome className="me-2" />
            Dashboard
          </button>
        </li>

        <li className="nav-item">
          <button
            className="nav-link text-start"
            onClick={() => navigate("/studentprofile")}
          >
            <FaUser className="me-2" />
            Profile
          </button>
        </li>

        <li className="nav-item">
          <button
            className="nav-link text-start"
            onClick={() => navigate("/bookings")}
          >
            <FaClipboardList className="me-2" />
            Session Booking
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;