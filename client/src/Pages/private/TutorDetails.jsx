import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { FaClock } from "react-icons/fa";
import toast from "react-hot-toast"; // 1. Import toast
import "../../style/TutorDetails.css";

const TutorDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { callApi } = useApi();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(state || null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state) {
      const fetchTutor = async () => {
        try {
          const res = await callApi("GET", `/tutors/${id}`);
          setTutor(res.data);
        } catch (err) {
          toast.error("Could not load tutor details"); // Error toast
          console.log(err.message);
        }
      };
      fetchTutor();
    }
  }, [id, state, callApi]);

  const handleBookSession = async () => {
    if (!date || !time || !selectedSubject) {
      toast.error("Please select date, time, and subject"); // Warning toast
      return;
    }

    setLoading(true);
    // Using a promise-based toast for a better "loading -> success" flow
    const bookingPromise = callApi("POST", "/booking", {
      data: {
        tutorId: tutor.id,
        date,
        time,
        subject: selectedSubject,
      },
    });

    toast.promise(bookingPromise, {
      loading: 'Processing your booking...',
      success: () => {
        setTimeout(() => navigate("/studentdashboard"), 1500); // Small delay so they see the success
        return 'Session booked successfully! Redirecting...';
      },
      error: (err) => err.message || "Failed to book session",
    });

    try {
      await bookingPromise;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!tutor) return <p className="text-center mt-5">Loading tutor...</p>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* LEFT – BOOK A CLASS */}
        <div className="col-lg-8">
          <div className="card p-4 shadow-sm border-0">
            <h5 className="mb-4 fw-bold">Book a Class</h5>

            <div className="mb-3">
              <label className="form-label fw-semibold">Select Subject</label>
              <select
                className="form-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Choose a subject</option>
                {tutor.subjects?.map((sub, i) => (
                  <option key={i} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Select Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Select Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <button
              className="btn btn-lg w-100 text-white fw-bold"
              style={{ backgroundColor: "#0cb01c", borderRadius: "10px" }}
              onClick={handleBookSession}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </div>

        {/* RIGHT – TUTOR SUMMARY */}
        <div className="col-lg-4">
          <div className="card p-4 shadow-sm border-0">
            <h6 className="mb-3 fw-bold">Booking Summary</h6>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: 50, height: 50, fontWeight: 700, fontSize: "1.2rem" }}
              >
                {tutor.fullName?.[0]}
              </div>
              <div>
                <div className="fw-bold">{tutor.fullName}</div>
                <div className="text-muted small">{tutor.subjects?.join(", ")}</div>
              </div>
            </div>

            <hr className="text-muted opacity-25" />

            <div className="small d-flex justify-content-between mb-2">
              <span className="text-muted">Experience</span>
              <span className="fw-semibold">{tutor.experience} years</span>
            </div>

            <hr className="text-muted opacity-25" />

            <div className="mb-3">
              <h6 className="small fw-bold mb-2">Available Days</h6>
              <div className="d-flex flex-wrap gap-2">
                {tutor.availability
                  ? Object.entries(tutor.availability)
                      .filter(([_, value]) => value)
                      .map(([day], i) => (
                        <span key={i} className="badge bg-light text-dark border p-2 fw-normal">
                          <FaClock className="me-1 text-success" /> {day}
                        </span>
                      ))
                  : <span className="text-muted small">No availability set</span>}
              </div>
            </div>

            <hr className="text-muted opacity-25" />

            <div className="fw-bold d-flex justify-content-between align-items-center">
              <span>Total Fee</span>
              <span className="text-success fs-5">NPR {tutor.hourlyRate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;