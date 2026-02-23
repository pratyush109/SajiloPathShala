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
        setSubjects(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("Subjects fetch error:", err.message);
        setSubjects([]);
      }
    };
    fetchSubjects();
  }, [callApi, refreshTrigger]); // <-- re-fetch whenever refreshTrigger changes

  return (
    <div className="card filter-card p-4 mb-4">
      <h5 className="fw-bold mb-4" style={{ color: "var(--brand-purple-dark)" }}>
        Filters
      </h5>

      {/* Subject */}
      <div className="mb-4">
        <label className="form-label d-flex align-items-center gap-2 filter-label">
          <FaBook color="#7c3aed" /> Subject
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

      {/* Clear */}
      <button
        className="btn btn-outline-danger btn-clear w-100 d-flex align-items-center justify-content-center gap-2"
        onClick={clearFilters}
        type="button"
      >
        <FaTimesCircle /> Clear Filters
      </button>
    </div>
  );
};

export default Filters;