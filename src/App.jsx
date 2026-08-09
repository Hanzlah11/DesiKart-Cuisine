// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Promise from './components/Promise';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="app">
      {/* Cinematic Navigation Bar */}
      <Header cartCount={cartCount} />

      {/* Main Content Area with top padding for fixed navbar */}
      <main style={{ paddingTop: '85px' }}>
        <Hero />
        <Menu onAddToCart={handleAddToCart} />
        <Promise />
        <Story />
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;