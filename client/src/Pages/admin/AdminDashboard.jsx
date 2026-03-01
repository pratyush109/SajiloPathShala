import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useAPI";
import toast from "react-hot-toast"; // Ensure react-hot-toast is installed
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaTrash,
  FaUserShield
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
  CartesianGrid
} from "recharts";

const COLORS = ["#6a11cb", "#c77dff", "#facc15", "#22c55e", "#ef4444"];

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

      const formattedBookings = (bookingsRes?.data?.data || []).map((b) => ({
        ...b,
        studentName: b.student?.fullName || "-",
        tutorName: b.tutor?.fullName || "-",
      }));
      setUsers(usersRes?.data?.data || []);
      setBookings(formattedBookings);
    } catch (err) {
      toast.error("Failed to sync dashboard data.");
      console.error("Error fetching admin data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- DELETE USER WITH TOAST ---
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    // toast.promise handles the Loading, Success, and Error states automatically
    toast.promise(
      callApi("DELETE", `/admin/users/${id}`),
      {
        loading: 'Deleting user...',
        success: () => {
          setUsers((prev) => prev.filter((u) => u.id !== id));
          return 'User removed successfully! 🗑️';
        },
        error: (err) => err.response?.data?.message || 'Failed to delete user.',
      }
    );
  };

  // --- CHART LOGIC ---
  const roleData = [
    { name: "Students", value: users.filter((u) => u.role === "student").length },
    { name: "Tutors", value: users.filter((u) => u.role?.toLowerCase().includes("tutor")).length },
  ].filter(d => d.value > 0);

  const statusData = [
    { name: "Pending", value: bookings.filter((b) => b.status === "PENDING").length },
    { name: "Approved", value: bookings.filter((b) => b.status === "APPROVED").length },
    { name: "Rejected", value: bookings.filter((b) => b.status === "REJECTED").length },
  ].filter(d => d.value > 0);

  const bookingsByDate = Object.values(
    bookings.reduce((acc, b) => {
      const date = b.date || "Unknown";
      acc[date] = acc[date] || { date, count: 0 };
      acc[date].count++;
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="d-flex min-vh-100 admin-layout bg-light">
      {/* SIDEBAR */}
      <aside className="admin-sidebar p-3 shadow-sm">
        <div className="admin-logo-container mb-4 text-center py-3">
          <h4 className="admin-logo fw-bold text-white mb-0">
            <FaUserShield className="me-2" />
            Admin
          </h4>
        </div>
        <nav className="nav flex-column gap-2">
          <button 
            className={`btn sidebar-btn text-start ${activeTab === "dashboard" ? "active" : ""}`} 
            onClick={() => setActiveTab("dashboard")}
          >
            <FaTachometerAlt className="me-2" /> Dashboard
          </button>
          <button 
            className={`btn sidebar-btn text-start ${activeTab === "users" ? "active" : ""}`} 
            onClick={() => setActiveTab("users")}
          >
            <FaUsers className="me-2" /> Users
          </button>
          <button 
            className={`btn sidebar-btn text-start ${activeTab === "bookings" ? "active" : ""}`} 
            onClick={() => setActiveTab("bookings")}
          >
            <FaClipboardList className="me-2" /> Bookings
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 p-4 overflow-auto">
        {loading && (
          <div className="d-flex flex-column align-items-center justify-content-center my-5">
            <div className="spinner-border text-primary mb-2"></div>
            <span className="text-muted">Loading System Data...</span>
          </div>
        )}

        {activeTab === "dashboard" && !loading && (
          <>
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="stat-card p-4 shadow-sm border-0 rounded-4 bg-white">
                  <p className="text-muted mb-1 small uppercase fw-bold">Total Users</p>
                  <h2 className="stat-number mb-0">{users.length}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card p-4 shadow-sm border-0 rounded-4 bg-white">
                  <p className="text-muted mb-1 small uppercase fw-bold">Total Bookings</p>
                  <h2 className="stat-number mb-0">{bookings.length}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card p-4 shadow-sm border-0 rounded-4 bg-white border-start border-warning border-4">
                  <p className="text-muted mb-1 small uppercase fw-bold">Pending Bookings</p>
                  <h2 className="stat-number text-warning mb-0">{statusData.find(s => s.name === "Pending")?.value || 0}</h2>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <div className="chart-card p-4 shadow-sm border-0 rounded-4 bg-white">
                  <h6 className="fw-bold mb-4">Bookings Volume</h6>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookingsByDate}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip 
                           contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}} 
                        />
                        <Bar dataKey="count" fill="#6a11cb" radius={[4, 4, 0, 0]} barSize={35} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="chart-card p-4 shadow-sm border-0 rounded-4 bg-white h-100">
                  <h6 className="fw-bold mb-4">User Roles</h6>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={roleData} 
                          dataKey="value" 
                          innerRadius={65} 
                          outerRadius={85} 
                          paddingAngle={8}
                        >
                          {roleData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" align="center" iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="bg-white p-4 shadow-sm rounded-4 border-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
               <h5 className="fw-bold mb-0">User Management</h5>
               <button onClick={fetchData} className="btn btn-sm btn-light text-primary">Refresh List</button>
            </div>
            <div className="table-responsive">
              <table className="table align-middle table-hover custom-table">
                <thead className="table-light">
                  <tr>
                    <th className="border-0 px-4 py-3">Full Name</th>
                    <th className="border-0 py-3">Email Address</th>
                    <th className="border-0 py-3">Role</th>
                    <th className="border-0 py-3 text-end px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="px-4 fw-semibold">{u.fullName}</td>
                      <td className="text-muted">{u.email}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2
                          ${u.role === 'tutor' ? 'bg-info bg-opacity-10 text-info' : 'bg-primary bg-opacity-10 text-primary'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="text-end px-4">
                        <button 
                          className="btn btn-icon btn-outline-danger border-0" 
                          onClick={() => handleDeleteUser(u.id)}
                          title="Delete User"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div className="bg-white p-4 shadow-sm rounded-4 border-0">
            <h5 className="fw-bold mb-4">System Bookings</h5>
            <div className="table-responsive">
              <table className="table align-middle table-hover">
                <thead className="table-light">
                  <tr>
                    <th className="border-0 px-4">Student</th>
                    <th className="border-0">Tutor</th>
                    <th className="border-0">Subject</th>
                    <th className="border-0">Date</th>
                    <th className="border-0">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="px-4 fw-semibold">{b.studentName}</td>
                      <td>{b.tutorName}</td>
                      <td><span className="text-dark small">{b.subject}</span></td>
                      <td className="text-muted small">{b.date}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 
                          ${b.status === 'APPROVED' ? 'bg-success bg-opacity-10 text-success' : 
                            b.status === 'PENDING' ? 'bg-warning bg-opacity-10 text-warning' : 
                            'bg-danger bg-opacity-10 text-danger'}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;