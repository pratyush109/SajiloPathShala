import { useNavigate } from "react-router-dom";
import "../../css/studentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Welcome back, {fullName}!</h1>
        <p>Manage your learning journey</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Bookings</span>
          <h2>0</h2>
        </div>

        <div className="stat-card">
          <span>Pending Sessions</span>
          <h2>0</h2>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card bookings-card">
          <h3>My Bookings</h3>
          <div className="empty-state">
            <div className="icon">📖</div>
            <p>You don't have any bookings yet</p>
            <button className="primary-btn" onClick={() => navigate("/browser")}>
              Browse Tutors
            </button>
          </div>
        </div>

        <div className="side-grid">
          <div className="card profile-card">
            <h3>My Profile</h3>
            <div className="profile-item">
              <span>Name</span>
              <strong>{fullName}</strong>
            </div>

            <div className="profile-item">
              <span>Email</span>
              <strong>{email}</strong>
            </div>

            <button className="outline-btn" onClick={() => navigate("/studentprofile")}>
              Edit Profile
            </button>
          </div>

          <div className="card quick-card">
            <h3>Quick Actions</h3>
            <button className="quick-btn" onClick={() => navigate("/browser")}>
              Find a Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
