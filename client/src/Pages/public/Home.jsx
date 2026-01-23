
import {Link } from "react-router-dom";

import "../../css/home.css";
import heroImg from "../../assets/study.jpg";
import Footer from "../../components/footer";

const Home = () => {

  
  
  return (
    <>
     
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              Find Your Perfect Tutor, <br />
              <span>Learn Anything</span>
            </h1>
            <p>
              Connect with experienced tutors for personalized learning.
              Book sessions, track progress, and achieve your educational goals.
            </p>

            <div className="hero-actions">
              <Link to="/browser" className="btn-primary">
                Browse Tutors →
              </Link>
              <Link to="/signup" className="btn-secondary">
                Become a Tutor
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Learning" />
          </div>
        </div>
      </section>

      <section className="why">
        <h2>Why Choose SajiloPathShala?</h2>
        <p className="why-subtitle">
          We make finding and learning from expert tutors simple, effective, and accessible.
        </p>

        <div className="why-grid">
          <div className="why-card">
            <div className="icon">👨‍🏫</div>
            <h4>Expert Tutors</h4>
            <p>Learn from experienced professionals across various subjects</p>
          </div>

          <div className="why-card">
            <div className="icon">📅</div>
            <h4>Flexible Scheduling</h4>
            <p>Book sessions that fit your schedule and availability</p>
          </div>

          <div className="why-card">
            <div className="icon">⭐</div>
            <h4>Verified Ratings</h4>
            <p>Choose tutors based on authentic reviews and ratings</p>
          </div>

          <div className="why-card">
            <div className="icon">📚</div>
            <h4>Multiple Subjects</h4>
            <p>Find tutors for school and college-level education</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Start Learning?</h2>
        <p>Join thousands of students already learning with SajiloPathShala</p>
        <Link to="/signup" className="btn-primary">
          Sign Up for Free →
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Home;
