import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaHandshake, FaEye, FaBullseye, FaStar } from "react-icons/fa";

const team = [
  { name: "Venkatesh Prabhu M", role: "Founder & CEO", exp: "15+ Years HR Experience", initial: "VP" },
  { name: "Ashok Shakthivel", role: "Head - Recruitment", exp: "10+ Years Talent Acquisition", initial: "AS" },
  { name: "Deepak", role: "Operations Manager", exp: "5+ Years HR Operations", initial: "DP" },
  { name: "Ranjith Kumar", role: "staff coordinator", exp: "2+ Years Statutory Compliance", initial: "RK" },
];

const values = [
  { icon: <FaHandshake />, title: "Integrity", desc: "We operate with complete transparency and honesty in every client and candidate interaction." },
  { icon: <FaEye />, title: "Vision", desc: "Anticipating workforce trends to deliver future-ready talent solutions for your organization." },
  { icon: <FaBullseye />, title: "Precision", desc: "Every placement is meticulously matched to ensure the right person fits the right role." },
  { icon: <FaStar />, title: "Excellence", desc: "We hold ourselves to the highest standards, consistently delivering results that exceed expectations." },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const About = () => (
  <>
    {/* PAGE HERO */}
    <section className="page-hero">
      <div className="page-hero-content">
        <span className="page-badge">Established 2017 · Erode, Tamil Nadu</span>
        <h1>About AVB Manpower Solutions</h1>
        <p>Seven years of transforming careers and building exceptional workforces across India</p>
      </div>
    </section>

    {/* STORY */}
    <section className="about-story">
      <div className="about-grid">
        <FadeIn>
          <div className="about-text-block">
            <span className="label-chip">Our Story</span>
            <h2>Born in Erode.<br />Built for India.</h2>
            <p>AVB Manpower Solutions was founded in 2017 with a single mission — to bridge the gap between skilled talent and quality employers across Tamil Nadu. Starting from Erode, one of India's fastest-growing industrial hubs, we have grown to serve 100+ companies and place 10,000+ candidates across manufacturing, IT, healthcare, textiles, and more.</p>
            <p>Our founder's vision was simple: honest, relationship-driven HR consulting that delivers real value — not just placements, but the right placements. Today, that vision powers every search we conduct, every CV we submit, and every career we help shape.</p>
            <Link to="/contact" className="team-btn" style={{display:"inline-block",marginTop:"20px"}}>Get in Touch →</Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="about-stats-block">
            <div className="about-stat"><span className="about-stat-num">7+</span><span className="about-stat-lab">Years in Industry</span></div>
            <div className="about-stat"><span className="about-stat-num">100+</span><span className="about-stat-lab">Clients Served</span></div>
            <div className="about-stat"><span className="about-stat-num">10,000+</span><span className="about-stat-lab">Placements Made</span></div>
            <div className="about-stat"><span className="about-stat-num">50+</span><span className="about-stat-lab">Industries Covered</span></div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* VALUES */}
    <section className="values-section">
      <div className="section-header">
        <h2 className="core_heading">Our Core Values</h2>
        <p className="section-sub">The principles that guide every decision we make</p>
      </div>
      <div className="values-grid">
        {values.map((v, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* TEAM */}
    <section className="team-section">
      <div className="section-header">
        <h2 className="core_heading">Meet Our Team</h2>
        <p className="section-sub">Passionate HR professionals dedicated to your success</p>
      </div>
      <div className="team-grid">
        {team.map((m, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="team-card">
              <div className="team-avatar">{m.initial}</div>
              <h3>{m.name}</h3>
              <span className="team-role">{m.role}</span>
              <p>{m.exp}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* WHY US */}
    <section className="whyus-section">
      <div className="whyus-content">
        <h2>Why Choose AVB Manpower Solutions?</h2>
        <div className="whyus-grid">
          {[
            "Deep knowledge of Erode & Tamil Nadu job market",
            "End-to-end HR services under one roof",
            "Dedicated relationship managers for every client",
            "Faster turnaround — average 7 days to placement",
            "Pre-screened, interview-ready candidates",
            "100% compliance with Indian labor laws",
          ].map((item, i) => (
            <div className="whyus-item" key={i}>
              <span className="check">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
