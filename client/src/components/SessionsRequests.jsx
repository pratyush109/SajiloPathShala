import { FaRegCalendarAlt } from "react-icons/fa";

const SessionRequests = ({ sessions, onApprove, onReject }) => {
  return (
    <div className="card p-3 shadow-sm">


      {sessions.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <span className="d-block fs-1 mb-2">
            <FaRegCalendarAlt />
          </span>
          <p>No session requests yet</p>
        </div>
      ) : (
        sessions.map((session, index) => (
          <div
            key={session.id}
            className={`d-flex justify-content-between align-items-center py-2 ${
              index !== 0 ? "border-top border-secondary border-opacity-10" : ""
            }`}
          >
            <div>
              <h6 className="mb-1">{session.studentName}</h6>
              <p className="mb-1 text-muted small">{session.subject}</p>
              <span className="text-muted small">
                {session.date} • {session.time}
              </span>
            </div>

            <div className="d-flex gap-2">
              {session.status === "PENDING" ? (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => onApprove(session.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onReject(session.id)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span
                  className={`badge ${
                    session.status === "APPROVED"
                      ? "bg-success bg-opacity-10 text-success"
                      : "bg-danger bg-opacity-10 text-danger"
                  }`}
                  style={{ fontSize: "0.8rem", padding: "0.35em 0.75em" }}
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
