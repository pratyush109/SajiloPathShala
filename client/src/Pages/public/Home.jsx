import { Link } from "react-router-dom";
import heroImg from "../../assets/study.png";
import Footer from "../../components/footer";
import {
  FaSearch,
  FaUserCheck,
  FaClock,
  FaStar,
  FaChalkboardTeacher,
  FaCalendarAlt,
} from "react-icons/fa";
import "../../style/home.css";

const FeatureCard = ({ icon, title, text }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h6>{title}</h6>
    <p>{text}</p>
  </div>
);

const StepCard = ({ icon, title, text }) => (
  <div className="step-card">
    <div className="step-icon">{icon}</div>
    <h6>{title}</h6>
    <p>{text}</p>
  </div>
);

const Home = () => {
  return (
    <>
     
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">Trusted by 2000+ students</span>

            <h1>
              Find a tutor who <span>actually fits</span> your learning style
            </h1>

            <p>
              Browse verified tutors, compare teaching styles, and book sessions
              that match your schedule and goals.
            </p>

            <div className="hero-actions">
              <Link to="/browser" className="btn-primary">
                Find a Tutor
              </Link>
              <Link to="/signup" className="btn-secondary">
                Become a Tutor
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>180+</strong>
                <span>Verified Tutors</span>
              </div>
              <div>
                <strong>4.8★</strong>
                <span>Average Rating</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Secure Booking</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Learning with tutor" />
          </div>
        </div>
      </section>

      {/* FEATURE PREVIEW */}
      <section className="features">
        <div className="container">
          <h2>Why students choose our tutors</h2>
          <p className="section-subtitle">
            Designed to help you learn faster, safer, and with confidence.
          </p>

          <div className="features-grid">
            <FeatureCard
              icon={<FaChalkboardTeacher />}
              title="Verified tutors only"
              text="Every tutor is manually reviewed for quality and expertise."
            />
            <FeatureCard
              icon={<FaCalendarAlt />}
              title="Flexible scheduling"
              text="Book sessions that fit around your daily routine."
            />
            <FeatureCard
              icon={<FaStar />}
              title="Real student reviews"
              text="Honest feedback from learners just like you."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <h2>How it works</h2>

          <div className="steps-grid">
            <StepCard
              icon={<FaSearch />}
              title="Browse tutors"
              text="Explore tutors by subject, level, and availability."
            />
            <StepCard
              icon={<FaUserCheck />}
              title="Compare confidently"
              text="See profiles, teaching styles, and verified reviews."
            />
            <StepCard
              icon={<FaClock />}
              title="Book instantly"
              text="Choose a time and start learning without back-and-forth."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Start learning today</h2>
          <p>No subscriptions. No pressure. Just great tutors.</p>
          <Link to="/browser" className="btn-primary large">
            Browse Tutors
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
