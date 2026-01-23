import { useNavigate } from "react-router-dom";
import "../../src/css/tutorcard.css";

const TutorCard = ({ tutor, index }) => {
  const navigate = useNavigate();

  return (
    <div
      className="tutor-card"
      onClick={() => navigate(`/tutor/${index}`, { state: tutor })}
      style={{ cursor: "pointer" }}
    >
      <div className="tutor-header">
        <div className="avatar">{tutor.name.charAt(0)}</div>

        <div>
          <h4>{tutor.name}</h4>
          <div className="rating">⭐ {tutor.rating}</div>
        </div>
      </div>

      <p className="bio">{tutor.bio}</p>

      <div className="subjects">
        {tutor.subjects.map((sub, i) => (
          <span key={i} className="tag">
            {sub}
          </span>
        ))}
      </div>

      <div className="tutor-footer">
        <span>🕒 {tutor.experience} years</span>
        <span className="price">Rs. {tutor.rate}/hr</span>
      </div>
    </div>
  );
};

export default TutorCard;
