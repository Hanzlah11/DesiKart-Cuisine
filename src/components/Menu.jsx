import React, { useState, useEffect, useRef } from 'react';
import { menuCategories, menuItems, formatPrice } from '../data/menu';
import './Menu.css';

const Menu = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const canvasRef = useRef(null);

  // Integrated Smoke & Ember Particle Engine for Menu BG
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
        this.color = Math.random() > 0.3 ? '#F4BA3F' : '#D23214';
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

    const smokeParticles = Array.from({ length: 18 }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: 40 }, () => new EmberParticle());

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

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="menu-section">
      {/* Background Smoke & Ember Canvas */}
      <canvas ref={canvasRef} className="menu-bg-canvas" />

      <div className="menu-content-wrapper">
        <div className="section-header">
          <h2 className="section-title">OUR <span className="text-yellow">MENU</span></h2>
          <p className="section-subtitle">Explore our authentic categories and traditional specialties</p>
        </div>

        {/* Cinematic Sticky Sub-Navbar for Categories */}
        <div className="menu-sub-navbar">
          <div className="sub-nav-container">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                className={`sub-nav-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid with Animations */}
        <div className="menu-grid" key={activeCategory}>
          {filteredItems.map((dish, index) => (
            <div 
              key={dish.id} 
              className="dish-card animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Full Image at Top */}
              <div className="dish-img-container">
                {dish.badge && (
                  <span className={`dish-badge ${dish.badge.toLowerCase().includes('special') || dish.badge.toLowerCase().includes('signature') ? 'yellow' : 'red'}`}>
                    {dish.badge}
                  </span>
                )}
                <img src={dish.image} alt={dish.name} />
                <span className="serving-pill">{dish.serving}</span>
              </div>

              {/* Info Card Below Image */}
              <div className="dish-info-card">
                <span className="dish-category-label">{dish.categoryLabel}</span>
                <h3 className="dish-title">{dish.name}</h3>
                <p className="dish-desc">{dish.description}</p>
                <div className="dish-footer">
                  <span className="dish-price">{formatPrice(dish.price)}</span>
                  <button 
                    className="add-cart-btn"
                    onClick={() => onAddToCart && onAddToCart(dish)}
                  >
                    ADD TO ORDER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;