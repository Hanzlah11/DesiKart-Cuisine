import React, { useState, useEffect } from 'react';
import { auth, db, RecaptchaVerifier, signInWithPhoneNumber, doc, setDoc } from '../firebase';
import './AuthModal.css';

const PhoneAuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');

  // Initialize invisible reCAPTCHA for phone verification
  useEffect(() => {
    if (isOpen && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Step 1: Send OTP to User's Phone
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (err) {
      setError(err.message);
      if (window.recaptchaVerifier) window.recaptchaVerifier.render();
    }
  };

  // Step 2: Verify OTP and Save Name + Phone to Firestore
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Save user profile data in Firestore database
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        phone: phoneNumber,
        createdAt: new Date().toISOString()
      }, { merge: true });

      onSuccess({ name, phone: phoneNumber });
      onClose();
    } catch (err) {
      setError('Invalid OTP code. Please try again.');
    }
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>&times;</button>
        <h2 className="auth-title">
          VERIFY <span className="text-yellow">PHONE</span>
        </h2>
        
        {error && <p className="auth-error">{error}</p>}

        <div id="recaptcha-container"></div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="e.g. Mohib Sardar"
              />
            </div>
            <div className="form-group">
              <label>Phone Number (with country code)</label>
              <input 
                type="tel" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required 
                placeholder="e.g. +923001234567"
              />
            </div>
            <button type="submit" className="auth-submit-btn">SEND OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="auth-form">
            <div className="form-group">
              <label>Enter 6-Digit Code Sent via SMS</label>
              <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                required 
                placeholder="123456"
              />
            </div>
            <button type="submit" className="auth-submit-btn">VERIFY & CONTINUE</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneAuthModal;