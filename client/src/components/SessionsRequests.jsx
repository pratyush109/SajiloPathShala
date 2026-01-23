import "../../src/css/sessionrequest.css"

const SessionRequests = ({ sessions, onApprove, onReject }) => {
  return (
    <div className="session-requests-card">
      <h3>Session Requests</h3>

      {sessions.length === 0 ? (
        <div className="empty-state">
          <span className="icon">📅</span>
          <p>No session requests yet</p>
        </div>
      ) : (
        sessions.map((session) => (
          <div key={session._id} className="session-item">
            <div className="session-info">
              <h4>{session.studentName}</h4>
              <p>{session.subject}</p>
              <span>{session.date} • {session.time}</span>
            </div>

            <div className="session-actions">
              {session.status === "PENDING" ? (
                <>
                  <button
                    className="approve-btn"
                    onClick={() => onApprove(session._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => onReject(session._id)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span className={`status ${session.status.toLowerCase()}`}>
                  {session.status}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SessionRequests;