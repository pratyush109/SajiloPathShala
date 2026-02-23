import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";

import { FaBook, FaClipboardList, FaClock, FaUser } from "react-icons/fa";
import StudentSidebar from "../../components/StudentSidebar";
import "../../style/studentDashboard.css";


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
    console.log("Bookings API Response:", res);

    const bookingsData =
      res.data.bookings || res.data.data || res.data || [];

    console.log("Parsed bookings:", bookingsData);

    setBookings(Array.isArray(bookingsData) ? bookingsData : []);
  } catch (err) {
    console.error("Bookings fetch error:", err);
    setBookings([]);
  }
};


    fetchProfile();
    fetchBookings();
  }, []);

  const totalBookings = bookings?.length || 0;
  const pendingSessions = bookings?.filter((b) => b.status === "PENDING").length || 0;

  return (
    <div className="d-flex dashboard-bg">
  <StudentSidebar />

  <div className="flex-grow-1 p-4">
    <div className="mb-4">
      <h2 className="fw-bold">Welcome back, {profile.fullName}</h2>
      <p className="text-muted">Here’s what’s happening with your learning</p>
    </div>

    {/* STATS */}
    <div className="row g-4 mb-4">
      <div className="col-md-6">
        <div className="stat-card d-flex justify-content-between align-items-center">
          <div>
            <div className="text-muted">Total Bookings</div>
            <h2 className="fw-bold">{totalBookings}</h2>
          </div>
          <FaClipboardList size={28} color="#6c5ce7" />
        </div>
      </div>

      <div className="col-md-6">
        <div className="stat-card d-flex justify-content-between align-items-center">
          <div>
            <div className="text-muted">Pending Sessions</div>
            <h2 className="fw-bold">{pendingSessions}</h2>
          </div>
          <FaClock size={28} color="#6c5ce7" />
        </div>
      </div>
    </div>

    <div className="row g-4">
      {/* BOOKINGS */}
      <div className="col-lg-8">
        <div className="soft-card p-4">
          <div className="section-title mb-3">My Bookings</div>

          {bookings.length === 0 ? (
            <div className="text-center py-5">
              <FaBook size={40} color="#6c5ce7" />
              <p className="mt-3 text-muted">You don’t have any bookings yet</p>
              <button
                className="btn btn-primary rounded-pill px-4"
                onClick={() => navigate("/browser")}
              >
                Browse Tutors
              </button>
            </div>
          ) : (
            <div className="scroll-list">
              {bookings.map((b) => {
                let statusColor = "secondary";
                if (b.status === "APPROVED") statusColor = "success";
                else if (b.status === "REJECTED") statusColor = "danger";
                else if (b.status === "PENDING") statusColor = "warning";

                return (
                  <div
                    key={b.id}
                    className="booking-item p-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-semibold">
                        {b.tutorName || b.tutor?.fullName || "Unknown"}
                      </div>
                      <small className="text-muted">{b.subject}</small>
                    </div>
                    <div className="text-end small">
                      {b.date} • {b.time} <br />
                      <span className={`badge bg-${statusColor}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
{/* PROFILE */}
<div className="col-lg-4">
  <div className="soft-card profile-card p-4">
    <div className="section-title mb-3">My Profile</div>

    <div className="mb-3">
      <small className="text-muted">Name</small>
      <div className="fw-semibold">{profile.fullName}</div>
    </div>

    <div className="mb-4">
      <small className="text-muted">Email</small>
      <div className="fw-semibold">{profile.email}</div>
    </div>

    <button
      className="btn btn-brand w-100 rounded-pill"
      onClick={() => navigate("/studentprofile")}
    >
      <FaUser className="me-2 text-purple" />
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
