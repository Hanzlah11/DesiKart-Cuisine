import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'Takeaway Order',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section obsidian-bg">
      <div className="contact-content-wrapper">
        <div className="section-header">
          <h2 className="section-title">
            <span className="text-cream">GET IN</span> <span className="text-red">TOUCH</span> <span className="text-yellow">WITH US</span>
          </h2>
          <p className="section-subtitle">Have a question, feedback, or want to place a custom order? Drop us a line.</p>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: Info & Details */}
          <div className="contact-info-card">
            <h3 className="info-title">DIRECT <span className="text-green">CHANNELS</span></h3>
            <p className="info-desc">
              We love hearing from our patrons. Reach out through any of our channels or visit our kitchen for fresh traditional aromas.
            </p>

            <div className="info-items">
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <span className="info-label">Phone & WhatsApp</span>
                  <strong className="text-cream">+92 (300) 1234567</strong>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <span className="info-label">Email Support</span>
                  <strong className="text-yellow">support@desikartcuisine.com</strong>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🕒</span>
                <div>
                  <span className="info-label">Kitchen Timings</span>
                  <strong className="text-green">Mon–Thu: 12 PM - 11 PM | Fri–Sun: 8 AM - 12 AM</strong>
                </div>
              </div>
            </div>

            <div className="contact-signature">
              <span className="text-yellow">Desi Swaad, Dil Se.</span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="form-success-message">
                <h3 className="text-green">MESSAGE RECEIVED!</h3>
                <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  className="btn-reset" 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', serviceType: 'Takeaway Order', message: '' }); }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-title">SEND US A <span className="text-yellow">MESSAGE</span></h3>
                
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. Mohib Sardar" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. +92 300 0000000" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceType">Inquiry Type</label>
                  <select 
                    id="serviceType" 
                    name="serviceType" 
                    value={formData.serviceType} 
                    onChange={handleChange}
                  >
                    <option value="Takeaway Order">Takeaway Order</option>
                    <option value="Family Deal Inquiry">Family Deal Inquiry</option>
                    <option value="Catering / Bulk">Catering / Bulk Order</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    placeholder="Type your message or special order requests here..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  SUBMIT MESSAGE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;