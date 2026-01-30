import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";

import { FaBook, FaClipboardList, FaClock, FaUser } from "react-icons/fa";
import StudentSidebar from "../../components/StudentSidebar";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { callApi } = useApi();

  const [profile, setProfile] = useState({ fullName: "", email: "", bio: "" });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await callApi("GET", "/student/profile");
        setProfile(res.data || {});
        localStorage.setItem("fullName", res.data?.fullName || "");
        localStorage.setItem("email", res.data?.email || "");
      } catch (err) {
        console.error("Profile fetch error:", err.message);
        setProfile({ fullName: "Unknown", email: "" }); 
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await callApi("GET", "/student/bookings");
        setBookings(res.data || []); // fallback to empty array
      } catch (err) {
        console.error("Bookings fetch error:", err.message);
        setBookings([]); // fallback
      }
    };

    fetchProfile();
    fetchBookings();
  }, []);

  const totalBookings = bookings?.length || 0;
  const pendingSessions = bookings?.filter((b) => b.status === "PENDING").length || 0;

  return (
    <div className="d-flex">
      <StudentSidebar />

      <div className="flex-grow-1 p-4 bg-light">
        <div className="mb-4">
          <h2 className="fw-bold">Welcome back, {profile.fullName || "Student"}!</h2>
          <p className="text-muted">Manage your learning journey</p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="card shadow-sm p-3 d-flex justify-content-between">
              <div>
                <span className="text-muted">Total Bookings</span>
                <h2 className="mt-2">{totalBookings}</h2>
              </div>
              <FaClipboardList className="fs-3 text-primary" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm p-3 d-flex justify-content-between">
              <div>
                <span className="text-muted">Pending Sessions</span>
                <h2 className="mt-2">{pendingSessions}</h2>
              </div>
              <FaClock className="fs-3 text-warning" />
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card p-3 shadow-sm">
              <h4 className="mb-3">My Bookings</h4>

              {bookings?.length === 0 ? (
                <div className="text-center py-4">
                  <FaBook className="fs-1 text-secondary" />
                  <p className="mt-2">You don't have any bookings yet</p>
                  <button
                    className="btn btn-success rounded-pill"
                    onClick={() => navigate("/browser")}
                  >
                    Browse Tutors
                  </button>
                </div>
              ) : (
                <div
  className="list-group"
  style={{
    maxHeight: "400px",
    overflowY: "auto",
    paddingRight: "5px",
  }}
>
  {bookings.map((b) => {
    let statusColor = "text-secondary"; 
    if (b.status === "APPROVED") statusColor = "text-success";
    else if (b.status === "REJECTED") statusColor = "text-danger";
    else if (b.status === "PENDING") statusColor = "text-warning";

    return (
      <div
        key={b.id}
        className="list-group-item d-flex justify-content-between"
      >
        <div>
          <h6 className="mb-1">{b.tutorName || b.tutor?.fullName || "Unknown"}</h6>
          <small>{b.subject || "N/A"}</small>
        </div>
        <small>
          {b.date || "--"} • {b.time || "--"} •{" "}
          <span className={`fw-bold ${statusColor}`}>{b.status || "N/A"}</span>
        </small>
      </div>
    );
  })}
</div>

              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card p-3 shadow-sm">
              <h5 className="mb-3">My Profile</h5>

              <div className="mb-2">
                <small className="text-muted">Name</small>
                <div className="fw-semibold">{profile.fullName || "Unknown"}</div>
              </div>

              <div className="mb-3">
                <small className="text-muted">Email</small>
                <div className="fw-semibold">{profile.email || "N/A"}</div>
              </div>

              <button
                className="btn btn-outline-secondary w-100 rounded-pill"
                onClick={() => navigate("/studentprofile")}
              >
                <FaUser className="me-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
