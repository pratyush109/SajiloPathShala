import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";
import { FaBook, FaStar, FaCalendarAlt, FaTimesCircle } from "react-icons/fa";

const Filters = ({
  subject,
  setSubject,
  rating,
  setRating,
  availability,
  setAvailability,
  clearFilters,
}) => {
  const { callApi } = useApi();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const res = await callApi("GET", "/subjects");
      
      setSubjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Subjects fetch error:", err.message);
      setSubjects([]);
    }
  };

  fetchSubjects();
}, []);

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h5 className="fw-semibold mb-3">Filters</h5>

     
      <div className="mb-3">
        <label className="form-label d-flex align-items-center gap-2">
          <FaBook className="text-success" />
          Subject
        </label>
        <select
  className="form-select"
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
>
  <option value="">All Subjects</option>
  {subjects.map((sub) => (
    <option key={sub._id} value={sub.name}>
      {sub.name}
    </option>
  ))}
</select>

      </div>

    
      <div className="mb-3">
        <label className="form-label d-flex align-items-center gap-2">
          <FaStar className="text-warning" />
          Minimum Rating: <strong>{rating}</strong>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          className="form-range"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

   
      <div className="mb-3">
        <label className="form-label d-flex align-items-center gap-2">
          <FaCalendarAlt className="text-primary" />
          Availability
        </label>
        <select
          className="form-select"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Any Day</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
        </select>
      </div>

    
      <button
        className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
        onClick={clearFilters}
        type="button"
      >
        <FaTimesCircle />
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
