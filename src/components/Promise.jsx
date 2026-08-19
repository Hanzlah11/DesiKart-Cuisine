import React, { useEffect, useRef } from 'react';
import './Promise.css';

const promiseData = [
  {
    id: 1,
    title: "Halal Ingredients",
    desc: "Carefully sourced ingredients you can trust, meeting strict quality and faith standards.",
    badgeColor: "green",
    imgSrc: "/images/promises/halal.png"
  },
  {
    id: 2,
    title: "Authentic Recipes",
    desc: "Traditional culinary heritage passed down through generations, bringing true home-cooked taste.",
    badgeColor: "yellow",
    imgSrc: "/images/promises/recipe.png"
  },
  {
    id: 3,
    title: "Freshly Cooked",
    desc: "Prepared fresh upon order, straight from our fiery handi and grill to your table.",
    badgeColor: "red",
    imgSrc: "/images/promises/fresh.png"
  },
  {
    id: 4,
    title: "Hygienic Preparation",
    desc: "Strict kitchen sanitization and clean handling protocols for your ultimate peace of mind.",
    badgeColor: "green",
    imgSrc: "/images/promises/hygiene.png"
  },
  {
    id: 5,
    title: "Honest Value",
    desc: "Generous portions packed with rich flavors, offering premium quality at fair prices.",
    badgeColor: "yellow",
    imgSrc: "/images/promises/value.png"
  },
  {
    id: 6,
    title: "Trust Before Profit",
    desc: "We value long-term customer trust above short-term gain in every single meal we serve.",
    badgeColor: "red",
    imgSrc: "/images/promises/trust.png"
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
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="promise-icon-wrap">
                <img src={item.imgSrc} alt={item.title} />
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