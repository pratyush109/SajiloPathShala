import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import "../style/TutorCard.css";

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
      },
    });
  };

  return (
    <div className="card tutor-card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex gap-3">
          <div className="tutor-avatar d-flex align-items-center justify-content-center">
            {tutor.User.fullName.charAt(0)}
          </div>
          <div>
            <h6 className="mb-1 fw-semibold">{tutor.User.fullName}</h6>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              {tutor.bio}
            </p>
          </div>
        </div>

        <div className="text-end">
          <div className="fw-bold" style={{ color: "var(--brand-purple-dark)" }}>
            Rs. {tutor.hourlyRate}/hr
          </div>
          <div className="text-muted small mt-1 d-flex align-items-center justify-content-end gap-1">
            <FaClock /> {tutor.experience} yrs exp
          </div>
        </div>
      </div>

      {/* SUBJECT TAGS */}
      <div className="d-flex flex-wrap gap-2 mt-3">
        {tutor.subjects?.map((sub, i) => (
          <span key={i} className="badge subject-badge px-3 py-2">
            {sub}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <button className="btn btn-profile w-100" onClick={handleClick}>
          View Profile
        </button>
      </div>
    </div>
  );
};

export default TutorCard;

      {/* */}