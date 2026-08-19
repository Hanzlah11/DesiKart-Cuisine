import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
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
        this.opacity = Math.random() * 0.05 + 0.015;
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
      smokeParticles.forEach((s) => { s.update(); s.draw(); });
      emberParticles.forEach((e) => { e.update(); e.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-banner-backdrop">
        <img 
          src="/images/banners/desikart-main-banner.jpeg" 
          alt="DesiKart Cinematic Banner" 
          className="hero-banner-img" 
        />
        <div className="hero-banner-overlay"></div>
      </div>

      <canvas ref={canvasRef} className="hero-bg-canvas" />

      <div className="hero-content-wrapper">
        <div className="hero-text-content">
          <div className="hero-tagline-group">
            <span className="hero-brand-tag">
              DESI<span className="text-red">KART</span>
            </span>
            <span className="hero-divider">|</span>
            <span className="hero-subtag">Traditional Recipes • Fresh Ingredients</span>
          </div>

          <h1 className="hero-main-title">
            <span className="text-cream">AUTHENTIC</span> <span className="text-yellow">DESI</span><br />
            <span className="text-green">FLAVORS,</span><br />
            <span className="text-red">DELIVERED</span> <span className="text-cream">FRESH.</span>
          </h1>

          <p className="hero-description">
            Experience the true taste of home-cooked perfection, crafted with tradition, passion, and rich aromatic spices straight from the grill.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="hero-btn-primary">
              EXPLORE MENU
            </a>
            <a href="#story" className="hero-btn-secondary">
              OUR STORY
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;