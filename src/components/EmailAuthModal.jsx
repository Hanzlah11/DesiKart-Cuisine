import React, { useState } from 'react';
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, getDoc } from '../firebase';
import './AuthModal.css';

const EmailAuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        // 1. Create secure account with Email & Password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Save Name & Phone in Firestore database under the matching user ID rule
        const profileData = { name, phone, email, createdAt: new Date().toISOString() };
        await setDoc(doc(db, "users", user.uid), profileData);

        setLoading(false);
        onSuccess(profileData);
      } else {
        // 1. Log in existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Fetch their saved name/phone from Firestore securely
        const userSnap = await getDoc(doc(db, "users", user.uid));
        
        let profileData = { name: "Valued Customer", phone: "+923316667054", email: user.email };
        if (userSnap.exists()) {
          profileData = userSnap.data();
        } else {
          // Fallback if user exists in Auth but document wasn't initialized
          profileData = { name: user.email.split('@')[0], phone: "+923316667054", email: user.email };
          await setDoc(doc(db, "users", user.uid), profileData);
        }

        setLoading(false);
        onSuccess(profileData);
      }
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>&times;</button>
        <h2 className="auth-title">
          {isSignup ? 'CREATE' : 'LOGIN TO'} <span className="text-yellow">DESIKART</span>
        </h2>
        
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="e.g. Hanzlah Imran"
                />
              </div>
              <div className="form-group">
                <label>Phone Number (For Order Delivery)</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  placeholder="e.g. +923316667054"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="e.g. user@gmail.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="********"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'PROCESSING...' : (isSignup ? 'REGISTER & ORDER' : 'LOGIN & ORDER')}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login here' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailAuthModal;