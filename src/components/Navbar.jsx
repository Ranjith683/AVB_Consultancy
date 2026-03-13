import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { candidate } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="logo">
          <Link to="/"><img src={logo} alt="AVB Manpower Solutions" /></Link>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "bar bar-open" : "bar"}></span>
          <span className={menuOpen ? "bar bar-open" : "bar"}></span>
          <span className={menuOpen ? "bar bar-open" : "bar"}></span>
        </button>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <Link to="/" className={isActive("/") ? "active" : ""} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/services" className={isActive("/services") ? "active" : ""} onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/jobs" className={isActive("/jobs") ? "active" : ""} onClick={() => setMenuOpen(false)}>Jobs</Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""} onClick={() => setMenuOpen(false)}>Contact</Link>
          {candidate ? (
            <Link to="/candidate/dashboard" className="nav-portal-btn" onClick={() => setMenuOpen(false)}>👤 My Portal</Link>
          ) : (
            <Link to="/candidate/login" className="nav-portal-btn" onClick={() => setMenuOpen(false)}>Candidate Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
