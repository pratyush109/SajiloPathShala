import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/footer.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-section text-light mt-5">

      <div className="py-5 px-3">
        <div className="container">
          <div className="row gx-5">

            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-2">
                <img src={logo} alt="Logo" width="60" height="60" />
                <span className="fs-5 fw-bold ms-2">SajiloPathShala</span>
              </div>
              <p className="footer-text">
                Connecting students with expert tutors for personalized learning experiences.
              </p>
            </div>

            <div className="col-lg-3 mb-4 mb-lg-0">
              <h6 className="fw-semibold mb-3">Quick Links</h6>
              <div className="d-flex flex-column gap-2">
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/browser" className="footer-link">Browse Tutors</Link>
                <Link to="/signup" className="footer-link">Become a Tutor</Link>
                <Link to="/about" className="footer-link">About Us</Link>
              </div>
            </div>

            <div className="col-lg-3">
              <h6 className="fw-semibold mb-3">Contact</h6>
              <p><FaEnvelope className="me-2" /> support@sajilopathshala.com</p>
              <p><FaPhone className="me-2" /> +977 123-456-7890</p>
              <p><FaMapMarkerAlt className="me-2" /> Kathmandu, Nepal</p>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom text-center py-3">
        <small>© 2026 SajiloPathShala. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
