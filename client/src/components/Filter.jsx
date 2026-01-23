import "../../src/css/filter.css"

const Filters = ({
  subject,
  setSubject,
  rating,
  setRating,
  availability,
  setAvailability,
  clearFilters,
}) => {
  return (
    <div className="filters-card">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Subject</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Physics</option>
          <option>English</option>
          <option>Computer Science</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Minimum Rating: {rating}</label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Availability</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option>Any Day</option>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>
      </div>

      <button className="clear-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;