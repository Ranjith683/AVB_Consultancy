import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaLinkedinIn, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SiIndeed } from "react-icons/si";

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-brand">
        <img src={logo} alt="AVB Manpower Solutions" className="footer-logo" />
        <p>Erode's trusted HR consultancy delivering end-to-end workforce solutions since 2017. 100+ clients. 10,000+ placements. One mission.</p>
        <div className="footer-social">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          <a href="https://in.indeed.com" target="_blank" rel="noreferrer"><SiIndeed /></a>
          <a href="https://wa.me/918870101265" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/jobs">Current Jobs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Services</h4>
        <ul>
          <li><Link to="/services">Permanent Recruitment</Link></li>
          <li><Link to="/services">Contract Staffing</Link></li>
          <li><Link to="/services">Payroll Management</Link></li>
          <li><Link to="/services">Statutory Compliance</Link></li>
          <li><Link to="/services">Training & Development</Link></li>
          <li><Link to="/services">HR Policy Design</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Candidate Portal</h4>
        <ul>
          <li><Link to="/candidate/register">Register Profile</Link></li>
          <li><Link to="/candidate/login">Candidate Login</Link></li>
          <li><Link to="/jobs">Browse Jobs</Link></li>
        </ul>
        <h4 style={{marginTop:"20px"}}>Contact</h4>
        <ul className="footer-contact-list">
          <li><FaPhone /> <a href="tel:+917418615555">+91 74186 1555</a></li>
          <li><FaEnvelope /> <a href="mailto:hravbms@gmail.com">hravbms@gmail.com</a></li>
          <li><FaMapMarkerAlt /> Erode, Tamil Nadu - 638011</li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} AVB Manpower Solutions, Erode. All rights reserved.</p>
      <p>Designed with ❤️ for Erode's workforce</p>
    </div>
  </footer>
);

export default Footer;
