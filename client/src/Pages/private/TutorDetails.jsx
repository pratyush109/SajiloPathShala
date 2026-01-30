import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { FaStar, FaClock } from "react-icons/fa";

const TutorDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { callApi } = useApi();

  const [tutor, setTutor] = useState(state || null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!state) {
      const fetchTutor = async () => {
        try {
          const res = await callApi("GET", `/tutors/${id}`);
          setTutor(res.data);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchTutor();
    }
  }, [id, state, callApi]);

  const fetchSessions = async () => {
    try {
      const res = await callApi("GET", "/booking");
      setSessions(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (!tutor) return <p className="text-center">Loading tutor...</p>;

  const handleBookSession = async () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    setLoading(true);
    try {
    
await callApi("POST", "/booking", {

  data: {
    data: {  
      tutorId: tutor.id,
      date,
      time,
      subject: tutor.subjects?.[0],
    }
  }
});

      alert("Session booked successfully!");

     fetchSessions();
    } catch (err) {
      alert(err.message || "Failed to book session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* LEFT – BOOK A CLASS */}
        <div className="col-lg-8">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-4">Book a Class</h5>

          
            <div className="mb-3">
              <label className="form-label">Select Subject</label>
              <select className="form-select">
                <option>Choose a subject</option>
                {tutor.subjects?.map((sub, i) => (
                  <option key={i}>{sub}</option>
                ))}
              </select>
            </div>

          
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Select Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Select Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <button
              className="btn w-100 text-white"
              style={{ backgroundColor: "#0cb01c" }}
              onClick={handleBookSession}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-4 shadow-sm">
            <h6 className="mb-3">Booking Summary</h6>

         
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48, fontWeight: 600 }}
              >
                {tutor.fullName?.[0]}
              </div>
              <div>
                <div className="fw-semibold">{tutor.fullName}</div>
                <div className="text-muted small">
                  {tutor.subjects?.join(", ")}
                </div>
              </div>
            </div>

            <hr />

            <div className="small d-flex justify-content-between mb-2">
              <span>Experience</span>
              <span>{tutor.experience} years</span>
            </div>

            <div className="small d-flex justify-content-between mb-2">
              <span>Rating</span>
              <span className="text-warning">
                <FaStar /> {tutor.rating }
              </span>
            </div>

      
            <hr />

            <div className="mb-3">
              <h6 className="small fw-semibold mb-2">Available Timing</h6>

              {tutor.availability
                ? Object.entries(tutor.availability)
                    .filter(([_, value]) => value)
                    .map(([day], i) => (
                      <div
                        key={i}
                        className="d-flex align-items-center gap-2 small text-muted mb-1"
                      >
                        <FaClock />
                        {day}
                      </div>
                    ))
                : <span className="text-muted small">No availability set</span>}
            </div>

            <hr />

            <div className="small fw-semibold d-flex justify-content-between">
              <span>Class Fee</span>
              <span className="text-success">
                NPR{tutor.hourlyRate}/hr
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;