import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ 
  cartCount = 0, 
  onCartClick, 
  currentUser, 
  userData, 
  onOpenAuth, 
  onOpenProfile, 
  onSignOut 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`cinematic-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#hero" onClick={handleLogoClick} className="brand-group">
          <img src="/images/brand/desikart-logo.png" alt="Desikart Logo" className="nav-logo" />
          <span className="brand-text">DESI<span className="text-red">KART</span></span>
        </a>

        <nav className="nav-links">
          <a href="#hero" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}><span>Home</span></a>
          <a href="#menu" className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`}><span>Menu</span></a>
          <a href="#promise" className={`nav-link ${activeSection === 'promise' ? 'active' : ''}`}><span>Promise</span></a>
          <a href="#story" className={`nav-link ${activeSection === 'story' ? 'active' : ''}`}><span>Story</span></a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}><span>Contact</span></a>
        </nav>

        <div className="nav-actions">
          {currentUser ? (
            <div className="user-menu-container" style={{ position: 'relative' }}>
              <button 
                type="button"
                className="user-profile-trigger" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title="Account Settings"
              >
                <span>👤 {userData?.name ? userData.name.split(' ')[0] : 'Account'}</span>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown-menu">
                  <div className="dropdown-user-info">
                    <strong>{userData?.name || 'User'}</strong>
                    <small>{currentUser.email}</small>
                  </div>
                  <button type="button" onClick={() => { setDropdownOpen(false); onOpenProfile(); }}>
                    ⚙️ Edit Profile
                  </button>
                  <button type="button" onClick={() => { setDropdownOpen(false); onSignOut(); }} className="dropdown-signout">
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button type="button" className="nav-login-btn" onClick={onOpenAuth}>
              LOGIN / SIGNUP
            </button>
          )}

          <button type="button" className="cart-btn" aria-label="Shopping Cart" onClick={onCartClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 01-8 0"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <a href="#menu" className="nav-order-btn desktop-order-btn">
            ORDER NOW
          </a>

          <button 
            type="button"
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <a href="#hero" onClick={handleNavLinkClick} className={`mobile-nav-link ${activeSection === 'hero' ? 'active' : ''}`}>Home</a>
          <a href="#menu" onClick={handleNavLinkClick} className={`mobile-nav-link ${activeSection === 'menu' ? 'active' : ''}`}>Menu</a>
          <a href="#promise" onClick={handleNavLinkClick} className={`mobile-nav-link ${activeSection === 'promise' ? 'active' : ''}`}>Promise</a>
          <a href="#story" onClick={handleNavLinkClick} className={`mobile-nav-link ${activeSection === 'story' ? 'active' : ''}`}>Story</a>
          <a href="#contact" onClick={handleNavLinkClick} className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;