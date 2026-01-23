import { useState } from "react";
import TutorCard from "../../components/TutorCard";
import Filters from "../../components/Filter";
import SearchBar from "../../components/Searchbar";
import "../../css/browser.css"

const tutorsData = [
  {
    name: "Rajesh Sharma",
    rating: 4.8,
    bio: "Experienced mathematics teacher with 10 years of expertise",
    subjects: ["Mathematics", "Physics"],
    experience: 10,
    rate: 1500,
    availability: "Weekdays",
  },
  {
    name: "Priya Thapa",
    rating: 4.6,
    bio: "English language specialist focused on communication skills",
    subjects: ["English", "Literature"],
    experience: 7,
    rate: 1200,
    availability: "Weekends",
  },
  {
    name: "Amit Gurung",
    rating: 4.9,
    bio: "Computer Science expert teaching programming and algorithms",
    subjects: ["Computer Science", "Programming"],
    experience: 8,
    rate: 1800,
    availability: "Any Day",
  },
];

const BrowseTutors = () => {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState("Any Day");

  const clearFilters = () => {
    setSubject("All Subjects");
    setRating(0);
    setAvailability("Any Day");
    setSearch("");
  };

  const filteredTutors = tutorsData.filter((tutor) => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(search.toLowerCase()) ||
      tutor.subjects.join(" ").toLowerCase().includes(search.toLowerCase());

    const matchesSubject =
      subject === "All Subjects" || tutor.subjects.includes(subject);

    const matchesRating = tutor.rating >= rating;

    const matchesAvailability =
      availability === "Any Day" || tutor.availability === availability;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesRating &&
      matchesAvailability
    );
  });

  return (
    <div className="browse-page">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="browse-content">
        <Filters
          subject={subject}
          setSubject={setSubject}
          rating={rating}
          setRating={setRating}
          availability={availability}
          setAvailability={setAvailability}
          clearFilters={clearFilters}
        />

        <div className="tutors-grid">
          {filteredTutors.map((tutor, index) => (
            <TutorCard key={index} tutor={tutor} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseTutors;