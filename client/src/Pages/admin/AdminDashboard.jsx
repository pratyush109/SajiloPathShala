import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useAPI";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { callApi } = useApi();

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersRes = await callApi("GET", "/admin/users");
      const bookingsRes = await callApi("GET", "/admin/bookings");

      setUsers(usersRes?.data?.data || []);
      setBookings(bookingsRes?.data?.data || []);
    } catch (err) {
      console.error("Error fetching admin data:", err.message);
      setUsers([]);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserUpdate = async (id, role) => {
    try {
      await callApi("PATCH", `/admin/users/${id}`, { data: { role } });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role } : u))
      );
    } catch (err) {
      console.error("Error updating user:", err.message);
    }
  };

  const handleBookingUpdate = async (id, status) => {
    try {
      await callApi("PATCH", `/admin/bookings/${id}`, { data: { status } });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Error updating booking:", err.message);
    }
  };

  const totalUsers = Array.isArray(users) ? users.length : 0;
  const totalBookings = Array.isArray(bookings) ? bookings.length : 0;
  const pendingBookings =
    Array.isArray(bookings) &&
    bookings.filter((b) => b.status === "PENDING").length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return "badge bg-warning text-dark";
      case "APPROVED":
        return "badge bg-success";
      case "REJECTED":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
    
      <aside className="bg-white border-end p-3" style={{ width: "220px" }}>
        <h5 className="fw-bold mb-4 text-primary">Admin Panel</h5>
        <nav className="d-flex flex-column gap-2">
          <button
            className={`btn text-start ${
              activeTab === "dashboard" ? "btn-light fw-semibold" : "btn-white"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaTachometerAlt className="me-2" /> Dashboard
          </button>
          <button
            className={`btn text-start ${
              activeTab === "users" ? "btn-light fw-semibold" : "btn-white"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers className="me-2" /> Users
          </button>
          <button
            className={`btn text-start ${
              activeTab === "bookings" ? "btn-light fw-semibold" : "btn-white"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <FaClipboardList className="me-2" /> Bookings
          </button>
        </nav>
      </aside>

      <main className="flex-grow-1 p-4">
        {loading && <p>Loading...</p>}

   
        {activeTab === "dashboard" && (
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                Total Users: <strong>{totalUsers}</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                Total Bookings: <strong>{totalBookings}</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                Pending Bookings: <strong>{pendingBookings}</strong>
              </div>
            </div>
          </div>
        )}

    
        {activeTab === "users" && (
          <div className="card p-3 shadow-sm mb-4">
            <h5>Users</h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) &&
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.fullName}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td className="d-flex gap-2">
                        {u.role === "tutor" && u.approved === false && (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                handleUserUpdate(u.id, "tutor-approved")
                              }
                            >
                              <FaCheck /> Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleUserUpdate(u.id, "student")
                              }
                            >
                              <FaTimes /> Reject
                            </button>
                          </>
                        )}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleUserUpdate(u.id, "deleted")}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="card p-3 shadow-sm">
            <h5>Bookings</h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Tutor</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bookings) &&
                  bookings.map((b) => (
                    <tr key={b.id}>
                      <td>{b.studentName}</td>
                      <td>{b.tutorName}</td>
                      <td>{b.subject}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td>
                        <span className={getStatusBadge(b.status)}>
                          {b.status}
                        </span>
                      </td>
                      <td className="d-flex gap-2">
                        {b.status === "PENDING" && (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                handleBookingUpdate(b.id, "APPROVED")
                              }
                            >
                              <FaCheck /> Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleBookingUpdate(b.id, "REJECTED")
                              }
                            >
                              <FaTimes /> Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
