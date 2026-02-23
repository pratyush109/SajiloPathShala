import { useState, useEffect } from "react";
import TutorCard from "../../components/TutorCard";
import Filters from "../../components/Filter";
import SearchBar from "../../components/Searchbar";
import { useApi } from "../../hooks/useAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const BrowseTutors = () => {
  const { callApi } = useApi();
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(0);
  const [subjectRefresh, setSubjectRefresh] = useState(0); // <-- refresh trigger

  const clearFilters = () => {
    setSearch("");
    setSubject("");
    setRating(0);
  };

  // Fetch tutors whenever filters change
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await callApi("GET", "/tutor", {
          params: { search, subject, rating },
        });
        setTutors(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchTutors();
  }, [search, subject, rating, callApi]);

  // Listen for tutor profile updates
  useEffect(() => {
    const handleSubjectsUpdated = () => {
      setSubjectRefresh((prev) => prev + 1); // trigger Filters to refresh subjects
    };

    window.addEventListener("subjectsUpdated", handleSubjectsUpdated);
    return () => window.removeEventListener("subjectsUpdated", handleSubjectsUpdated);
  }, []);

  return (
    <div className="container my-5">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="row mt-4">
        {/* Filters */}
        <div className="col-lg-3 mb-4">
          <Filters
            subject={subject}
            setSubject={setSubject}
            clearFilters={clearFilters}
            refreshTrigger={subjectRefresh} // <-- pass refreshTrigger
          />
        </div>

        {/* Tutor Cards */}
        <div className="col-lg-9">
          {tutors.length === 0 ? (
            <p className="text-center">No tutors found matching your filters</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {tutors.map((tutor) => (
                <TutorCard key={tutor.User.id} tutor={tutor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseTutors;