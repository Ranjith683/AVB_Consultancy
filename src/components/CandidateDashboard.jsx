import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { FaUser, FaBriefcase, FaBell, FaSignOutAlt, FaEdit, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const sampleJobs = [
  { id: 1, title: "Production Supervisor", company: "Textile Industries Ltd", location: "Erode", appliedDate: "2025-03-01", status: "Under Review" },
  { id: 2, title: "HR Executive", company: "Auto Components Pvt Ltd", location: "Coimbatore", appliedDate: "2025-02-25", status: "Shortlisted" },
  { id: 3, title: "Accounts Manager", company: "Logistics Solutions", location: "Erode", appliedDate: "2025-02-20", status: "Interview Scheduled" },
];

const statusIcon = (s) => {
  if (s === "Shortlisted" || s === "Interview Scheduled") return <FaCheckCircle style={{color:"#22c55e"}} />;
  if (s === "Rejected") return <FaTimesCircle style={{color:"#ef4444"}} />;
  return <FaClock style={{color:"#f59e0b"}} />;
};

const statusClass = (s) => {
  if (s === "Shortlisted") return "status-green";
  if (s === "Interview Scheduled") return "status-blue";
  if (s === "Rejected") return "status-red";
  return "status-yellow";
};

const CandidateDashboard = () => {
  const { candidate, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...candidate });
  const [saveMsg, setSaveMsg] = useState("");

  const handleLogout = () => { logout(); navigate("/"); };

  const handleSave = () => {
    updateProfile(profileForm);
    setEditMode(false);
    setSaveMsg("Profile updated successfully!");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const completionItems = [
    { label: "Basic Info", done: !!(candidate.fullName && candidate.phone) },
    { label: "Professional Details", done: !!(candidate.qualification && candidate.experience) },
    { label: "Skills Added", done: !!candidate.skills },
    { label: "Preferred Role", done: !!candidate.preferredRole },
    { label: "Expected Salary", done: !!candidate.expectedSalary },
  ];
  const completion = Math.round((completionItems.filter(i => i.done).length / completionItems.length) * 100);

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <Link to="/"><img src={logo} alt="AVB" /></Link>
        </div>
        <div className="sidebar-avatar">
          <div className="avatar-circle">{candidate.fullName?.[0] || "C"}</div>
          <h3>{candidate.fullName}</h3>
          <p>{candidate.preferredRole || candidate.currentRole || "Candidate"}</p>
          <div className="profile-progress">
            <div className="progress-bar"><div style={{width:`${completion}%`}}></div></div>
            <span>{completion}% Profile Complete</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}><FaUser /> Overview</button>
          <button className={tab === "profile" ? "active" : ""} onClick={() => setTab("profile")}><FaEdit /> My Profile</button>
          <button className={tab === "applications" ? "active" : ""} onClick={() => setTab("applications")}><FaBriefcase /> Applications</button>
          <button className={tab === "notifications" ? "active" : ""} onClick={() => setTab("notifications")}><FaBell /> Notifications</button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        <Link to="/" className="back-site-link">← Back to Website</Link>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="dash-section">
            <h1>Welcome back, {candidate.fullName?.split(" ")[0]}! 👋</h1>
            <p className="dash-subtitle">Here's a summary of your candidate profile and activity.</p>

            <div className="dash-cards">
              <div className="dash-card blue"><div className="dc-num">0</div><div className="dc-label">Applications Sent</div></div>
              <div className="dash-card green"><div className="dc-num">0</div><div className="dc-label">Shortlisted</div></div>
              <div className="dash-card orange"><div className="dc-num">3</div><div className="dc-label">Jobs Available for You</div></div>
              <div className="dash-card purple"><div className="dc-num">{completion}%</div><div className="dc-label">Profile Complete</div></div>
            </div>

            <div className="completion-section">
              <h2>Profile Completion Checklist</h2>
              <div className="checklist">
                {completionItems.map((item, i) => (
                  <div key={i} className={`check-item ${item.done ? "check-done" : ""}`}>
                    <span>{item.done ? "✅" : "⬜"}</span>
                    <span>{item.label}</span>
                    {!item.done && <button onClick={() => setTab("profile")} className="fix-btn">Complete →</button>}
                  </div>
                ))}
              </div>
            </div>

            <div className="recommended-section">
              <h2>Recommended Jobs for You</h2>
              <div className="rec-jobs">
                {sampleJobs.slice(0, 2).map(j => (
                  <div className="rec-job" key={j.id}>
                    <div className="rj-avatar">{j.company[0]}</div>
                    <div className="rj-info"><h4>{j.title}</h4><span>{j.company} · {j.location}</span></div>
                    <Link to="/jobs" className="rj-btn">View →</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <div className="dash-section">
            <div className="section-title-row">
              <h1>My Profile</h1>
              {!editMode ? (
                <button className="edit-btn" onClick={() => setEditMode(true)}><FaEdit /> Edit Profile</button>
              ) : (
                <div style={{display:"flex",gap:"10px"}}>
                  <button className="save-btn" onClick={handleSave}>Save Changes</button>
                  <button className="cancel-btn" onClick={() => { setEditMode(false); setProfileForm({...candidate}); }}>Cancel</button>
                </div>
              )}
            </div>
            {saveMsg && <div className="save-success">{saveMsg}</div>}

            <div className="profile-sections">
              <div className="profile-block">
                <h3>Personal Information</h3>
                <div className="profile-grid">
                  {[
                    { label: "Full Name", key: "fullName", type: "text" },
                    { label: "Email", key: "email", type: "email" },
                    { label: "Phone", key: "phone", type: "tel" },
                    { label: "Date of Birth", key: "dob", type: "date" },
                    { label: "Gender", key: "gender", type: "text" },
                    { label: "City", key: "city", type: "text" },
                  ].map(field => (
                    <div key={field.key} className="profile-field">
                      <label>{field.label}</label>
                      {editMode ? (
                        <input type={field.type} value={profileForm[field.key] || ""} onChange={e => setProfileForm({...profileForm, [field.key]: e.target.value})} />
                      ) : (
                        <span>{candidate[field.key] || <em style={{color:"#aaa"}}>Not provided</em>}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="profile-block">
                <h3>Professional Information</h3>
                <div className="profile-grid">
                  {[
                    { label: "Qualification", key: "qualification", type: "text" },
                    { label: "Total Experience", key: "experience", type: "text" },
                    { label: "Current / Last Role", key: "currentRole", type: "text" },
                    { label: "Preferred Role", key: "preferredRole", type: "text" },
                    { label: "Preferred Location", key: "preferredLocation", type: "text" },
                    { label: "Expected Salary (₹/mo)", key: "expectedSalary", type: "text" },
                  ].map(field => (
                    <div key={field.key} className="profile-field">
                      <label>{field.label}</label>
                      {editMode ? (
                        <input type={field.type} value={profileForm[field.key] || ""} onChange={e => setProfileForm({...profileForm, [field.key]: e.target.value})} />
                      ) : (
                        <span>{candidate[field.key] || <em style={{color:"#aaa"}}>Not provided</em>}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="profile-field" style={{gridColumn:"1/-1"}}>
                  <label>Skills</label>
                  {editMode ? (
                    <textarea rows={2} value={profileForm.skills || ""} onChange={e => setProfileForm({...profileForm, skills: e.target.value})} />
                  ) : (
                    <span>{candidate.skills || <em style={{color:"#aaa"}}>Not provided</em>}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APPLICATIONS */}
        {tab === "applications" && (
          <div className="dash-section">
            <h1>My Applications</h1>
            <p className="dash-subtitle">Track the status of your job applications</p>
            {sampleJobs.length === 0 ? (
              <div className="empty-state"><span>📋</span><p>No applications yet.</p><Link to="/jobs" className="team-btn">Browse Jobs</Link></div>
            ) : (
              <div className="applications-list">
                {sampleJobs.map(job => (
                  <div key={job.id} className="application-card">
                    <div className="app-left">
                      <div className="app-avatar">{job.company[0]}</div>
                      <div>
                        <h4>{job.title}</h4>
                        <span>{job.company} · {job.location}</span>
                        <span className="app-date">Applied: {job.appliedDate}</span>
                      </div>
                    </div>
                    <div className={`app-status ${statusClass(job.status)}`}>
                      {statusIcon(job.status)} {job.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NOTIFICATIONS */}
        {tab === "notifications" && (
          <div className="dash-section">
            <h1>Notifications</h1>
            <div className="notifications-list">
              <div className="notif-card notif-new">
                <span className="notif-dot"></span>
                <div>
                  <p><strong>Welcome to AVB Manpower Solutions!</strong></p>
                  <p>Your candidate profile has been created. Complete your profile to get matched with jobs faster.</p>
                  <span className="notif-time">Just now</span>
                </div>
              </div>
              <div className="notif-card">
                <div>
                  <p><strong>3 New Jobs Match Your Profile</strong></p>
                  <p>We found 3 new openings that match your skills and preferences in Erode &amp; Coimbatore.</p>
                  <span className="notif-time">Today</span>
                </div>
              </div>
              <div className="notif-card">
                <div>
                  <p><strong>Tip: Add your skills to get noticed faster</strong></p>
                  <p>Candidates with complete profiles are 3x more likely to be contacted by our HR consultants.</p>
                  <span className="notif-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateDashboard;
