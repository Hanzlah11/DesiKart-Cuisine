import React, { useState, useEffect, useRef } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../firebase';
import './Contact.css';

const Contact = ({ currentUser, userData, onOpenAuth }) => {
  const [serviceType, setServiceType] = useState('Takeaway Order');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const isLightObsidian = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      return theme === 'light' || theme === 'cardamom' || theme === 'light-obsidian';
    };

    class SmokeParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80;
        this.radius = Math.random() * 110 + 75;
        this.speedY = Math.random() * 0.35 + 0.12;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.04 + 0.015;
        this.fadeSpeed = Math.random() * 0.00035 + 0.00012;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.radius += 0.16;
        this.opacity -= this.fadeSpeed;
        if (this.y < -this.radius || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        const light = isLightObsidian();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

        if (light) {
          // Light Obsidian: Silvery Misty Slate & Warm Saffron Smoke
          gradient.addColorStop(0, `rgba(194, 203, 197, ${this.opacity * 1.5})`);
          gradient.addColorStop(0.45, `rgba(255, 196, 77, ${this.opacity * 0.7})`);
          gradient.addColorStop(1, 'rgba(43, 48, 45, 0)');
        } else {
          // Midnight Obsidian: Deep Volcanic Gold & Chili
          gradient.addColorStop(0, `rgba(244, 186, 63, ${this.opacity})`);
          gradient.addColorStop(0.5, `rgba(210, 50, 20, ${this.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class EmberParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 40;
        this.size = Math.random() * 2.2 + 0.7;
        this.speedY = Math.random() * 0.85 + 0.35;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.fadeSpeed = Math.random() * 0.004 + 0.001;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.012) * 0.35;
        this.opacity -= this.fadeSpeed;
        if (this.y < -10 || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        const light = isLightObsidian();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const color = light
          ? (Math.random() > 0.4 ? '#FFC44D' : '#E63B1C')
          : (Math.random() > 0.4 ? '#F4BA3F' : '#D23214');

        ctx.fillStyle = color;
        ctx.shadowBlur = light ? 5 : 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
      }
    }

    const smokeParticles = Array.from({ length: 16 }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: 30 }, () => new EmberParticle());

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      smokeParticles.forEach(s => { s.update(); s.draw(); });
      emberParticles.forEach(e => { e.update(); e.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

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
    <section id="contact" className="contact-section">
      <canvas ref={canvasRef} className="contact-bg-canvas" />

      <div className="contact-content-wrapper">
        <div className="section-header">
          <h2 className="section-title">
            <span className="text-cream">GET IN</span> <span className="text-red">TOUCH</span> <span className="text-yellow">WITH US</span>
          </h2>
          <p className="section-subtitle">Have a question, feedback, or want to place a custom order? Drop us a line.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card anim-contact-info">
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
                  <button 
                    type="button"
                    onClick={handleOpenEmailModal}
                    className="text-yellow" 
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline', display: 'inline-block' }}
                  >
                    info@desikartcuisine.com
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

          <div className="contact-form-card anim-contact-form">
            {submitted ? (
              <div className="form-success-message">
                <h3 className="text-green">MESSAGE SAVED!</h3>
                <p>Thank you for reaching out, {userData?.name}. Your message has been saved and our team will get back to you shortly.</p>
                <button 
                  type="button"
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
                  <p style={{ background: 'rgba(210, 50, 20, 0.15)', border: '1px solid var(--logo-red)', color: 'var(--logo-red)', padding: '0.6rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                    {errorMsg}
                  </p>
                )}

                {currentUser && userData ? (
                  <div style={{ background: 'rgba(34, 163, 82, 0.08)', border: '1px solid rgba(34, 163, 82, 0.25)', padding: '0.8rem', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--accent-green)' }}>
                    ✅ Sending as <strong>{userData.name}</strong> ({userData.phone})
                  </div>
                ) : (
                  <div style={{ background: 'rgba(184, 123, 20, 0.08)', border: '1px solid rgba(184, 123, 20, 0.25)', padding: '0.8rem', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--logo-yellow)' }}>
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

      {emailModalOpen && (
        <div className="contact-modal-backdrop" onClick={() => setEmailModalOpen(false)}>
          <div className="contact-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="contact-modal-title">
              EMAIL SUPPORT <span className="text-yellow">INQUIRY</span>
            </h3>

            {emailSentSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--accent-green)', fontFamily: 'var(--font-prime)' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 400 }}>✨ EMAIL SENT TO GMAIL!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>Your message has been delivered straight to DesiKart's inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSendCustomEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(34, 163, 82, 0.08)', border: '1px solid rgba(34, 163, 82, 0.25)', padding: '0.7rem', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--accent-green)' }}>
                  👤 Sending as: <strong>{userData?.name}</strong> ({currentUser?.email})
                </div>

                <div className="form-group">
                  <label htmlFor="emailCustomMsg">Your Message</label>
                  <textarea 
                    id="emailCustomMsg"
                    rows="4"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    required
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <div className="contact-preview-box">
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
                    style={{ background: 'transparent', border: '1px solid var(--border-dark)', color: 'var(--text-muted)', padding: '0.85rem 1.4rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-prime)', fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}
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