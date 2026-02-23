import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import SessionRequests from "../../components/SessionsRequests";
import "../../style/tutorDashboard.css";

import { FaUsers, FaMoneyBillWave } from "react-icons/fa";

const TutorDashboard = () => {
  const { callApi } = useApi();
  const location = useLocation();

  const [sessions, setSessions] = useState([]);
  const [profile, setProfile] = useState({
    fullName: "",
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
  }, []);

  const approveSession = async (id) => {
    await callApi("PATCH", `/booking/${id}`, {
      data: { status: "APPROVED" },
    });
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "APPROVED" } : s))
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
  const completedSessions = sessions.filter((s) => s.status === "APPROVED").length;
  const monthlyEarnings = completedSessions * profile.hourlyRate;

  return (
    <div className="min-vh-100 dashboard-bg py-4">
      <div className="container">

        {/* HEADER */}
        <div className="dashboard-header d-flex justify-content-between align-items-center p-4 mb-4">
          <div>
            <h3 className="fw-bold mb-1">Welcome back, {profile.fullName}</h3>
            <p className="mb-0 opacity-75">Manage sessions, earnings & students</p>
          </div>

          <Link
            to="/tutor/profile"
            className="btn btn-dark fw-bold"
            style={{ whiteSpace: "nowrap" }}
          >
            Edit Profile
          </Link>
        </div>

        {/* STATS */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="brand-card stat-card">
              <div>
                <div className="stat-label">Total Sessions</div>
                <div className="stat-value">{totalSessions}</div>
              </div>
              <div className="stat-icon icon-brand"><FaUsers /></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="brand-card stat-card">
              <div>
                <div className="stat-label">Monthly Earnings</div>
                <div className="stat-value text-success">₹{monthlyEarnings}</div>
              </div>
              <div className="stat-icon icon-dark"><FaMoneyBillWave /></div>
            </div>
          </div>
        </div>

        {/* SCHEDULE + REQUESTS */}
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="calendar-box">
              <h5 className="fw-bold mb-3">Upcoming Schedule</h5>
              <ul className="list-group list-group-flush">
                {sessions
                  .filter((s) => s.status === "APPROVED")
                  .slice(0, 5)
                  .map((s) => (
                    <li key={s.id} className="list-group-item border-0 px-0 schedule-item">
                      <div className="fw-semibold">{s.subject}</div>
                      <small className="text-muted">
                        {new Date(s.date).toLocaleDateString()} • {s.time}
                      </small>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="brand-card p-4">
              <h5 className="fw-bold mb-3">Session Requests</h5>
              <SessionRequests
                sessions={sessions}
                onApprove={approveSession}
                onReject={rejectSession}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;