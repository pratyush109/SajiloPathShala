import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          
          {/* BRAND */}
          <div className="footer-brand">
            <div className="brand-row">
              <img src={logo} alt="SajiloPathShala" />
              <span>SajiloPathShala</span>
            </div>
            <p>
              Connecting students with expert tutors for personalized learning
              experiences.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/browser">Browse Tutors</Link>
            <Link to="/become-tutor">Become a Tutor</Link>
            <Link to="/about">About Us</Link>
          </div>

      
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>📧 support@sajilopathshala.com</p>
            <p>📞 +977 123-456-7890</p>
            <p>📍 Kathmandu, Nepal</p>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        © 2026 SajiloPathShala. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;