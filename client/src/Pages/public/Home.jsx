import { Link } from "react-router-dom";
import heroImg from "../../assets/study.png";
import Footer from "../../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChalkboardTeacher, FaCalendarAlt, FaStar, FaBookOpen } from "react-icons/fa";
import "../../style/home.css"; // create this file

const FeatureCard = ({ icon, title, text }) => (
  <div className="col-md-6 col-lg-3">
    <div className="card border-0 shadow-sm h-100 p-4 text-center feature-card">
      <div className="fs-2 text-purple mb-3">{icon}</div>
      <h6 className="fw-bold">{title}</h6>
      <p className="small text-muted">{text}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
     
      <section className="hero-section text-white position-relative">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <p className="fw-semibold opacity-75">
                Affordable & High Quality Education
              </p>

              <h1 className="display-4 fw-bold mb-3">
                Learn With Our <br />
                <span className="text-warning">Online Tutors!</span>
              </h1>

              <p className="opacity-75 mb-4">
                Connect with expert tutors, attend live classes, and rewatch lessons anytime.
                Personalized learning made simple.
              </p>

              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Link to="/browser" className="btn btn-success btn-lg fw-semibold">
                  Learn More
                </Link>
                <Link to="/signup" className="btn btn-outline-light btn-lg">
                  Get Tutor
                </Link>
              </div>
            </div>

            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <img src={heroImg} alt="Tutor" className="img-fluid hero-img" />
            </div>
          </div>
        </div>

        <div className="wave"></div>
      </section>

      <section className="py-5 bg-white">
        <div className="container text-center">
          <div className="row g-4">
            <FeatureCard
              icon={<FaChalkboardTeacher />}
              title="Face to Face Learning"
              text="Interactive live sessions with expert tutors."
            />
            <FeatureCard
              icon={<FaCalendarAlt />}
              title="Share & Collaborate"
              text="Work together using shared tools and resources."
            />
            <FeatureCard
              icon={<FaStar />}
              title="Monthly Conference"
              text="Attend special workshops and webinars."
            />
            <FeatureCard
              icon={<FaBookOpen />}
              title="Rewatch Lessons"
              text="Access recorded sessions anytime."
            />
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center">
              <img src={heroImg} alt="" className="img-fluid rounded shadow-sm" />
            </div>

            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">Why Choose SajiloPathShala?</h2>
              <p className="text-muted">
                We connect students with professional tutors for flexible and
                effective learning. Study anytime, anywhere.
              </p>

              <div className="row text-center mt-4">
                <div className="col-4">
                  <h3 className="fw-bold text-success">2000+</h3>
                  <p className="small text-muted">Students</p>
                </div>
                <div className="col-4">
                  <h3 className="fw-bold text-success">180+</h3>
                  <p className="small text-muted">Teachers</p>
                </div>
                <div className="col-4">
                  <h3 className="fw-bold text-success">4000+</h3>
                  <p className="small text-muted">Users</p>
                </div>
              </div>

              <div className="mt-4">
                <Link to="/signup" className="btn btn-success me-3">
                  Get Started
                </Link>
                <Link to="/browser" className="btn btn-outline-secondary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-center text-white cta-section">
        <div className="container">
          <h2 className="fw-bold">Ready to Start Learning?</h2>
          <p className="mb-4">
            Join thousands of students already learning with SajiloPathShala
          </p>
          <Link to="/signup" className="btn btn-light btn-lg fw-semibold">
            Sign Up for Free
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
