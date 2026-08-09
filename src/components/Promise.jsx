import React, { useEffect, useRef } from 'react';
import './Promise.css';

const promiseData = [
  {
    id: 1,
    title: "Halal Ingredients",
    desc: "Carefully sourced ingredients you can trust, meeting strict quality and faith standards.",
    icon: "🥩",
    badgeColor: "green"
  },
  {
    id: 2,
    title: "Authentic Recipes",
    desc: "Traditional culinary heritage passed down through generations, bringing true home-cooked taste.",
    icon: "📜",
    badgeColor: "yellow"
  },
  {
    id: 3,
    title: "Freshly Cooked",
    desc: "Prepared fresh upon order, straight from our fiery handi and grill to your table.",
    icon: "🔥",
    badgeColor: "red"
  },
  {
    id: 4,
    title: "Hygienic Preparation",
    desc: "Strict kitchen sanitization and clean handling protocols for your ultimate peace of mind.",
    icon: "✨",
    badgeColor: "green"
  },
  {
    id: 5,
    title: "Honest Value",
    desc: "Generous portions packed with rich flavors, offering premium quality at fair prices.",
    icon: "⚖️",
    badgeColor: "yellow"
  },
  {
    id: 6,
    title: "Trust Before Profit",
    desc: "We value long-term customer trust above short-term gain in every single meal we serve.",
    icon: "🤝",
    badgeColor: "red"
  }
];

const Promise = () => {
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
    const emberParticles = Array.from({ length: 35 }, () => new EmberParticle());

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
    <section id="promise" className="promise-section">
      <canvas ref={canvasRef} className="promise-bg-canvas" />

      <div className="promise-content-wrapper">
        <div className="section-header">
          <h2 className="section-title">
            <span className="text-cream">THE</span> <span className="text-red">DESIKART</span> <span className="text-green">PROMISE</span>
          </h2>
          <p className="section-subtitle">Our commitment to quality, authenticity, and your satisfaction</p>
        </div>

        <div className="promise-grid">
          {promiseData.map((item, index) => (
            <div 
              key={item.id} 
              className={`promise-card card-${item.badgeColor}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`promise-icon-wrap icon-${item.badgeColor}`}>
                <span className="promise-icon">{item.icon}</span>
              </div>
              <h3 className="promise-card-title">{item.title}</h3>
              <p className="promise-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promise;