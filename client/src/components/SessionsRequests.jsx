import { FaRegCalendarAlt } from "react-icons/fa";
import "../style/SessionsRequests.css";

const SessionRequests = ({ sessions, onApprove, onReject }) => {
  return (
    <div className="session-card card p-3 shadow-sm border-0">

      {sessions.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <span className="d-block fs-1 mb-2 brand-icon">
            <FaRegCalendarAlt />
          </span>
          <p className="mb-0">No session requests yet</p>
        </div>
      ) : (
        sessions.map((session, index) => (
          <div
            key={session.id}
            className={`session-row d-flex justify-content-between align-items-center py-3 ${
              index !== 0 ? "border-top" : ""
            }`}
          >
            <div>
              <h6 className="mb-1 fw-semibold">{session.studentName}</h6>
              <p className="mb-1 text-muted small">{session.subject}</p>
              <span className="text-muted small">
                {session.date} • {session.time}
              </span>
            </div>

            <div className="d-flex gap-2 align-items-center">
              {session.status === "PENDING" ? (
                <>
                  <button
                    className="btn btn-brand btn-sm rounded-pill px-3"
                    onClick={() => onApprove(session.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-outline-brand btn-sm rounded-pill px-3"
                    onClick={() => onReject(session.id)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span
                  className={`status-badge ${
                    session.status === "APPROVED"
                      ? "status-approved"
                      : "status-rejected"
                  }`}
                >
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
