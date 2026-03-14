import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaWhatsapp, FaUsers, FaBuilding, FaBriefcase, FaAward } from "react-icons/fa";
import { SiIndeed } from "react-icons/si";
import bgVideo from "../assets/bg-video.mp4";
import recruitmentImg from "../assets/images/recruitmentImg.jpg";
import staffingImg from "../assets/images/staffingImg.jpg";
import payrollImg from "../assets/images/payrollImg.jpg";
import statutoryImg from "../assets/images/statutoryImg.jpg";
import trainingImg from "../assets/images/trainingImg.jpg";
import hrpolicyImg from "../assets/images/hrpolicyImg.jpg";

const cardData = [
  { id: 1, image: recruitmentImg, title: "Recruitment", description: "End-to-end executive search and talent acquisition tailored to your company culture, goals, and industry needs across all levels." },
  { id: 2, image: staffingImg, title: "Contract Staffing", description: "Flexible workforce solutions with skilled contract professionals who integrate seamlessly into your operations with minimal ramp-up time." },
  { id: 3, image: payrollImg, title: "Payroll Services", description: "Comprehensive payroll management ensuring accurate, timely processing with full statutory compliance for your entire workforce." },
  { id: 4, image: statutoryImg, title: "Statutory Compliance", description: "Expert management of PF, ESI, PT, and all labor law compliance to keep your business legally protected and audit-ready." },
  { id: 5, image: trainingImg, title: "Training & Development", description: "Customized skill development programs that enhance your workforce capabilities and accelerate organizational performance." },
  { id: 6, image: hrpolicyImg, title: "HR Policy Design", description: "Strategic HR policy frameworks aligned to your business objectives, employee well-being, and regulatory requirements." },
];

const stats = [
  { icon: <FaAward />, end: 7, suffix: "+", label: "Years of Excellence", color: "#e08f33" },
  { icon: <FaBuilding />, end: 100, suffix: "+", label: "Happy Clients", color: "#0052a3" },
  { icon: <FaUsers />, end: 10000, suffix: "+", label: "Candidates Placed", color: "#e08f33" },
  { icon: <FaBriefcase />, end: 50, suffix: "+", label: "Industries Served", color: "#0052a3" },
];

const sectors = [
  "Manufacturing", "IT & Software", "Automotive", "Textile & Garments",
  "Healthcare", "FMCG", "Logistics", "Banking & Finance",
  "Construction", "Retail", "Engineering", "Education"
];

function AnimatedCounter({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = end / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const Home = () => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <div className={`hero-content ${heroVisible ? "hero-animate" : ""}`}>
            <span className="hero-badge">Erode's #1 HR Consultancy</span>
            <h1>AVB Manpower<br />Solutions</h1> 
            <h2>Delivering Skilled Talent.<br />Driving Business Success. </h2>
            <div className="hero-cta-row">
              <Link to="/jobs" className="hero-btn-primary">Browse Jobs</Link>
              <a href="#why" className="hero-btn-secondary">Why Choose Us →</a>
            </div>
          </div>
          <div className="hero-bottom-left">
            <a href="tel:+917418615555">📞 +91 74186 71555</a>
            <a href="tel:+919894627555">📞 +91 98946 27555</a>
            <a href="mailto:hravbms@gmail.com">✉️ hravbms@gmail.com</a>
          </div>
          <div className="hero-bottom-right">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
            <a href="https://in.indeed.com" target="_blank" rel="noreferrer"><SiIndeed /></a>
            <a href="https://wa.me/918870101265" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="partner_section">
        <div className="marquee">
          <h1 className="partner">
            ✦ End-to-End HR Solutions &nbsp;&nbsp; ✦ Recruitment &nbsp;&nbsp; ✦ Payroll Management &nbsp;&nbsp; ✦ Contract Staffing &nbsp;&nbsp; ✦ Statutory Compliance &nbsp;&nbsp; ✦ Training & Development &nbsp;&nbsp; ✦ HR Policy Design &nbsp;&nbsp; ✦ Talent Acquisition &nbsp;&nbsp;
          </h1>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        {stats.map((s, i) => (
          <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="stat-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="stat-number" style={{ color: s.color }}>
              <AnimatedCounter end={s.end} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ABOUT SNIPPET */}
      <section className="text_section" id="why">
        <div className="bold_para">
          AVB Manpower <span className="span">Solutions offers ideal local staffing</span> solutions to meet all <span className="span">your talent needs.</span>
        </div>
        <div className="normal_para">
          We leverage deep regional insight combined with global expertise to deliver customized HR services across 100+ clients in India. Our commitment to exclusive, client-focused solutions sets us apart—ensuring reliable talent, strategic workforce support, and exceptional results for our partners.
        </div>
        <div className="hero-cta-row" style={{marginTop: "10px"}}>
          <Link to="/about" className="team-btn">Meet Our Team <span className="arrow">→</span></Link>
          <Link to="/candidate/register" className="team-btn" style={{background: "linear-gradient(90deg, #e08f33, #c47820)"}}>Register as Candidate <span className="arrow">→</span></Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="corevalue">
        <div className="section-header">
          <h1 className="core_heading">What We Deliver</h1>
          <p className="section-sub">Comprehensive HR solutions designed to fuel your business growth</p>
        </div>
        <div className="card-container">
          {cardData.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link to="/services" className="card-btn">Find Out More <span>→</span></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section className="sectors-section">
        <div className="section-header">
          <h2 className="sectors-heading">Industries We Serve</h2>
          <p className="section-sub">Placing skilled talent across all major sectors in Tamil Nadu and beyond</p>
        </div>
        <div className="sectors-grid">
          {sectors.map((s, i) => (
            <div className="sector-chip" key={i}>{s}</div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Ready to Find Your Next Opportunity?</h2>
          <p>Join thousands of candidates who found their dream job through AVB Manpower Solutions</p>
          <div className="hero-cta-row">
            <Link to="/candidate/register" className="hero-btn-primary">Register Now</Link>
            <Link to="/contact" className="hero-btn-secondary">Talk to Us →</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
