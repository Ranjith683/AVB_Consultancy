import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import recruitmentImg from "../assets/images/recruitmentImg.jpg";
import staffingImg from "../assets/images/staffingImg.jpg";
import payrollImg from "../assets/images/payrollImg.jpg";
import statutoryImg from "../assets/images/statutoryImg.jpg";
import trainingImg from "../assets/images/trainingImg.jpg";
import hrpolicyImg from "../assets/images/hrpolicyImg.jpg";

const services = [
  {
    img: recruitmentImg, title: "Permanent Recruitment",
    tagline: "Right Talent. Right Fit. Right Now.",
    desc: "We go beyond matching skills to CVs. Our consultants deeply understand your organizational culture, leadership expectations, and growth trajectory to find candidates who will thrive long-term.",
    points: ["Executive & mid-level search", "Campus & lateral hiring", "Bulk recruitment drives", "Industry-specific talent pools", "Background verification support"],
  },
  {
    img: staffingImg, title: "Contract Staffing",
    tagline: "Flexible Workforce, Maximum Output.",
    desc: "Scale up or down without the overhead. Our contract staffing solutions give you access to pre-vetted professionals ready to contribute from day one — across short and long-term engagements.",
    points: ["Temporary & fixed-term contracts", "Project-based staffing", "Payroll on our rolls", "On-site workforce management", "Quick deployment within 48 hours"],
  },
  {
    img: payrollImg, title: "Payroll Management",
    tagline: "Accurate. Compliant. On Time.",
    desc: "Take payroll off your plate completely. We handle salary processing, tax calculations, payslip distribution, and year-end returns — ensuring zero errors and full compliance every month.",
    points: ["Monthly payroll processing", "TDS & Form 16 management", "Payslip generation & distribution", "Full & final settlement", "Integration with attendance systems"],
  },
  {
    img: statutoryImg, title: "Statutory Compliance",
    tagline: "Stay Compliant. Stay Protected.",
    desc: "India's labor law landscape is complex and constantly evolving. Our statutory compliance team ensures your business stays fully current with PF, ESI, PT, LWF, and all applicable regulations.",
    points: ["PF & ESI registration and returns", "Professional Tax compliance", "Labour Welfare Fund management", "Factory license renewals", "Compliance audit support"],
  },
  {
    img: trainingImg, title: "Training & Development",
    tagline: "Upskill. Empower. Grow.",
    desc: "Your people are your greatest asset. We design and deliver training programs that improve individual performance, build leadership pipelines, and align your workforce with business strategy.",
    points: ["Soft skills & communication training", "Technical skills workshops", "Leadership development programs", "Onboarding & induction design", "Assessments & certifications"],
  },
  {
    img: hrpolicyImg, title: "HR Policy Design",
    tagline: "Policies That Work For People.",
    desc: "Well-designed HR policies create clarity, consistency, and confidence for your entire workforce. We craft comprehensive HR manuals and policy frameworks tailored to your company size and culture.",
    points: ["Employee handbook creation", "Leave & attendance policies", "POSH compliance framework", "Performance management systems", "Grievance redressal procedures"],
  },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const Services = () => (
  <>
    <section className="page-hero">
      <div className="page-hero-content">
        <span className="page-badge">End-to-End HR Solutions</span>
        <h1>Our Services</h1>
        <p>Comprehensive workforce solutions designed to help businesses find, retain, and manage exceptional talent</p>
      </div>
    </section>

    <section className="services-list">
      {services.map((s, i) => (
        <FadeIn key={i} delay={0.05}>
          <div className={`service-item ${i % 2 === 1 ? "service-item-reverse" : ""}`}>
            <div className="service-img-wrap">
              <img src={s.img} alt={s.title} />
              <div className="service-img-overlay">
                <span>{s.tagline}</span>
              </div>
            </div>
            <div className="service-detail">
              <span className="label-chip">Service 0{i + 1}</span>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
              <ul className="service-points">
                {s.points.map((p, j) => <li key={j}><span className="check-blue">✓</span> {p}</li>)}
              </ul>
              <Link to="/contact" className="team-btn" style={{display:"inline-block",marginTop:"20px",fontSize:"15px",padding:"12px 24px"}}>
                Enquire Now →
              </Link>
            </div>
          </div>
        </FadeIn>
      ))}
    </section>

    <section className="cta-banner">
      <div className="cta-content">
        <h2>Need a Custom HR Solution?</h2>
        <p>Every business is unique. Let's design an HR strategy that fits your exact needs.</p>
        <div className="hero-cta-row">
          <Link to="/contact" className="hero-btn-primary">Contact Us Today</Link>
          <Link to="/jobs" className="hero-btn-secondary">View Open Jobs →</Link>
        </div>
      </div>
    </section>
  </>
);

export default Services;
