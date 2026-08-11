import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Contact.css';

const Contact = ({ currentUser, userData, onOpenAuth }) => {
  const [serviceType, setServiceType] = useState('Takeaway Order');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // If user is not logged in, block submission and prompt for auth
    if (!currentUser || !userData) {
      setErrorMsg('Please sign in or register to send an inquiry.');
      onOpenAuth();
      return;
    }

    if (!message.trim()) {
      setErrorMsg('Please enter your message.');
      return;
    }

    setLoading(true);

    try {
      // Save the inquiry directly to Firestore
      await addDoc(collection(db, "inquiries"), {
        userId: currentUser.uid,
        name: userData.name || 'Anonymous',
        phone: userData.phone || 'Not Provided',
        email: currentUser.email || 'No Email',
        serviceType: serviceType,
        message: message.trim(),
        createdAt: serverTimestamp(),
        status: 'Unread'
      });

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setErrorMsg('Failed to send message. Please try again later.');
      console.error("Error saving inquiry:", err);
    }
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
                  <strong className="text-cream">+92 311 50 77779</strong>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <span className="info-label">Email Support</span>
                  <a 
                    href="mailto:desikartcuisine@gmail.com" 
                    className="text-yellow" 
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    desikartcuisine.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🕒</span>
                <div>
                  <span className="info-label">Kitchen Timings</span>
                  <strong className="text-green" style={{ display: 'block', lineHeight: '1.4' }}>
                    Mon–Thu: 8 AM - 10 PM<br />
                    Fri: 8 AM - 11 AM | 3 PM - 11 PM<br />
                    Sat–Sun: 8 AM - 11 PM
                  </strong>
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
                <h3 className="text-green">MESSAGE SAVED!</h3>
                <p>Thank you for reaching out, {userData?.name}. Your message has been saved and our team will get back to you shortly.</p>
                <button 
                  className="btn-reset" 
                  onClick={() => { setSubmitted(false); setMessage(''); }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-title">SEND US A <span className="text-yellow">MESSAGE</span></h3>
                
                {errorMsg && (
                  <p style={{ background: 'rgba(210, 50, 20, 0.15)', border: '1px solid #D23214', color: '#D23214', padding: '0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                    {errorMsg}
                  </p>
                )}

                {currentUser && userData ? (
                  <div style={{ background: 'rgba(50, 210, 20, 0.08)', border: '1px solid rgba(50, 210, 20, 0.2)', padding: '0.8rem', borderRadius: '6px', fontSize: '0.85rem', color: '#32D214' }}>
                    ✅ Sending as <strong>{userData.name}</strong> ({userData.phone})
                  </div>
                ) : (
                  <div style={{ background: 'rgba(244, 186, 63, 0.08)', border: '1px solid rgba(244, 186, 63, 0.2)', padding: '0.8rem', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--logo-yellow)' }}>
                    🔒 Please <button type="button" onClick={onOpenAuth} style={{ background: 'none', border: 'none', color: 'var(--logo-yellow)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', padding: 0 }}>sign in or register</button> to send a message.
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="serviceType">Inquiry Type</label>
                  <select 
                    id="serviceType" 
                    name="serviceType" 
                    value={serviceType} 
                    onChange={(e) => setServiceType(e.target.value)}
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
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                    placeholder="Type your message or special order requests here..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'SAVING MESSAGE...' : 'SUBMIT MESSAGE'}
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