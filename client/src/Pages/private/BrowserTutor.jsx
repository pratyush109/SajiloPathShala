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
  const [availability, setAvailability] = useState("");

  const clearFilters = () => {
    setSearch("");
    setSubject("");
    setRating(0);
    setAvailability("");
  };

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await callApi("GET", "/tutor", {
          params: { search, subject, rating, availability },
        });
        setTutors(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTutors();
  }, [search, subject, rating, availability, callApi]);

  return (
    <div className="container my-5">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="row mt-4">
        {/* Filters */}
        <div className="col-lg-3 mb-4">
          <Filters
            subject={subject}
            setSubject={setSubject}
            rating={rating}
            setRating={setRating}
            availability={availability}
            setAvailability={setAvailability}
            clearFilters={clearFilters}
          />
        </div>

    
        <div className="col-lg-9">
          {tutors.length === 0 ? (
            <p className="text-center">
              No tutors found matching your filters
            </p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseTutors;