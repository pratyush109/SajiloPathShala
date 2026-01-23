import "../../src/css/search.css"

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search tutors by name or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;