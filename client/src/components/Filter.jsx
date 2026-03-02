import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";
import { FaBook, FaTimesCircle } from "react-icons/fa";
import "../style/Filter.css";

const Filters = ({ subject, setSubject, clearFilters, refreshTrigger }) => {
  const { callApi } = useApi();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await callApi("GET", "/subjects");
        // Ensure res.data exists and is an array
        setSubjects(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Subjects fetch error:", err.message);
        setSubjects([]);
      }
    };
    fetchSubjects();
  }, [callApi, refreshTrigger]);

  return (
    <div className="card filter-card p-4">
      <h5 className="filter-title mb-4">
        Filters
      </h5>

      {/* Subject Select */}
      <div className="mb-4">
        <label className="form-label d-flex align-items-center gap-2 filter-label">
          <FaBook color="var(--brand-purple)" /> Subject
        </label>
        <select
          className="form-select custom-select"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.length > 0 ? (
            subjects.map((sub) => (
              <option key={sub._id || sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))
          ) : (
            <option disabled>No subjects available</option>
          )}
        </select>
      </div>

      {/* Clear Button */}
      <button
        className="btn btn-clear w-100 d-flex align-items-center justify-content-center gap-2"
        onClick={clearFilters}
        type="button"
      >
        <FaTimesCircle /> Clear Filters
      </button>
    </div>
  );
};

export default Filters;

      {/* */}