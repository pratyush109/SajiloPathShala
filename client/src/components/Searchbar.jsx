import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="d-flex justify-content-center mb-3">
      <div
        className="input-group"
        style={{ maxWidth: "680px" }}
      >
        <span
          className="input-group-text bg-white border-end-0"
          style={{ borderRadius: "50px 0 0 50px" }}
        >
          <FaSearch className="text-muted" />
        </span>

        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search tutors by name or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderRadius: "0 50px 50px 0",
            padding: "14px 18px",
            borderColor: "#e5e7eb",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
