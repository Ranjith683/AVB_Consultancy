import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLinkedinIn, FaClock } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "employer", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("Please fill all required fields."); return; }
    // Save to localStorage as mock DB
    const inquiries = JSON.parse(localStorage.getItem("avb_inquiries") || "[]");
    inquiries.push({ ...form, id: Date.now(), submittedAt: new Date().toISOString() });
    localStorage.setItem("avb_inquiries", JSON.stringify(inquiries));
    setSubmitted(true);
    setError("");
  };

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-badge">We're Here to Help</span>
          <h1>Contact Us</h1>
          <p>Reach out to our team in Erode — we typically respond within 24 hours</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Whether you're an employer looking for talent or a candidate seeking your next opportunity, our team is ready to help.</p>

            <div className="contact-cards">
              <div className="contact-info-card">
                <FaMapMarkerAlt className="ci-icon" />
                <div>
                  <strong>Office Address</strong>
                  <p>AVB Manpower Solutions<br />No. 45, Perundurai Road<br />Erode - 638011<br />Tamil Nadu, India</p>
                </div>
              </div>
              <div className="contact-info-card">
                <FaPhone className="ci-icon" />
                <div>
                  <strong>Phone Numbers</strong>
                  <p><a href="tel:+917418615555">+91 74186 1555</a></p>
                  <p><a href="tel:+919894627555">+91 98946 27555</a></p>
                </div>
              </div>
              <div className="contact-info-card">
                <FaEnvelope className="ci-icon" />
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:hravbms@gmail.com">hravbms@gmail.com</a></p>
                  <p><a href="mailto:avbmanpowersolutions@gmail.com">avbmanpowersolutions@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-info-card">
                <FaClock className="ci-icon" />
                <div>
                  <strong>Working Hours</strong>
                  <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <a href="https://wa.me/918870101265" target="_blank" rel="noreferrer" className="social-btn whatsapp"><FaWhatsapp /> WhatsApp</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="social-btn linkedin"><FaLinkedinIn /> LinkedIn</a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name:"",email:"",phone:"",type:"employer",message:"" }); }} className="team-btn">Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send us a Message</h2>
                {error && <p className="form-error">{error}</p>}
                <div className="form-group">
                  <label>I am a *</label>
                  <div className="radio-group">
                    <label><input type="radio" name="type" value="employer" checked={form.type==="employer"} onChange={e=>setForm({...form,type:e.target.value})} /> Employer</label>
                    <label><input type="radio" name="type" value="candidate" checked={form.type==="candidate"} onChange={e=>setForm({...form,type:e.target.value})} /> Candidate</label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea rows={5} placeholder="Tell us about your requirement..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
                </div>
                <button type="submit" className="team-btn" style={{width:"100%",justifyContent:"center"}}>Send Message →</button>
              </form>
            )}
          </div>
        </div>

        {/* Map Embed */}
        <div className="map-wrap">
          <iframe
            title="AVB Manpower Solutions - Erode Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31377.09!2d77.7172!3d11.3410!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f2579bd3b9f%3A0x5c22a62cb9abb9e9!2sErode%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
            width="100%" height="350" style={{border:0,borderRadius:"12px"}} allowFullScreen loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;
