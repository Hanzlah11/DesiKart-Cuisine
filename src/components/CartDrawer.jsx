import React, { useEffect, useRef } from 'react';
import { formatPrice } from '../data/menu';
import './CartDrawer.css';

const QUICK_ADDONS = [
  { id: 'plain-naan', name: 'Plain Naan', price: 50, image: '/images/menu/plain_naan.jpeg', serving: 'Add-on' },
  { id: 'roghni-naan', name: 'Roghni Naan', price: 120, image: '/images/menu/roghni_naan.jpeg', serving: 'Add-on' },
  { id: 'extra-nali', name: '1 Nali (Beef)', price: 200, image: '/images/menu/nalli_beef_nihari.jpeg', serving: 'Add-on' },
  { id: 'zeera-raita', name: 'Zeera Raita (10 oz)', price: 160, image: '/images/menu/zeera_raita.jpeg', serving: 'Add-on' },
  { id: 'soft-drink', name: 'Soft Drink (250ml Can)', price: 150, image: '/images/menu/soft_drink.jpeg', serving: 'Add-on' }
];

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  deliveryFee = 0,
  distanceKm = null,
  deliveryAddress = '',
  onOpenLocationPicker,
  onUpdateQuantity, 
  onRemoveItem, 
  onAddToCart,
  onCheckout
}) => {
  const canvasRef = useRef(null);
  const isLocationSelected = Boolean(deliveryAddress && distanceKm !== null);

  const handleAddMoreItems = () => {
    onClose();
    setTimeout(() => {
      const menuSection = document.getElementById('menu') || document.querySelector('.menu-section');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

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

    class SmokeParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.radius = Math.random() * 60 + 40;
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
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(244, 186, 63, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(210, 50, 20, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');

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
        this.y = height + Math.random() * 30;
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
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const color = Math.random() > 0.4 ? '#F4BA3F' : '#D23214';
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
      }
    }
    
    const smokeParticles = Array.from({ length: 10 }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: 20 }, () => new EmberParticle());

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

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const total = subtotal + (cartItems.length > 0 && isLocationSelected ? deliveryFee : 0);

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        
        <canvas ref={canvasRef} className="cart-bg-canvas" />

        <div className="cart-header">
          <div className="cart-header-left">
            <h3 className="cart-title">YOUR <span className="text-yellow">ORDER</span></h3>
            {cartItems.length > 0 && (
              <span className="cart-badge-count">
                {cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0)} items
              </span>
            )}
          </div>
          <button type="button" className="cart-close-btn" onClick={onClose} aria-label="Close cart">&times;</button>
        </div>

        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span className="empty-icon">🛒</span>
              <p>Your cart is currently empty.</p>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                Add delicious dishes from our menu to start your order.
              </span>
              <button type="button" className="empty-explore-btn" onClick={handleAddMoreItems}>
                EXPLORE MENU
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => {
                const complimentaryList = Array.isArray(item.complimentary)
                  ? item.complimentary
                  : typeof item.complimentary === 'string'
                  ? item.complimentary.split(',').map(s => s.trim())
                  : [];

                return (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-item-main">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <span className="cart-item-serving">{item.serving}</span>
                        <span className="cart-item-price">{formatPrice(item.price)}</span>
                      </div>
                      <div className="cart-item-controls">
                        <div className="quantity-changer">
                          <button type="button" onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity || 1}</span>
                          <button type="button" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                        </div>
                        <button type="button" className="remove-item-btn" onClick={() => onRemoveItem(item.id)}>🗑️</button>
                      </div>
                    </div>

                    {complimentaryList.length > 0 && (
                      <div className="cart-item-pills-row">
                        <span className="pills-label">Includes:</span>
                        <div className="pills-wrap">
                          {complimentaryList.map((comp, idx) => (
                            <span key={idx} className="single-comp-pill">
                              <span className="pill-check">✓</span> {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {onAddToCart && (
                <div className="cart-quick-addons">
                  <span className="addons-title">Popular Add-ons</span>
                  <div className="vertical-addons-list">
                    {QUICK_ADDONS.map((addon) => (
                      <div key={addon.id} className="vertical-addon-row">
                        <img src={addon.image} alt={addon.name} className="vertical-addon-img" />
                        <div className="vertical-addon-info">
                          <strong>{addon.name}</strong>
                          <span>{formatPrice(addon.price)}</span>
                        </div>
                        <button 
                          type="button"
                          className="vertical-addon-btn"
                          onClick={() => onAddToCart(addon)}
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Delivery Location Capsule */}
            <div className="cart-loc-select-box" onClick={onOpenLocationPicker}>
              <div className="cart-loc-select-left">
                <span className="cart-loc-pin-icon">📍</span>
                <div className="cart-loc-text">
                  <span className="cart-loc-label">DELIVER TO:</span>
                  <p className="cart-loc-address">
                    {deliveryAddress || 'Tap to set sector, house and street'}
                  </p>
                </div>
              </div>
              <button type="button" className="cart-loc-change-btn">
                {deliveryAddress ? 'Change' : 'Set Location'}
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>
                Estimated Delivery 
                {isLocationSelected && (
                  <small className="cart-dist-tag">
                    ({Number(distanceKm).toFixed(1)} km)
                  </small>
                )}
              </span>
              <strong>
                {isLocationSelected 
                  ? (deliveryFee === 0 ? <span className="free-delivery-badge">FREE</span> : formatPrice(deliveryFee))
                  : 'Select Location'}
              </strong>
            </div>

            <div className="cart-summary-row total-row">
              <span>Total Amount</span>
              <strong className="text-yellow">{formatPrice(total)}</strong>
            </div>

            {/* Advance payment notice */}
            <div className="cart-advance-notice">
              <span>⚠️ <strong>Advance Payment Only</strong> • No Cash On Delivery</span>
            </div>

            {/* Buttons */}
            <div className="cart-action-buttons">
              <button type="button" className="add-more-btn" onClick={handleAddMoreItems}>
                + ADD MORE ITEMS
              </button>

              <button 
                type="button" 
                className={`place-order-btn ${!isLocationSelected ? 'locked-place-order-btn' : ''}`} 
                onClick={isLocationSelected ? onCheckout : onOpenLocationPicker}
              >
                <span>{isLocationSelected ? 'PLACE ORDER' : '📍 SELECT LOCATION TO ORDER'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;