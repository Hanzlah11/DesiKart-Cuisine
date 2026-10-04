import React, { useState, useEffect } from 'react';
import { menuItems, formatPrice } from '../data/menu';
import './DishDetailModal.css';

export const DishDetailModal = ({ dish, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !dish) return null;

  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (dish?.variations && dish.variations.length > 0) {
      setSelectedVariation(dish.variations[0]);
    } else {
      setSelectedVariation(null);
    }
    setSelectedAddons([]);
    setQuantity(1);
  }, [dish]);

  const availableAddons = menuItems.filter((item) => item.category === 'addons');

  const basePrice = selectedVariation ? selectedVariation.price : (dish.price || 0);
  const addonsPriceTotal = selectedAddons.reduce((sum, addon) => sum + (addon.price * addon.quantity), 0);
  const totalPrice = (basePrice + addonsPriceTotal) * quantity;

  const handleToggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, { ...addon, quantity: 1 }];
      }
    });
  };

  const handleUpdateAddonQty = (addonId, delta) => {
    setSelectedAddons((prev) =>
      prev
        .map((a) => {
          if (a.id === addonId) {
            const newQty = a.quantity + delta;
            return newQty > 0 ? { ...a, quantity: newQty } : null;
          }
          return a;
        })
        .filter(Boolean)
    );
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...dish,
      selectedVariation,
      selectedAddons,
      quantity,
      finalPrice: totalPrice / quantity,
    };
    onAddToCart(itemToAdd);
    onClose();
  };

  return (
    <div className="dish-modal-backdrop" onClick={onClose}>
      <div className="dish-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="dish-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="dish-modal-content">
          <div className="dish-modal-image-col">
            {dish.image && (
              <img src={dish.image} alt={dish.name} className="dish-modal-img" />
            )}
            {dish.badge && (
              <span className={`dish-modal-badge ${dish.badge.toLowerCase().includes('special') || dish.badge.toLowerCase().includes('signature') ? 'yellow' : 'red'}`}>
                {dish.badge}
              </span>
            )}
            <span className="dish-modal-serving-tag">
              {selectedVariation ? selectedVariation.label : (dish.serving || 'Standard Serving')}
            </span>
          </div>

          <div className="dish-modal-details-col">
            <span className="dish-modal-cat">
              {dish.subCategoryLabel || dish.category}
            </span>
            <h2 className="dish-modal-title">{dish.name}</h2>
            <p className="dish-modal-desc">{dish.description}</p>

            {dish.variations && dish.variations.length > 0 && (
              <div className="variation-selector-group">
                <span className="variation-label">Select Serving Portion</span>
                <div className="variation-pills-row">
                  {dish.variations.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      className={`variation-pill-btn ${selectedVariation?.id === v.id ? 'active' : ''}`}
                      onClick={() => setSelectedVariation(v)}
                    >
                      <span className="var-label">{v.label}</span>
                      <span className="var-price">{formatPrice(v.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedVariation?.complimentary?.length > 0 && (
              <div className="complimentary-box">
                <h4 className="complimentary-title">✓ Complimentary Meal Inclusions</h4>
                <ul className="complimentary-list">
                  {selectedVariation.complimentary.map((inc, i) => (
                    <li key={i}>• {inc}</li>
                  ))}
                </ul>
              </div>
            )}

            {dish.category !== 'addons' && availableAddons.length > 0 && (
              <div className="dish-modal-addons-section">
                <div className="modal-addons-header-row">
                  <span className="modal-addons-header">Optional Add-ons</span>
                  {addonsPriceTotal > 0 && (
                    <span className="addons-subtotal-tag">
                      + {formatPrice(addonsPriceTotal)}
                    </span>
                  )}
                </div>

                <div className="vertical-addons-list">
                  {availableAddons.map((addon) => {
                    const selectedAddon = selectedAddons.find((a) => a.id === addon.id);
                    const isSelected = Boolean(selectedAddon);

                    return (
                      <div
                        key={addon.id}
                        className={`vertical-addon-row ${isSelected ? 'selected' : ''}`}
                      >
                        <img src={addon.image} alt={addon.name} className="vertical-addon-img" />
                        <div className="vertical-addon-info">
                          <strong>{addon.name}</strong>
                          <span>{formatPrice(addon.price)}</span>
                        </div>

                        {isSelected ? (
                          <div className="modal-qty-changer">
                            <button
                              type="button"
                              onClick={() => handleUpdateAddonQty(addon.id, -1)}
                            >
                              -
                            </button>
                            <span>{selectedAddon.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateAddonQty(addon.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="vertical-addon-btn"
                            onClick={() => handleToggleAddon(addon)}
                          >
                            + ADD
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
              <div className="modal-qty-changer" style={{ padding: '0.4rem 0.6rem' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ fontSize: '1.2rem' }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.1rem', padding: '0 0.8rem' }}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ fontSize: '1.2rem' }}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="dish-modal-add-btn"
                onClick={handleAddToCart}
                style={{ flexGrow: 1 }}
              >
                <span>ADD TO ORDER</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailModal;