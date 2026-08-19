import React, { useEffect, useRef } from 'react';
import { formatPrice } from '../data/menu';
import './CartDrawer.css';

const QUICK_ADDONS = [
  { id: 'roghni-naan', name: 'Roghni Naan', price: 120, image: '/images/menu/roghni_naan.jpeg', serving: 'Add-on' },
  { id: 'zeera-raita', name: 'Zeera Raita', price: 160, image: '/images/menu/zeera_raita.jpeg', serving: 'Add-on' },
  { id: 'soft-drink', name: 'Soft Drink 250ml Can', price: 140, image: '/images/menu/soft_drink.jpeg', serving: 'Add-on' }
];

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onAddToCart,
  onCheckout,
  onDownloadInvoice
}) => {
  const canvasRef = useRef(null);

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
  const deliveryFee = 200;
  const total = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

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
                const complimentaryList = Array.isArray(item.complimentary || item.includes)
                  ? (item.complimentary || item.includes)
                  : typeof (item.complimentary || item.includes) === 'string'
                  ? (item.complimentary || item.includes).split(',').map(s => s.trim())
                  : [];

                return (
                  <div key={item.id} className="cart-item-card">
                    {/* Top Row: Dish Image, Titles, Price & Controls */}
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

                    {/* Bottom Row: Wrapping Separate Pills */}
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
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="cart-summary-row">
              <span>Estimated Delivery</span>
              <strong>{formatPrice(deliveryFee)}</strong>
            </div>
            <div className="cart-summary-row total-row">
              <span>Total Amount</span>
              <strong className="text-yellow">{formatPrice(total)}</strong>
            </div>

            <button type="button" className="add-more-btn" onClick={handleAddMoreItems}>
              <span>+ ADD MORE ITEMS</span>
            </button>

            {onDownloadInvoice && (
              <button type="button" className="invoice-download-btn" onClick={onDownloadInvoice}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
                <span>GET INVOICE & SEND TO MY WHATSAPP</span>
              </button>
            )}

            <button type="button" className="whatsapp-checkout-btn" onClick={onCheckout}>
              <span>ORDER VIA WHATSAPP</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.46 3.42 1.34 4.9L2 22l5.35-1.42c1.42.78 3.05 1.2 4.69 1.2 5.46 0 9.9-4.44 9.9-9.9 0-5.46-4.44-9.9-9.9-9.9zm0 18c-1.42 0-2.8-.38-4-1.08l-.29-.17-3.03.8.81-2.95-.19-.31C4.7 14.86 4.24 13.46 4.24 12c0-4.3 3.5-7.8 7.8-7.8s7.8 3.5 7.8 7.8-3.5 7.8-7.8 7.8zm4.36-5.83c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.34.98 2.5c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.15 1.53.09.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;