import { useNavigate } from "react-router-dom";
import { FaStar, FaClock } from "react-icons/fa";

const TutorCard = ({ tutor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tutor/${tutor.User.id}`, {
      state: {
        id: tutor.User.id,
        fullName: tutor.User.fullName,
        bio: tutor.bio,
        subjects: tutor.subjects,
        experience: tutor.experience,
        hourlyRate: tutor.hourlyRate,
        availability: tutor.availability,
        rating: tutor.rating,
      },
    });
  };

  return (
    <div
      className="card p-3 shadow-sm"
      style={{ borderRadius: "18px" }}
    >
     
      <div className="d-flex justify-content-between align-items-start">
        
        <div className="d-flex gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
           _toggle="avatar"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#d1fae5",
              color: "#10b981",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            {tutor.User.fullName.charAt(0)}
          </div>

          <div>
            <h6 className="mb-1 fw-semibold">{tutor.User.fullName}</h6>

            <div className="text-warning small d-flex align-items-center gap-1 mb-1">
              <FaStar /> {tutor.rating || 5}
            </div>

            <p
              className="text-muted mb-0"
              style={{ fontSize: "14px", lineHeight: 1.5 }}
            >
              {tutor.bio}
            </p>
          </div>
        </div>

     
        <div className="text-end">
          <div className="fw-semibold text-success">
            Rs. {tutor.hourlyRate}/hr
          </div>

          <div className="text-muted small mt-1 d-flex align-items-center justify-content-end gap-1">
            <FaClock /> {tutor.experience} years
          </div>
        </div>
      </div>

     
      <div className="d-flex flex-wrap gap-2 mt-3">
        {tutor.subjects.map((sub, i) => (
          <span
            key={i}
            className="badge text-success bg-success bg-opacity-10"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              padding: "0.35em 0.75em",
            }}
          >
            {sub}
          </span>
        ))}
      </div>

 
      <div className="mt-3">
        <button
          className="btn btn-primary w-100"
          onClick={handleClick}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default TutorCard;