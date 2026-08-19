import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('dk_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    const syncExternalTheme = (e) => {
      if (e.detail) {
        setIsDark(e.detail === 'dark');
      }
    };
    window.addEventListener('dk-theme-update', syncExternalTheme);
    return () => window.removeEventListener('dk-theme-update', syncExternalTheme);
  }, [isDark]);

  const handleToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      const nextTheme = next ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('dk_theme', nextTheme);
      window.dispatchEvent(new CustomEvent('dk-theme-update', { detail: nextTheme }));
      return next;
    });
  };

  return (
    <button 
      type="button"
      className="theme-toggle-btn"
      onClick={handleToggle}
      title={isDark ? 'Switch to Light Obsidian' : 'Switch to Midnight Obsidian'}
      aria-label="Toggle theme"
    >
      <span className="theme-toggle-icon">{isDark ? '🌫️' : '🌙'}</span>
      <span className="theme-toggle-label">{isDark ? 'Light Obsidian' : 'Midnight Obsidian'}</span>
    </button>
  );
};

export default ThemeToggle;