import { useState } from "react";
import "../../css/tutorDetails.css";
import { useLocation } from "react-router-dom";

const TutorDetails = () => {
  const {state: tutor} = useLocation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmitReview = () => {
    if (!rating || !review.trim()) {
      alert("Please give rating and write review");
      return;
    }
    console.log({ rating, review });
  };

  return (
    <div className="tutor-details-page">
      <div className="tutor-card">
      
        <div className="tutor-header">
          <div className="tutor-info">
            <div className="avatar">R</div>

            <div>
              <h2>Rajesh Sharma</h2>
              <div className="meta">
                ⭐ 4.8 <span>•</span> ⏱ 10 years
              </div>
              <p className="price">Rs. 1500/hour</p>
            </div>
          </div>

          <button className="book-btn">Book Session</button>
        </div>

        <hr />

        
        <section>
          <h3>About</h3>
          <p>
            Experienced mathematics teacher with 10 years of expertise
          </p>
        </section>

    
        <section>
          <h3>Subjects</h3>
          <div className="tags">
            <span>Mathematics</span>
            <span>Physics</span>
          </div>
        </section>

      
        <section>
          <h3>Availability</h3>
          <div className="tags gray">
            <span>Monday</span>
            <span>Wednesday</span>
            <span>Friday</span>
          </div>
        </section>


        <section className="review-section">
          <h3>Write a Review</h3>

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={rating >= star ? "active" : ""}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button className="submit-review" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </section>
      </div>
    </div>
  );
};

export default TutorDetails;