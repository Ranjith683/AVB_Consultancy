import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const CandidateRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", dob: "", gender: "",
    city: "", state: "Tamil Nadu",
    qualification: "", experience: "", currentRole: "", skills: "",
    preferredRole: "", preferredLocation: "", expectedSalary: "",
    password: "", confirmPassword: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleNext = () => {
    if (step === 1) {
      if (!form.fullName || !form.email || !form.phone) { setError("Please fill all required fields."); return; }
      if (!/^\S+@\S+\.\S+$/.test(form.email)) { setError("Invalid email address."); return; }
    }
    if (step === 2) {
      if (!form.qualification || !form.experience) { setError("Please fill all required fields."); return; }
    }
    if (step === 3) {
      if (!form.password || form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
      if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
      // Check if email already exists
      const db = JSON.parse(localStorage.getItem("avb_candidates_db") || "[]");
      if (db.find(c => c.email === form.email)) { setError("Email already registered. Please login."); return; }
      // Register
      const newCandidate = {
        id: Date.now().toString(),
        ...form,
        registeredAt: new Date().toISOString(),
        profileComplete: 60,
        appliedJobs: [],
        status: "Active",
      };
      db.push(newCandidate);
      localStorage.setItem("avb_candidates_db", JSON.stringify(db));
      login(newCandidate);
      navigate("/candidate/dashboard");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const steps = ["Personal Info", "Professional Info", "Set Password"];

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        <div className="auth-brand">
          <Link to="/"><img src={logo} alt="AVB" className="auth-logo" /></Link>
          <h1>Join AVB Manpower Solutions</h1>
          <p>Create your candidate profile and access exclusive job opportunities across Tamil Nadu</p>
          <div className="auth-bullets">
            <div>✓ Free candidate registration</div>
            <div>✓ Access 100+ job listings</div>
            <div>✓ Direct contact with employers</div>
            <div>✓ Track your applications</div>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="step-indicator">
            {steps.map((s, i) => (
              <div key={i} className={`step-dot ${i + 1 <= step ? "step-active" : ""}`}>
                <span>{i + 1}</span>
                <label>{s}</label>
              </div>
            ))}
          </div>

          {error && <div className="auth-error">{error}</div>}

          {step === 1 && (
            <div className="form-fields">
              <h2>Personal Information</h2>
              <div className="form-row">
                <div className="form-group"><label>Full Name *</label><input type="text" placeholder="Your full name" value={form.fullName} onChange={set("fullName")} /></div>
                <div className="form-group"><label>Date of Birth</label><input type="date" value={form.dob} onChange={set("dob")} /></div>
              </div>
              <div className="form-group"><label>Email Address *</label><input type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} /></div>
              <div className="form-row">
                <div className="form-group"><label>Phone Number *</label><input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set("phone")} /></div>
                <div className="form-group"><label>Gender</label>
                  <select value={form.gender} onChange={set("gender")}>
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>City</label><input type="text" placeholder="Your city" value={form.city} onChange={set("city")} /></div>
                <div className="form-group"><label>State</label><input type="text" placeholder="Tamil Nadu" value={form.state} onChange={set("state")} /></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-fields">
              <h2>Professional Details</h2>
              <div className="form-row">
                <div className="form-group"><label>Highest Qualification *</label>
                  <select value={form.qualification} onChange={set("qualification")}>
                    <option value="">Select</option>
                    <option>10th Pass</option><option>12th Pass</option><option>ITI</option>
                    <option>Diploma</option><option>B.E / B.Tech</option><option>BCA / BSc</option>
                    <option>B.Com / BBA</option><option>MBA</option><option>Any Degree</option>
                  </select>
                </div>
                <div className="form-group"><label>Total Experience *</label>
                  <select value={form.experience} onChange={set("experience")}>
                    <option value="">Select</option>
                    <option>Fresher (0 years)</option><option>Less than 1 year</option>
                    <option>1-2 years</option><option>2-4 years</option><option>4-6 years</option>
                    <option>6-10 years</option><option>10+ years</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Current / Last Job Role</label><input type="text" placeholder="e.g. Production Operator, HR Executive" value={form.currentRole} onChange={set("currentRole")} /></div>
              <div className="form-group"><label>Key Skills</label><textarea rows={2} placeholder="e.g. CNC Operation, MS Excel, Payroll Processing, Recruitment..." value={form.skills} onChange={set("skills")} /></div>
              <div className="form-row">
                <div className="form-group"><label>Preferred Job Role</label><input type="text" placeholder="Role you're looking for" value={form.preferredRole} onChange={set("preferredRole")} /></div>
                <div className="form-group"><label>Preferred Location</label><input type="text" placeholder="e.g. Erode, Coimbatore" value={form.preferredLocation} onChange={set("preferredLocation")} /></div>
              </div>
              <div className="form-group"><label>Expected Monthly Salary (₹)</label><input type="text" placeholder="e.g. 25000" value={form.expectedSalary} onChange={set("expectedSalary")} /></div>
            </div>
          )}

          {step === 3 && (
            <div className="form-fields">
              <h2>Create Password</h2>
              <p style={{color:"#666",marginBottom:"20px"}}>Set a secure password to protect your candidate account.</p>
              <div className="form-group"><label>Password *</label><input type="password" placeholder="Minimum 6 characters" value={form.password} onChange={set("password")} /></div>
              <div className="form-group"><label>Confirm Password *</label><input type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={set("confirmPassword")} /></div>
            </div>
          )}

          <div className="auth-btn-row">
            {step > 1 && <button className="back-btn" onClick={() => { setStep(step - 1); setError(""); }}>← Back</button>}
            <button className="team-btn auth-submit-btn" onClick={handleNext}>
              {step === 3 ? "Create Account →" : "Next →"}
            </button>
          </div>

          <p className="auth-switch">Already have an account? <Link to="/candidate/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegister;
