import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaFilter } from "react-icons/fa";

const allJobs = [
  { id: 1, title: "Production Supervisor", company: "Textile Industries Ltd", location: "Erode", type: "Full-time", sector: "Manufacturing", exp: "3-5 Years", salary: "₹25,000 - ₹35,000/mo", posted: "2 days ago", urgent: true },
  { id: 2, title: "HR Executive", company: "Auto Components Pvt Ltd", location: "Coimbatore", type: "Full-time", sector: "Automotive", exp: "1-3 Years", salary: "₹18,000 - ₹25,000/mo", posted: "3 days ago", urgent: false },
  { id: 3, title: "Accounts Manager", company: "Logistics Solutions", location: "Erode", type: "Full-time", sector: "Logistics", exp: "5-8 Years", salary: "₹40,000 - ₹55,000/mo", posted: "1 day ago", urgent: true },
  { id: 4, title: "ITI Fitter / Electrician", company: "Engineering Works", location: "Tirupur", type: "Full-time", sector: "Engineering", exp: "0-2 Years", salary: "₹15,000 - ₹22,000/mo", posted: "5 days ago", urgent: false },
  { id: 5, title: "Sales Executive", company: "FMCG Distribution Co.", location: "Salem", type: "Full-time", sector: "FMCG", exp: "1-3 Years", salary: "₹20,000 - ₹30,000/mo + Incentives", posted: "4 days ago", urgent: false },
  { id: 6, title: "Quality Control Inspector", company: "Garment Factory", location: "Tirupur", type: "Full-time", sector: "Textile", exp: "2-4 Years", salary: "₹22,000 - ₹30,000/mo", posted: "1 week ago", urgent: false },
  { id: 7, title: "Software Developer (React)", company: "IT Services Firm", location: "Coimbatore", type: "Full-time", sector: "IT", exp: "2-4 Years", salary: "₹35,000 - ₹60,000/mo", posted: "2 days ago", urgent: true },
  { id: 8, title: "Store Keeper", company: "Manufacturing Unit", location: "Erode", type: "Full-time", sector: "Manufacturing", exp: "1-3 Years", salary: "₹14,000 - ₹20,000/mo", posted: "6 days ago", urgent: false },
  { id: 9, title: "Staff Nurse", company: "Private Hospital", location: "Erode", type: "Full-time", sector: "Healthcare", exp: "0-3 Years", salary: "₹18,000 - ₹28,000/mo", posted: "3 days ago", urgent: true },
  { id: 10, title: "Machine Operator (CNC)", company: "Precision Tools Ltd", location: "Coimbatore", type: "Full-time", sector: "Engineering", exp: "2-5 Years", salary: "₹20,000 - ₹32,000/mo", posted: "1 week ago", urgent: false },
  { id: 11, title: "BPO Executive", company: "Business Process Unit", location: "Erode", type: "Full-time", sector: "IT", exp: "0-1 Year", salary: "₹12,000 - ₹18,000/mo", posted: "2 days ago", urgent: false },
  { id: 12, title: "Plant Manager", company: "Chemical Plant", location: "Namakkal", type: "Full-time", sector: "Manufacturing", exp: "10+ Years", salary: "₹80,000 - ₹1,20,000/mo", posted: "5 days ago", urgent: true },
];

const sectors = ["All", "Manufacturing", "IT", "Automotive", "Textile", "Healthcare", "FMCG", "Logistics", "Engineering"];
const locations = ["All", "Erode", "Coimbatore", "Tirupur", "Salem", "Namakkal"];

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [location, setLocation] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = allJobs.filter(j =>
    (sector === "All" || j.sector === sector) &&
    (location === "All" || j.location === location) &&
    (j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-badge">Live Openings</span>
          <h1>Current Job Openings</h1>
          <p>Explore opportunities across Tamil Nadu's top employers — exclusively curated by AVB Manpower Solutions</p>
        </div>
      </section>

      <section className="jobs-section">
        {/* Search & Filters */}
        <div className="jobs-filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input placeholder="Search job title or company..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="filter-group">
            <FaFilter style={{color:"#0052a3"}} />
            <select value={sector} onChange={e => setSector(e.target.value)}>
              {sectors.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={location} onChange={e => setLocation(e.target.value)}>
              {locations.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <span className="results-count">{filtered.length} jobs found</span>
        </div>

        <div className="jobs-layout">
          {/* Job List */}
          <div className="jobs-list">
            {filtered.length === 0 ? (
              <div className="no-jobs">No jobs match your filters. <button onClick={() => { setSearch(""); setSector("All"); setLocation("All"); }}>Clear filters</button></div>
            ) : filtered.map(job => (
              <div className={`job-card ${selected?.id === job.id ? "job-card-active" : ""}`} key={job.id} onClick={() => setSelected(job)}>
                {job.urgent && <span className="urgent-badge">Urgent</span>}
                <div className="job-card-top">
                  <div className="job-avatar">{job.company[0]}</div>
                  <div>
                    <h3>{job.title}</h3>
                    <span className="job-company">{job.company}</span>
                  </div>
                </div>
                <div className="job-tags">
                  <span><FaMapMarkerAlt /> {job.location}</span>
                  <span><FaBriefcase /> {job.sector}</span>
                  <span><FaClock /> {job.exp}</span>
                </div>
                <div className="job-salary">{job.salary}</div>
                <div className="job-footer">
                  <span className="job-posted">{job.posted}</span>
                  <span className="job-type-badge">{job.type}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Job Detail */}
          <div className={`job-detail-panel ${selected ? "job-detail-open" : ""}`}>
            {selected ? (
              <>
                <button className="close-detail" onClick={() => setSelected(null)}>✕</button>
                <div className="detail-header">
                  <div className="job-avatar large">{selected.company[0]}</div>
                  <div>
                    <h2>{selected.title}</h2>
                    <p>{selected.company}</p>
                  </div>
                </div>
                {selected.urgent && <span className="urgent-badge">Urgent Hiring</span>}
                <div className="detail-info-grid">
                  <div><strong>Location</strong><span>{selected.location}</span></div>
                  <div><strong>Sector</strong><span>{selected.sector}</span></div>
                  <div><strong>Experience</strong><span>{selected.exp}</span></div>
                  <div><strong>Employment</strong><span>{selected.type}</span></div>
                  <div><strong>Salary</strong><span>{selected.salary}</span></div>
                  <div><strong>Posted</strong><span>{selected.posted}</span></div>
                </div>
                <div className="detail-desc">
                  <h4>About the Role</h4>
                  <p>We are looking for a qualified {selected.title} to join our team at {selected.company} in {selected.location}. The ideal candidate should have {selected.exp} of relevant experience in the {selected.sector} sector.</p>
                  <h4>Key Responsibilities</h4>
                  <ul>
                    <li>Execute day-to-day operations in the {selected.sector} domain</li>
                    <li>Maintain quality standards and performance targets</li>
                    <li>Coordinate with cross-functional teams</li>
                    <li>Report to senior management and contribute to process improvements</li>
                  </ul>
                </div>
                <Link to="/candidate/register" className="apply-btn">Apply Now →</Link>
                <p className="apply-note">Create your profile to apply. Our consultant will contact you within 2 business days.</p>
              </>
            ) : (
              <div className="detail-placeholder">
                <span>👈</span>
                <p>Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
