import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ cartCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['hero', 'menu', 'promise', 'story', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`cinematic-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        
        {/* Logo at Extreme Left */}
        <a href="#hero" onClick={handleLogoClick} className="brand-group">
          <img src="/images/brand/desikart-logo.png" alt="Desikart Logo" className="nav-logo" />
          <span className="brand-text">DESI<span className="text-red">KART</span></span>
        </a>

        {/* Cinematic Navigation Links */}
        <nav className="nav-links">
          <a href="#hero" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}><span>Home</span></a>
          <a href="#menu" className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`}><span>Menu</span></a>
          <a href="#promise" className={`nav-link ${activeSection === 'promise' ? 'active' : ''}`}><span>Promise</span></a>
          <a href="#story" className={`nav-link ${activeSection === 'story' ? 'active' : ''}`}><span>Story</span></a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}><span>Contact</span></a>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          <button className="cart-btn" aria-label="Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 01-8 0"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <a href="#menu" className="nav-order-btn">
            ORDER NOW
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;