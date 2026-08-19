import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('dk_theme');
    if (saved === 'dark' || saved === 'cardamom' || saved === 'light') {
      return saved === 'dark' ? 'dark' : 'cardamom';
    }
    return 'cardamom'; // Default theme
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dk_theme', theme);

    const handleThemeChange = (e) => {
      if (e.detail && e.detail !== theme) {
        setTheme(e.detail);
      }
    };

    window.addEventListener('dk-theme-change', handleThemeChange);
    return () => window.removeEventListener('dk-theme-change', handleThemeChange);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'cardamom' : 'dark';
    setTheme(nextTheme);
    window.dispatchEvent(new CustomEvent('dk-theme-change', { detail: nextTheme }));
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  };
};