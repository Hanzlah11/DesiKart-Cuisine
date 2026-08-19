import React, { useState, useEffect, useRef } from 'react';
import { menuCategories, menuItems, formatPrice } from '../data/menu';
import DishDetailModal from './DishDetailModal';
import './Menu.css';

const Menu = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDish, setSelectedDish] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const canvasRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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
          gradient.addColorStop(0, `rgba(194, 203, 197, ${this.opacity * 1.5})`);
          gradient.addColorStop(0.45, `rgba(255, 196, 77, ${this.opacity * 0.7})`);
          gradient.addColorStop(1, 'rgba(43, 48, 45, 0)');
        } else {
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

  const activeCategoryLabel = menuCategories.find(c => c.id === activeCategory)?.label || 'All Specialties';

  // Specific categorized sections to render when "All" is active
  const sectionsToRender = activeCategory === 'all'
    ? menuCategories.filter(cat => cat.id !== 'all')
    : menuCategories.filter(cat => cat.id === activeCategory);

  const renderDishCard = (dish, index) => {
    const handleCardClick = () => {
      if (dish.isLocked) return;
      setSelectedDish(dish);
    };

    return (
      <div 
        key={dish.id} 
        className={`dish-card animate-fade-in ${dish.isLocked ? 'locked-dish-card' : ''}`}
        style={{ animationDelay: `${index * 0.03}s` }}
        onClick={handleCardClick}
      >
        <div className="dish-img-container">
          {dish.isLocked ? (
            <div className="locked-image-overlay">
              <span className="locked-badge-pill">🔒 COMING SOON</span>
            </div>
          ) : dish.badge ? (
            <span className={`dish-badge ${dish.badge.toLowerCase().includes('special') || dish.badge.toLowerCase().includes('signature') ? 'yellow' : 'red'}`}>
              {dish.badge}
            </span>
          ) : null}
          <img src={dish.image} alt={dish.name} className={dish.isLocked ? 'locked-img' : ''} />
          <span className="serving-pill">{dish.serving}</span>
        </div>

        <div className="dish-info-card">
          <span className="dish-category-label">{dish.categoryLabel}</span>
          <h3 className="dish-title">{dish.name}</h3>
          <p className="dish-desc">{dish.description}</p>
          <div className="dish-footer">
            <span className="dish-price">{formatPrice(dish.price)}</span>
            
            {dish.isLocked ? (
              <button 
                type="button"
                className="add-cart-btn locked-btn"
                disabled
              >
                COMING SOON
              </button>
            ) : (
              <button 
                type="button"
                className="add-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAddToCart) onAddToCart(dish);
                }}
              >
                ADD TO ORDER
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="menu" className="menu-section">
      <canvas ref={canvasRef} className="menu-bg-canvas" />

      <div className="menu-content-wrapper">
        <div className="section-header">
          <h2 className="section-title">OUR <span className="text-yellow">MENU</span></h2>
          <p className="section-subtitle">Explore our authentic categories and traditional specialties</p>
        </div>

        {/* Desktop Sticky Tabs */}
        <div className="menu-sub-navbar">
          <div className="sub-nav-container">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`sub-nav-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile "EXPLORE OUR MENU" Dropdown Accordion */}
        <div className="mobile-category-dropdown-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="mobile-explore-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <div className="mobile-explore-left">
              <span className="mobile-explore-label">EXPLORE OUR MENU</span>
              <span className="mobile-active-cat-pill">{activeCategoryLabel}</span>
            </div>
            <span className={`mobile-explore-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
          </button>

          {dropdownOpen && (
            <div className="mobile-category-dropdown-list">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`mobile-dropdown-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setDropdownOpen(false);
                  }}
                >
                  <span>{cat.label}</span>
                  {activeCategory === cat.id && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Categorized Subsections */}
        <div className="menu-sections-container">
          {sectionsToRender.map((category) => {
            const categoryDishes = menuItems.filter(item => item.category === category.id);
            if (categoryDishes.length === 0) return null;

            return (
              <div key={category.id} className="menu-category-group">
                {activeCategory === 'all' && (
                  <div className="menu-group-header">
                    <div className="menu-group-line"></div>
                    <h3 className="menu-group-title">
                      <span className="group-title-highlight">{category.label}</span>
                    </h3>
                    <div className="menu-group-line"></div>
                  </div>
                )}

                <div className="menu-grid">
                  {categoryDishes.map((dish, index) => renderDishCard(dish, index))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DishDetailModal 
        dish={selectedDish}
        isOpen={Boolean(selectedDish)}
        onClose={() => setSelectedDish(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};

export default Menu;