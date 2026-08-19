import React, { useState, useEffect, useRef } from 'react';
import { formatPrice } from '../data/menu';
import './DishDetailModal.css';

const AVAILABLE_ADDONS = [
  { id: 'plain-naan', name: 'Plain Naan', price: 50, image: '/images/menu/plain_naan.jpeg', serving: 'Add-on' },
  { id: 'roghni-naan', name: 'Roghni Naan', price: 120, image: '/images/menu/roghni_naan.jpeg', serving: 'Add-on' },
  { id: 'garlic-naan', name: 'Garlic Naan', price: 95, image: '/images/menu/garlic_naan.jpeg', serving: 'Add-on' },
  { id: 'zeera-raita', name: 'Zeera Raita', price: 160, image: '/images/menu/zeera_raita.jpeg', serving: 'Add-on' },
  { id: 'pudina-raita', name: 'Pudina Raita', price: 160, image: '/images/menu/pudina_raita.jpeg', serving: 'Add-on' },
  { id: 'soft-drink', name: 'Soft Drink 250ml Can', price: 140, image: '/images/menu/soft_drink.jpeg', serving: 'Add-on' }
];

const DishDetailModal = ({ dish, isOpen, onClose, onAddToCart }) => {
  const [selectedAddons, setSelectedAddons] = useState({});
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedAddons({});
    }
  }, [isOpen, dish]);

  useEffect(() => {
    if (!isOpen) return;
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
        this.y = height + Math.random() * 40;
        this.radius = Math.random() * 50 + 30;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
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
          gradient.addColorStop(0, `rgba(194, 203, 197, ${this.opacity * 1.5})`);
          gradient.addColorStop(0.5, `rgba(255, 196, 77, ${this.opacity * 0.6})`);
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
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 1.8 + 0.5;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.7 + 0.2;
        this.fadeSpeed = Math.random() * 0.004 + 0.001;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.2;
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
        ctx.shadowBlur = 6;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
      }
    }

    const smokeParticles = Array.from({ length: 8 }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: 16 }, () => new EmberParticle());

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
  }, [isOpen]);

  if (!isOpen || !dish) return null;

  const isFamily = dish.category === 'family-deals' || dish.serving?.toLowerCase().includes('family');
  const isAddonCategory = dish.category === 'addons';

  const handleUpdateAddonQty = (addonId, delta) => {
    setSelectedAddons((prev) => {
      const currentQty = prev[addonId] || 0;
      const nextQty = currentQty + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      }
      return { ...prev, [addonId]: nextQty };
    });
  };

  const addonsTotal = Object.entries(selectedAddons).reduce((sum, [addonId, qty]) => {
    const item = AVAILABLE_ADDONS.find((a) => a.id === addonId);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const combinedTotal = (dish.price || 0) + addonsTotal;

  const handleMainAddToCart = () => {
    onAddToCart(dish);

    Object.entries(selectedAddons).forEach(([addonId, qty]) => {
      const addonObj = AVAILABLE_ADDONS.find((a) => a.id === addonId);
      if (addonObj && qty > 0) {
        for (let i = 0; i < qty; i++) {
          onAddToCart(addonObj);
        }
      }
    });

    onClose();
  };

  return (
    <div className="dish-modal-backdrop" onClick={onClose}>
      <div className="dish-modal-container" onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="dish-modal-canvas" />

        <button type="button" className="dish-modal-close" onClick={onClose} aria-label="Close modal">&times;</button>

        <div className="dish-modal-content">
          <div className="dish-modal-image-col">
            <img src={dish.image} alt={dish.name} className="dish-modal-img" />
            {dish.badge && (
              <span className={`dish-modal-badge ${dish.badge.toLowerCase().includes('special') || dish.badge.toLowerCase().includes('signature') ? 'yellow' : 'red'}`}>
                {dish.badge}
              </span>
            )}
            <span className="dish-modal-serving-tag">{dish.serving}</span>
          </div>

          <div className="dish-modal-details-col">
            <span className="dish-modal-cat">{dish.categoryLabel || dish.category}</span>
            <h2 className="dish-modal-title">{dish.name}</h2>
            <p className="dish-modal-desc">{dish.description}</p>
            <div className="dish-modal-price">{formatPrice(dish.price)}</div>

            {!isAddonCategory && (
              <div className="complimentary-box">
                <h4 className="complimentary-title">✨ Complimentary Inclusions (Included in Price)</h4>
                {isFamily ? (
                  <ul className="complimentary-list">
                    <li>🥗 1x Fresh Salad (Family Bowl, +50% Extra)</li>
                    <li>🥣 1x Zeera Raita (Family Bowl, +50% Extra)</li>
                    <li>🍞 6x Freshly Baked Naans</li>
                    <li>🥤 1x 1.5 Litre Chilled Soft Drink</li>
                  </ul>
                ) : (
                  <ul className="complimentary-list">
                    <li>🥗 1x Fresh Salad (Single Portion)</li>
                    <li>🥣 1x Zeera Raita (Single Portion)</li>
                    <li>🍞 2x Freshly Baked Naans</li>
                    <li>🥤 1x 250ml Chilled Soft Drink Can</li>
                  </ul>
                )}
              </div>
            )}

            {!isAddonCategory && (
              <div className="dish-modal-addons-section">
                <div className="modal-addons-header-row">
                  <span className="modal-addons-header">Extra Add-ons</span>
                  {addonsTotal > 0 && (
                    <span className="addons-subtotal-tag">+ {formatPrice(addonsTotal)}</span>
                  )}
                </div>

                <div className="vertical-addons-list">
                  {AVAILABLE_ADDONS.map((addon) => {
                    const qty = selectedAddons[addon.id] || 0;
                    return (
                      <div key={addon.id} className={`vertical-addon-row ${qty > 0 ? 'selected' : ''}`}>
                        <img src={addon.image} alt={addon.name} className="vertical-addon-img" />
                        <div className="vertical-addon-info">
                          <strong>{addon.name}</strong>
                          <span>{formatPrice(addon.price)}</span>
                        </div>

                        {qty === 0 ? (
                          <button 
                            type="button"
                            className="vertical-addon-btn"
                            onClick={() => handleUpdateAddonQty(addon.id, 1)}
                          >
                            + Add
                          </button>
                        ) : (
                          <div className="modal-qty-changer">
                            <button type="button" onClick={() => handleUpdateAddonQty(addon.id, -1)}>-</button>
                            <span>{qty}</span>
                            <button type="button" onClick={() => handleUpdateAddonQty(addon.id, 1)}>+</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button 
              type="button"
              className="dish-modal-add-btn" 
              onClick={handleMainAddToCart}
            >
              <span>ADD TO ORDER</span>
              <strong>{formatPrice(combinedTotal)}</strong>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailModal;