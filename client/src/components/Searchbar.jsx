import { FaSearch } from "react-icons/fa";
import "../style/SearchBar.css";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="search-wrapper w-100">
        <div className="input-group search-box">

          <span className="input-group-text search-icon">
            <FaSearch color="#7c3aed" />
          </span>

          <input
            type="text"
            className="form-control search-input"
            placeholder="Search tutors by name or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>
    </div>
  );
};

export default SearchBar;

      {/* */}
