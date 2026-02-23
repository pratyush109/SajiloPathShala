import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useAPI";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "../../style/adminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

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

      // map bookings to include studentName & tutorName directly
      const formattedBookings =
        bookingsRes?.data?.data.map((b) => ({
          ...b,
          studentName: b.student?.fullName || "-",
          tutorName: b.tutor?.fullName || "-",
        })) || [];

      setUsers(usersRes?.data?.data || []);
      setBookings(formattedBookings);
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
      alert(`Failed to update user: ${err.message}`);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await callApi("DELETE", `/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err.message);
      alert(`Failed to delete user: ${err.message}`);
    }
  };

  const totalUsers = users.length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "PENDING").length;

  const roleData = [
    { name: "Students", value: users.filter((u) => u.role === "student").length },
    { name: "Tutors", value: users.filter((u) => u.role.includes("tutor")).length },
  ];

  const statusData = [
    { name: "Pending", value: bookings.filter((b) => b.status === "PENDING").length },
    { name: "Approved", value: bookings.filter((b) => b.status === "APPROVED").length },
    { name: "Rejected", value: bookings.filter((b) => b.status === "REJECTED").length },
  ];

  const bookingsByDate = Object.values(
    bookings.reduce((acc, b) => {
      acc[b.date] = acc[b.date] || { date: b.date, count: 0 };
      acc[b.date].count++;
      return acc;
    }, {})
  );

  return (
    <div className="d-flex min-vh-100 admin-layout">
      <aside className="admin-sidebar p-3">
        <h5 className="admin-logo mb-4">Admin Panel</h5>

        <button
          className={`btn sidebar-btn w-100 text-start ${activeTab === "dashboard" && "active"}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </button>

        <button
          className={`btn sidebar-btn w-100 text-start ${activeTab === "users" && "active"}`}
          onClick={() => setActiveTab("users")}
        >
          <FaUsers className="me-2" /> Users
        </button>

        <button
          className={`btn sidebar-btn w-100 text-start ${activeTab === "bookings" && "active"}`}
          onClick={() => setActiveTab("bookings")}
        >
          <FaClipboardList className="me-2" /> Bookings
        </button>
      </aside>

      <main className="flex-grow-1 p-4">
        {loading && <p>Loading...</p>}

        {/* DASHBOARD STATS */}
        {activeTab === "dashboard" && (
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="stat-card">
                <div className="stat-label">Total Users</div>
                <div className="stat-number">{totalUsers}</div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card">
                <div className="stat-label">Total Bookings</div>
                <div className="stat-number">{totalBookings}</div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card">
                <div className="stat-label">Pending Bookings</div>
                <div className="stat-number">{pendingBookings}</div>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD CHARTS */}
        {activeTab === "dashboard" && (
          <div className="row g-4 mt-2">
            <div className="col-lg-8">
              <div className="chart-card p-4">
                <h6 className="mb-3">Bookings Trend</h6>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bookingsByDate}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8e2de2" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="chart-card p-4">
                <h6 className="mb-3">User Roles</h6>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={roleData} dataKey="value" outerRadius={90} label>
                      <Cell fill="#6a11cb" />
                      <Cell fill="#c77dff" />
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="chart-card p-4">
                <h6 className="mb-3">Booking Status</h6>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" outerRadius={90} label>
                      <Cell fill="#facc15" />
                      <Cell fill="#22c55e" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* USERS TABLE */}
        {activeTab === "users" && (
          <div className="admin-table p-3 mb-4">
            <h5 className="mb-3">Users</h5>
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
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge-soft ${
                          u.role === "student"
                            ? "badge-warning-soft"
                            : u.role.includes("tutor")
                            ? "badge-success-soft"
                            : "badge-danger-soft"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="d-flex gap-2">
                      {u.role === "tutor" && u.approved === false && (
                        <>
                          <button
                            className="btn btn-sm btn-brand"
                            onClick={() => handleUserUpdate(u.id, "tutor-approved")}
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleUserUpdate(u.id, "student")}
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteUser(u.id)}
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

        {/* BOOKINGS TABLE */}
        {activeTab === "bookings" && (
          <div className="admin-table p-3">
            <h5 className="mb-3">Bookings</h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Tutor</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.studentName}</td>
                    <td>{b.tutorName}</td>
                    <td>{b.subject}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>
                      <span
                        className={`badge-soft ${
                          b.status === "PENDING"
                            ? "badge-warning-soft"
                            : b.status === "APPROVED"
                            ? "badge-success-soft"
                            : "badge-danger-soft"
                        }`}
                      >
                        {b.status}
                      </span>
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