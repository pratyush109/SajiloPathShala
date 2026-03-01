import { useState, useEffect, useMemo } from "react";
import TutorCard from "../../components/TutorCard";
import Filters from "../../components/Filter";
import SearchBar from "../../components/Searchbar";
import { useApi } from "../../hooks/useAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const BrowseTutors = () => {
  const { callApi } = useApi();
  const [allTutors, setAllTutors] = useState([]); 
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(0);
  const [subjectRefresh, setSubjectRefresh] = useState(0);

 
  useEffect(() => {
    const fetchAllTutors = async () => {
      try {
        const res = await callApi("GET", "/tutor");
        setAllTutors(res.data || []);
      } catch (err) {
        console.log("Fetch error:", err.message);
      }
    };
    fetchAllTutors();
  }, [callApi]);


  const filteredTutors = useMemo(() => {
    return allTutors.filter((tutor) => {
      const searchTerm = search.toLowerCase();
      
     
      const matchesSearch = 
        tutor.User.fullName.toLowerCase().includes(searchTerm) ||
        (tutor.bio && tutor.bio.toLowerCase().includes(searchTerm));

      const matchesSubject = 
        subject === "" || 
        tutor.subjects?.some(s => s === subject);

      return matchesSearch && matchesSubject;
    });
  }, [search, subject, allTutors]);

  const clearFilters = () => {
    setSearch("");
    setSubject("");
    setRating(0);
  };

  useEffect(() => {
    const handleSubjectsUpdated = () => {
      setSubjectRefresh((prev) => prev + 1);
    };
    window.addEventListener("subjectsUpdated", handleSubjectsUpdated);
    return () => window.removeEventListener("subjectsUpdated", handleSubjectsUpdated);
  }, []);

  return (
    <div className="container my-5">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="row mt-4">
        <div className="col-lg-3 mb-4">
          <Filters
            subject={subject}
            setSubject={setSubject}
            clearFilters={clearFilters}
            refreshTrigger={subjectRefresh}
          />
        </div>

        <div className="col-lg-9">
         
          <div className="tutor-results-stabilizer" style={{ minHeight: "600px" }}>
            {filteredTutors.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No tutors found matching your filters</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {filteredTutors.map((tutor) => (
                  <TutorCard key={tutor.User.id} tutor={tutor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTutors;