import React, { useEffect, useRef } from 'react';
import './Footer.css';

const Footer = () => {
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

    class SmokeParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.radius = Math.random() * 100 + 70;
        this.speedY = Math.random() * 0.35 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.06 + 0.01;
        this.fadeSpeed = Math.random() * 0.0003 + 0.0001;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.radius += 0.15;
        this.opacity -= this.fadeSpeed;
        if (this.y < -this.radius || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(255, 249, 230, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(40, 25, 20, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
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
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 2 + 0.6;
        this.speedY = Math.random() * 0.9 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.fadeSpeed = Math.random() * 0.004 + 0.001;
        this.color = Math.random() > 0.5 ? '#F4BA3F' : '#D23214';
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.opacity -= this.fadeSpeed;
        if (this.y < -10 || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const smokeParticles = Array.from({ length: 15 }, () => new SmokeParticle());
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

  return (
    <footer id="footer" className="footer-section">
      <canvas ref={canvasRef} className="footer-bg-canvas" />

      <div className="footer-content-wrapper">
        <div className="footer-grid">
          
          {/* Col 1: Brand & Bio */}
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

          {/* Col 2: Quick Links */}
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

          {/* Col 3: Hours & Operations */}
          <div className="footer-col">
            <h4 className="footer-heading">KITCHEN <span className="text-green">HOURS</span></h4>
            <ul className="footer-info-list">
              <li><span>Monday – Thursday:</span> <strong className="text-cream">08:00 AM – 10:00 PM</strong></li>
              <li><span>Friday – Saturday:</span> <strong className="text-yellow">08:00 AM – 11:00 PM</strong></li>
              <li><span className="text-red">Breakfast Specials:</span> Available Weekends</li>
            </ul>
          </div>

          {/* Col 4: Contact & Orders */}
          <div className="footer-col">
            <h4 className="footer-heading">CONTACT & <span className="text-red">ORDERS</span></h4>
            <ul className="footer-info-list">
              <li><span>Phone / WhatsApp:</span> <strong className="text-cream">+92 331 6667054</strong></li>
              <li><span>Delivery:</span> <strong className="text-yellow">Doorstep & Takeaway</strong></li>
              <li><span>Inquiries:</span> <strong className="text-cream">info@desikartcuisine.com</strong></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DesiKart Cuisine. All rights reserved.</p>
          <p className="footer-craft">Crafted with tradition, passion, and fire.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;