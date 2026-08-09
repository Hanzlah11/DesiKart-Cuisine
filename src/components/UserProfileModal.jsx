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

  // Smoke & Ember Particle Effect
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 25 + 10,
        color: Math.random() > 0.5 ? 'rgba(244, 186, 63, 0.04)' : 'rgba(210, 50, 20, 0.03)',
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -50) p.y = canvas.height + 50;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
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

  return (
    <div className={`profile-drawer-backdrop ${isAnimating ? 'open' : ''}`} onClick={handleClose}>
      <div className="profile-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Live Smokey Particle Canvas */}
        <canvas ref={canvasRef} className="cart-bg-canvas" />

        <div className="cart-header" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-prime)', fontSize: '1.2rem', color: '#fff', textShadow: '0 0 10px rgba(244, 186, 63, 0.4)' }}>
            EDIT <span className="text-yellow">PROFILE</span>
          </h2>
          <button className="cart-close" onClick={handleClose} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        <div className="cart-body" style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, position: 'relative', zIndex: 1 }}>
          {error && <p style={{ marginBottom: '1rem', color: '#D23214', fontSize: '0.85rem' }}>{error}</p>}
          {success && <p style={{ marginBottom: '1.0rem', padding: '0.6rem', background: 'rgba(50, 210, 20, 0.15)', border: '1px solid #32D214', color: '#32D214', borderRadius: '4px', fontSize: '0.85rem' }}>{success}</p>}

          <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Section 1: Personal Details */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ fontFamily: 'var(--font-prime)', fontSize: '0.9rem', color: 'var(--logo-yellow)', marginBottom: '0.8rem', textShadow: 'none' }}>
                Personal Information
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '0.7rem', background: '#1a1a1a', border: '1px solid var(--border-dark)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '0.7rem', background: '#1a1a1a', border: '1px solid var(--border-dark)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>
            </div>

            {/* Section 2: Security & Password */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ fontFamily: 'var(--font-prime)', fontSize: '0.9rem', color: 'var(--logo-yellow)', marginBottom: '0.8rem', textShadow: 'none' }}>
                Change Password
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  placeholder="Required only to set new password"
                  style={{ width: '100%', padding: '0.7rem', background: '#1a1a1a', border: '1px solid var(--border-dark)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder="Leave blank to keep current"
                  style={{ width: '100%', padding: '0.7rem', background: '#1a1a1a', border: '1px solid var(--border-dark)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '0.9rem', background: 'var(--logo-red)', color: '#fff', border: 'none', borderRadius: '6px', fontFamily: 'var(--font-prime)', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px' }}
            >
              {loading ? 'SAVING CHANGES...' : 'SAVE ALL CHANGES'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.2rem' }}>
            <button 
              type="button" 
              onClick={handleDeleteAccount}
              style={{ background: 'transparent', border: 'none', color: '#D23214', cursor: 'pointer', fontFamily: 'var(--font-prime)', fontSize: '0.85rem' }}
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