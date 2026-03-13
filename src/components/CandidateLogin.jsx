import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const CandidateLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const db = JSON.parse(localStorage.getItem("avb_candidates_db") || "[]");
      const candidate = db.find(c => c.email === form.email && c.password === form.password);
      if (candidate) {
        login(candidate);
        navigate("/candidate/dashboard");
      } else {
        setError("Invalid email or password. Please check your credentials.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="auth-page login-page">
      <div className="login-container">
        <div className="login-left">
          <Link to="/"><img src={logo} alt="AVB" className="auth-logo" /></Link>
          <h1>Candidate Login Portal</h1>
          <p>Access your profile, track applications, and discover new opportunities.</p>
          <div className="login-features">
            <div className="lf-item"><span>🎯</span><span>View matched job openings</span></div>
            <div className="lf-item"><span>📋</span><span>Manage your application status</span></div>
            <div className="lf-item"><span>👤</span><span>Update your profile & resume</span></div>
            <div className="lf-item"><span>🔔</span><span>Get notified by HR consultants</span></div>
          </div>
          <div className="login-back"><Link to="/">← Back to Website</Link></div>
        </div>

        <div className="login-right">
          <div className="login-form-card">
            <h2>Welcome Back</h2>
            <p>Login to your AVB candidate account</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
              </div>
              <button type="submit" className="team-btn auth-submit-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login to Portal →"}
              </button>
            </form>

            <div className="auth-divider"><span>Don't have an account?</span></div>
            <Link to="/candidate/register" className="register-link-btn">Create Free Account →</Link>
            <p className="auth-note">Are you an employer? <a href="mailto:hravbms@gmail.com">Contact us directly</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateLogin;
