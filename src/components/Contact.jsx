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

  // Email Modal State
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

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

  const handleOpenEmailModal = (e) => {
    e.preventDefault();
    if (!currentUser || !userData) {
      onOpenAuth();
      return;
    }
    setEmailSentSuccess(false);
    setEmailMessage('');
    setEmailModalOpen(true);
  };

  const handleSendCustomEmail = async (e) => {
    e.preventDefault();
    if (!emailMessage.trim()) return;

    setEmailLoading(true);

    // Construct the formatted message body requested
    const formattedBody = `Dear DesiKart\n\nHello from ${userData.name} "${emailMessage.trim()}"\n\nregards,\n${userData.name}\n${userData.phone || 'Not Provided'}\n${currentUser.email}`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "0c2452b6-1e8c-4cfb-af5b-b69543c2badd",
          subject: `New Email Support Inquiry from ${userData.name}`,
          name: userData.name,
          email: currentUser.email,
          message: formattedBody
        })
      });

      const result = await response.json();
      setEmailLoading(false);

      if (result.success) {
        setEmailSentSuccess(true);
        setTimeout(() => {
          setEmailModalOpen(false);
          setEmailSentSuccess(false);
          setEmailMessage('');
        }, 2500);
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (err) {
      setEmailLoading(false);
      console.error("Web3Forms error:", err);
      alert("An error occurred. Please check your internet connection.");
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
                  <strong className="text-cream">+92 0331 6667054</strong>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <span className="info-label">Email Support</span>
                  <button 
                    onClick={handleOpenEmailModal}
                    className="text-yellow" 
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline', display: 'inline-block' }}
                  >
                    desikartcuisine.com
                  </button>
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

      {/* Custom Email Modal Popup with Web3Forms */}
      {emailModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#141414',
            border: '1px solid var(--border-gold)',
            borderRadius: '20px',
            padding: '2.5rem',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            position: 'relative'
          }}>
            <h3 style={{ fontFamily: 'var(--font-prime)', color: 'var(--logo-cream)', fontSize: '1.6rem' }}>
              EMAIL SUPPORT <span className="text-yellow">INQUIRY</span>
            </h3>

            {emailSentSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: '#32D214', fontFamily: 'var(--font-prime)' }}>
                <h3>✨ EMAIL SENT TO GMAIL!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>Your message has been delivered straight to DesiKart's inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSendCustomEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(50, 210, 20, 0.08)', border: '1px solid rgba(50, 210, 20, 0.2)', padding: '0.7rem', borderRadius: '6px', fontSize: '0.8rem', color: '#32D214' }}>
                  👤 Sending as: <strong>{userData?.name}</strong> ({currentUser?.email})
                </div>

                <div className="form-group">
                  <label htmlFor="emailCustomMsg" style={{ fontFamily: 'var(--font-prime)', color: 'var(--logo-cream)', fontSize: '0.9rem' }}>Your Message</label>
                  <textarea 
                    id="emailCustomMsg"
                    rows="4"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    required
                    placeholder="Type your message here..."
                    style={{ background: 'rgba(10,10,10,0.6)', border: '1px solid var(--border-dark)', borderRadius: '8px', padding: '0.85rem', color: '#fff', width: '100%', fontFamily: 'var(--font-body)' }}
                  ></textarea>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', border: '1px dashed var(--border-dark)' }}>
                  <strong>Template Format Sent to Gmail:</strong><br />
                  Dear DesiKart<br />
                  Hello from {userData?.name} "{emailMessage || '...'}"<br />
                  regards,<br />
                  {userData?.name}<br />
                  {userData?.phone || 'Not Provided'}<br />
                  {currentUser?.email}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    style={{ flex: 1, margin: 0 }}
                    disabled={emailLoading}
                  >
                    {emailLoading ? 'SENDING...' : 'SEND TO GMAIL'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEmailModalOpen(false)}
                    style={{ background: 'transparent', border: '1px solid var(--border-dark)', color: 'var(--text-muted)', padding: '1rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-prime)' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;