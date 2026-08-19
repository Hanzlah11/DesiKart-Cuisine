import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const canvasRef = useRef(null);

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

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
          // Light Obsidian: Silvery Misty Slate & Warm Amber Haze
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

  const handleSendFooterEmail = async (e) => {
    e.preventDefault();
    if (!emailMessage.trim()) return;

    setEmailLoading(true);

    const formattedBody = `Dear DesiKart\n\nHello from Valued Patron "${emailMessage.trim()}"\n\nregards,\nValued Patron\nNot Provided\nVia Footer Inquiry`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "0c2452b6-1e8c-4cfb-af5b-b69543c2badd",
          subject: `New Footer Support Inquiry`,
          name: "Valued Patron",
          email: "desikartcuisine@gmail.com",
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
    <footer id="footer" className="footer-section">
      <canvas ref={canvasRef} className="footer-bg-canvas" />

      <div className="footer-content-wrapper">
        <div className="footer-grid">
          
          <div className="footer-col brand-col">
            <div className="footer-brand-group">
              <img src="/images/brand/desikart-logo.png" alt="Desikart Logo" className="footer-logo" />
              <span className="footer-brand-text">DESI<span className="text-red">KART</span></span>
            </div>
            <p className="footer-bio">
              Authentic Pakistani food and traditional recipes prepared with care, fresh ingredients, and true home-cooked flavor.
            </p>
            <div className="footer-signature-tag">
              <span className="text-yellow">Desi Swaad, Dil Se.</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">NAVIGATION</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#promise">The Promise</a></li>
              <li><a href="#story">Our Story</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">KITCHEN <span className="text-green">HOURS</span></h4>
            <ul className="footer-info-list">
              <li><span>Mon – Thu:</span> <strong className="text-cream">08:00 AM – 10:00 PM</strong></li>
              <li><span>Fri:</span> <strong className="text-yellow">08:00 AM – 11:00 AM | 3 PM – 11 PM</strong></li>
              <li><span>Sat – Sun:</span> <strong className="text-cream">08:00 AM – 11:00 PM</strong></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">CONTACT & <span className="text-red">ORDERS</span></h4>
            <ul className="footer-info-list">
              <li><span>Phone / WhatsApp:</span> <strong className="text-cream">+92 311 50 77779</strong></li>
              <li><span>Delivery:</span> <strong className="text-yellow">Doorstep & Takeaway</strong></li>
              <li>
                <span>Inquiries:</span>{' '}
                <button 
                  type="button"
                  onClick={() => { setEmailSentSuccess(false); setEmailMessage(''); setEmailModalOpen(true); }}
                  className="text-cream"
                  style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline', display: 'inline' }}
                >
                  info@desikartcuisine.com
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DesiKart Cuisine. All rights reserved.</p>
          <p className="footer-craft">Crafted with tradition, passion, and fire.</p>
        </div>
      </div>

      {emailModalOpen && (
        <div className="footer-modal-backdrop" onClick={() => setEmailModalOpen(false)}>
          <div className="footer-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="footer-modal-title">
              FOOTER SUPPORT <span className="text-yellow">INQUIRY</span>
            </h3>

            {emailSentSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--accent-green)', fontFamily: 'var(--font-prime)' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 400 }}>✨ EMAIL SENT TO GMAIL!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>Your message has been delivered straight to DesiKart's inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSendFooterEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="footerEmailMsg" style={{ fontFamily: 'var(--font-prime)', color: 'var(--logo-cream)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Your Message
                  </label>
                  <textarea 
                    id="footerEmailMsg"
                    rows="4"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    required
                    placeholder="Type your message here..."
                    className="footer-modal-textarea"
                  ></textarea>
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
    </footer>
  );
};

export default Footer;