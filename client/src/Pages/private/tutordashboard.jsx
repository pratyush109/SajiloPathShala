import "../../css/tutorDashboard.css";
import SessionRequests from "../../components/SessionsRequests";
import { Link } from "react-router-dom";

const TutorDashboard = () => {
  const sessions=[
    {
      _id: "1",
      studentName: "Rajesh Hamal",
      subject: "Mathematics",
      date: "Jan 25",
      time: "10:00 AM",
      status: "PENDING",
    },
  ];


  const approveSession =(id) =>{
    console.log("Approved:",id);
  };

  const rejectSession=(id)=>{
    console.log("Rejected:",id);
  };
  
  return (
    
    <div className="dashboard-wrapper">
  
      <div className="dashboard-header">
        <h1>Welcome back, Pratyush!</h1>
        <p>Manage your tutoring sessions</p>
      </div>

  
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <span>Total Sessions</span>
            <h2>0</h2>
          </div>
          <div className="stat-icon green">📅</div>
        </div>

        <div className="stat-card">
          <div>
            <span>Pending</span>
            <h2>0</h2>
          </div>
          <div className="stat-icon yellow">⏰</div>
        </div>

        <div className="stat-card">
          <div>
            <span>Rating</span>
            <h2>0</h2>
          </div>
          <div className="stat-icon green">⭐</div>
        </div>

        <div className="stat-card">
          <div>
            <span>Reviews</span>
            <h2>0</h2>
          </div>
          <div className="stat-icon green">⭐</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        
        
        <SessionRequests

        sessions={sessions}
        onApprove={approveSession}
        onReject={rejectSession}
        />
        
        <div className="profile-box">
          <h3>My Profile</h3>

          <div className="profile-row">
            <span>Name</span>
            <strong>Pratyush</strong>
          </div>

          <div className="profile-row">
            <span>Rating</span>
            <strong className="rating">
              ⭐ 0 <span>(0)</span>
            </strong>
          </div>

          <div className="profile-row">
            <span>Hourly Rate</span>
            <strong>NPR 2222</strong>
          </div>

       <Link to="/tutorprofile">
  <button className="edit-btn">
    👤 Edit Profile
  </button>
</Link>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;