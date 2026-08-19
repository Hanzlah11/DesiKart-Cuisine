import React, { useState, useEffect, useRef } from 'react';
import { auth, db, doc, updateDoc, deleteDoc, updatePassword, signInWithEmailAndPassword } from '../firebase';
import './CartDrawer.css';

const UserProfileModal = ({ isOpen, onClose, currentUser, userData, onProfileUpdated }) => {
  const [name, setName] = useState(userData?.name || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setPhone(userData.phone || '');
    }
  }, [userData]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

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
        this.y = height + Math.random() * 40;
        this.radius = Math.random() * 45 + 25;
        this.speedY = Math.random() * 0.35 + 0.12;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.opacity = Math.random() * 0.04 + 0.01;
        this.fadeSpeed = Math.random() * 0.0003 + 0.0001;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.radius += 0.1;
        this.opacity -= this.fadeSpeed;
        if (this.y < -this.radius || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        const light = isLightObsidian();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

        if (light) {
          // Light Obsidian: Silvery Misty Slate & Saffron Amber
          gradient.addColorStop(0, `rgba(194, 203, 197, ${this.opacity * 1.5})`);
          gradient.addColorStop(0.5, `rgba(255, 196, 77, ${this.opacity * 0.6})`);
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
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 1.8 + 0.6;
        this.speedY = Math.random() * 0.75 + 0.25;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.7 + 0.2;
        this.fadeSpeed = Math.random() * 0.004 + 0.001;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.25;
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
        ctx.shadowBlur = 5;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
      }
    }

    const smokeParticles = Array.from({ length: 8 }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: 16 }, () => new EmberParticle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      smokeParticles.forEach((s) => { s.update(); s.draw(); });
      emberParticles.forEach((e) => { e.update(); e.draw(); });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 350);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { name, phone });

      if (newPassword.trim().length > 0) {
        if (!currentPassword) {
          throw new Error("Please enter your current password to change your password.");
        }
        await signInWithEmailAndPassword(auth, currentUser.email, currentPassword);
        await updatePassword(currentUser, newPassword);
      }

      setSuccess('Profile and settings updated successfully!');
      setLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      onProfileUpdated({ ...userData, name, phone });

      setTimeout(() => {
        handleClose();
        setSuccess('');
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, "users", currentUser.uid));
      await currentUser.delete();
      handleClose();
      window.location.reload();
    } catch (err) {
      setLoading(false);
      setError("Please re-login recently before deleting your account for security reasons.");
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-dark)',
    color: 'var(--logo-cream)',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    transition: 'all 0.25s ease'
  };

  return (
    <div className={`profile-drawer-backdrop ${isAnimating ? 'open' : ''}`} onClick={handleClose}>
      <div 
        className="profile-drawer" 
        onClick={(e) => e.stopPropagation()}
      >
        <canvas ref={canvasRef} className="cart-bg-canvas" />

        <div 
          className="cart-header" 
          style={{ 
            padding: '1.5rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: '1px solid var(--border-subtle)', 
            position: 'relative', 
            zIndex: 1 
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-prime)', fontSize: '1.3rem', fontWeight: 200, color: 'var(--logo-cream)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            EDIT <span className="text-yellow">PROFILE</span>
          </h2>
          <button 
            type="button"
            className="cart-close" 
            onClick={handleClose} 
            style={{ background: 'transparent', border: 'none', color: 'var(--logo-cream)', fontSize: '1.6rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        <div className="cart-body" style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, position: 'relative', zIndex: 1 }}>
          {error && (
            <p style={{ marginBottom: '1rem', padding: '0.6rem', background: 'rgba(210, 50, 20, 0.15)', border: '1px solid var(--logo-red)', color: 'var(--logo-red)', borderRadius: '6px', fontSize: '0.85rem' }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{ marginBottom: '1rem', padding: '0.6rem', background: 'rgba(34, 163, 82, 0.12)', border: '1px solid var(--accent-green)', color: 'var(--accent-green)', borderRadius: '6px', fontSize: '0.85rem' }}>
              {success}
            </p>
          )}

          <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Section 1: Personal Details */}
            <div style={{ background: 'var(--bg-surface)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-dark)', boxShadow: 'var(--card-shadow)' }}>
              <h3 style={{ fontFamily: 'var(--font-prime)', fontSize: '0.95rem', fontWeight: 300, color: 'var(--logo-yellow)', marginBottom: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Personal Information
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-prime)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--logo-yellow)'; e.target.style.background = 'var(--bg-canvas)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-dark)'; e.target.style.background = 'var(--bg-elevated)'; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-prime)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--logo-yellow)'; e.target.style.background = 'var(--bg-canvas)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-dark)'; e.target.style.background = 'var(--bg-elevated)'; }}
                />
              </div>
            </div>

            {/* Section 2: Security & Password */}
            <div style={{ background: 'var(--bg-surface)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-dark)', boxShadow: 'var(--card-shadow)' }}>
              <h3 style={{ fontFamily: 'var(--font-prime)', fontSize: '0.95rem', fontWeight: 300, color: 'var(--logo-yellow)', marginBottom: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Change Password
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-prime)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Current Password
                </label>
                <input 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  placeholder="Required only to set new password"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--logo-yellow)'; e.target.style.background = 'var(--bg-canvas)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-dark)'; e.target.style.background = 'var(--bg-elevated)'; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-prime)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  New Password
                </label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder="Leave blank to keep current"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--logo-yellow)'; e.target.style.background = 'var(--bg-canvas)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-dark)'; e.target.style.background = 'var(--bg-elevated)'; }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '0.95rem', 
                background: 'var(--logo-red)', 
                color: '#FFFFFF', 
                border: 'none', 
                borderRadius: '8px', 
                fontFamily: 'var(--font-prime)', 
                fontSize: '1rem',
                fontWeight: 300,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(230, 59, 28, 0.35)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.target.style.background = 'var(--logo-yellow)'; e.target.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'var(--logo-red)'; e.target.style.transform = 'none'; }}
            >
              {loading ? 'SAVING CHANGES...' : 'SAVE ALL CHANGES'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem' }}>
            <button 
              type="button" 
              onClick={handleDeleteAccount}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--logo-red)', 
                cursor: 'pointer', 
                fontFamily: 'var(--font-prime)', 
                fontSize: '0.85rem',
                fontWeight: 300,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              DELETE ACCOUNT PERMANENTLY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;