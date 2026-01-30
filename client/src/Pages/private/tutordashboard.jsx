import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import SessionRequests from "../../components/SessionsRequests";

import {
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaUser,
  FaUsers,
  FaMoneyBillWave,
  FaTachometerAlt,
} from "react-icons/fa";

const TutorDashboard = () => {
  const { callApi } = useApi();
  const location = useLocation();

  const [sessions, setSessions] = useState([]);
  const [profile, setProfile] = useState({
    fullName: "",
    rating: 0,
    totalReviews: 0,
    hourlyRate: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await callApi("GET", "/tutor/profile");
      setProfile(res.data);
    };

    const fetchSessions = async () => {
      const res = await callApi("GET", "/booking");
      setSessions(res.data.data);
    };

    fetchProfile();
    fetchSessions();
  }, [callApi]);

  const approveSession = async (id) => {
    await callApi("PATCH", `/booking/${id}`, {
      data: { status: "APPROVED" },
    });
    setSessions((prev) =>
      prev.map((s) =>
        String(s.id) === String(id) ? { ...s, status: "APPROVED" } : s
      )
    );
  };

  const rejectSession = async (id) => {
    await callApi("PATCH", `/booking/${id}`, {
      data: { status: "REJECTED" },
    });
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "REJECTED" } : s))
    );
  };

  const totalSessions = sessions.length;
  const pendingSessions = sessions.filter((s) => s.status === "PENDING").length;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex bg-light min-vh-100">
    
      <aside
        className="bg-white border-end p-3"
        style={{ width: "240px" }}
      >
        <h5 className="fw-bold mb-4 text-primary">SajiloPathShala</h5>

        <nav className="d-flex flex-column gap-2">
          <Link
            to="/tutordashboard"
            className={`btn text-start d-flex align-items-center gap-2 ${
              isActive("/tutordashboard")
                ? "btn-light fw-semibold"
                : "btn-white"
            }`}
          >
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link
            to="/tutor/bookings"
            className="btn btn-white text-start d-flex align-items-center gap-2"
          >
            <FaCalendarAlt /> Session Booking
          </Link>

          <Link
            to="/tutor/profile"
            className="btn btn-white text-start d-flex align-items-center gap-2"
          >
            <FaUser /> Profile
          </Link>
        </nav>
      </aside>

     
      <main className="flex-grow-1 p-4">
        
        <div className="mb-4">
          <h2 className="fw-bold">Tutor Dashboard</h2>
          <p className="text-muted">Manage your classes and students</p>
        </div>

       

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm d-flex justify-content-between flex-row align-items-center">
              <div>
                <div className="text-muted small">Total Students</div>
                <h4>{totalSessions}</h4>
              </div>
              <FaUsers className="fs-3 text-primary" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm d-flex justify-content-between flex-row align-items-center">
              <div>
                <div className="text-muted small">This Month Earnings</div>
                <h4>₹45,000</h4>
              </div>
              <FaMoneyBillWave className="fs-3 text-success" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm d-flex justify-content-between flex-row align-items-center">
              <div>
                <div className="text-muted small">Pending Requests</div>
                <h4>{pendingSessions}</h4>
              </div>
              <FaClock className="fs-3 text-warning" />
            </div>
          </div>
        </div>

        
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card p-3 shadow-sm">
              <h5 className="mb-3">Session Requests</h5>
              <SessionRequests
                sessions={sessions}
                onApprove={approveSession}
                onReject={rejectSession}
              />
            </div>
          </div>

          

            
         
        </div>
      </main>
    </div>
  );
};

export default TutorDashboard;