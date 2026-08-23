import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { KITCHEN_COORDS, calculateDistanceKm, getDeliveryFeeFromDistance } from '../utils/deliveryCalculator';
import './LocationPickerModal.css';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapClickHandler({ onLocationChange }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

function MapRecenter({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 16, { duration: 0.9 });
    }
  }, [coords, map]);
  return null;
}

const LocationPickerModal = ({ isOpen, onClose, onLocationConfirmed, initialCoords }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Doorstep Inputs
  const [houseNo, setHouseNo] = useState('');
  const [streetNo, setStreetNo] = useState('');
  const [floorNo, setFloorNo] = useState('');
  const [landmark, setLandmark] = useState('');

  // Map & Geo States
  const [selectedCoords, setSelectedCoords] = useState(
    initialCoords || { lat: KITCHEN_COORDS.lat, lng: KITCHEN_COORDS.lng }
  );
  const [detectedSector, setDetectedSector] = useState('I-9/4, Islamabad');
  const [distanceKm, setDistanceKm] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(250);

  const debounceTimeout = useRef(null);
  const markerRef = useRef(null);

  const updateLocationDetails = async (lat, lng, customName = null) => {
    setSelectedCoords({ lat, lng });
    const dist = calculateDistanceKm(KITCHEN_COORDS.lat, KITCHEN_COORDS.lng, lat, lng);
    setDistanceKm(dist);
    setDeliveryFee(getDeliveryFeeFromDistance(dist));

    if (customName) {
      setDetectedSector(customName);
      return;
    }

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: { 'Accept-Language': 'en' }
      });
      const data = await res.json();
      if (data && data.display_name) {
        const parts = data.display_name.split(',').slice(0, 3).join(', ');
        setDetectedSector(parts);
      } else {
        setDetectedSector(`Area Pin (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      }
    } catch {
      setDetectedSector(`Area Pin (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    }
  };

  const handleGetCurrentGps = () => {
    if (!("geolocation" in navigator)) {
      alert("GPS not supported on this browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        updateLocationDetails(latitude, longitude);
      },
      (error) => {
        setIsLocating(false);
        alert("GPS Error: " + error.message);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const viewbox = '72.80,33.45,73.25,33.80';
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=pk&viewbox=${viewbox}&bounded=0&limit=5`;

        const res = await fetch(url, {
          headers: { 'Accept-Language': 'en' }
        });
        const data = await res.json();
        setSuggestions(data || []);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  if (!isOpen) return null;

  const buildAddressString = () => {
    const parts = [];
    if (houseNo.trim()) parts.push(`House #${houseNo.trim()}`);
    if (streetNo.trim()) parts.push(`St #${streetNo.trim()}`);
    if (floorNo.trim()) parts.push(floorNo.trim());
    parts.push(detectedSector);
    if (landmark.trim()) parts.push(`(Near: ${landmark.trim()})`);
    return parts.join(', ');
  };

  const handleConfirm = () => {
    if (!houseNo.trim() || !streetNo.trim()) {
      setValidationError('Please enter both House No. and Street No. for delivery.');
      return;
    }

    setValidationError('');
    const fullAddress = buildAddressString();

    onLocationConfirmed({
      address: fullAddress,
      coords: selectedCoords,
      distanceKm: distanceKm,
      deliveryFee: deliveryFee
    });
    onClose();
  };

  return (
    <div className="loc-modal-backdrop" onClick={onClose}>
      <div className="loc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="loc-modal-header">
          <div>
            <h3 className="loc-title">📍 SET DELIVERY ADDRESS</h3>
            <span className="loc-subtitle">Map calculates distance • You provide exact doorstep</span>
          </div>
          <button type="button" className="loc-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="loc-modal-body">
          {/* STEP 1: MAP SECTOR PICKER */}
          <div className="loc-step-box">
            <div className="loc-step-header">
              <span className="loc-step-badge">STEP 1</span>
              <strong className="loc-step-heading">Pick Sector / Area On Map</strong>
            </div>

            <div className="loc-search-row">
              <div className="loc-input-group">
                <input 
                  type="text"
                  placeholder="Type sector name (e.g. F-10, I-8, Bahria, PWD)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="loc-search-input"
                />
                {isSearching && <span className="loc-spinner">⏳</span>}

                {suggestions.length > 0 && (
                  <div className="loc-suggestions-box">
                    {suggestions.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="loc-suggestion-item"
                        onClick={() => {
                          const lat = parseFloat(item.lat);
                          const lng = parseFloat(item.lon);
                          updateLocationDetails(lat, lng, item.display_name.split(',').slice(0, 3).join(', '));
                          setSuggestions([]);
                          setQuery('');
                        }}
                      >
                        <span>📍</span>
                        <p>{item.display_name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button 
                type="button" 
                className="loc-gps-btn"
                onClick={handleGetCurrentGps}
                title="Detect My Location"
              >
                {isLocating ? '⏳' : '🎯 USE GPS'}
              </button>
            </div>

            <div className="loc-map-container">
              <MapContainer 
                center={[selectedCoords.lat, selectedCoords.lng]} 
                zoom={15} 
                scrollWheelZoom={true}
                style={{ width: '100%', height: '175px', borderRadius: '10px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                  position={[selectedCoords.lat, selectedCoords.lng]} 
                  icon={markerIcon} 
                  draggable={true}
                  ref={markerRef}
                  eventHandlers={{
                    dragend() {
                      const marker = markerRef.current;
                      if (marker != null) {
                        const latlng = marker.getLatLng();
                        updateLocationDetails(latlng.lat, latlng.lng);
                      }
                    }
                  }}
                />
                <MapClickHandler onLocationChange={(lat, lng) => updateLocationDetails(lat, lng)} />
                <MapRecenter coords={selectedCoords} />
              </MapContainer>
              <div className="loc-detected-pill">
                <span>Selected Sector:</span>
                <strong>{detectedSector}</strong>
              </div>
            </div>
          </div>

          {/* STEP 2: DOORSTEP DETAILS */}
          <div className="loc-step-box">
            <div className="loc-step-header">
              <span className="loc-step-badge">STEP 2</span>
              <strong className="loc-step-heading">Enter Doorstep Details (Manual)</strong>
            </div>

            <div className="loc-form-grid">
              <div className="loc-field">
                <label>House / Flat No. <span className="req">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. House # 402"
                  value={houseNo}
                  onChange={(e) => { setHouseNo(e.target.value); setValidationError(''); }}
                  className="loc-text-input"
                />
              </div>

              <div className="loc-field">
                <label>Street / Road No. <span className="req">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. Street 38-A"
                  value={streetNo}
                  onChange={(e) => { setStreetNo(e.target.value); setValidationError(''); }}
                  className="loc-text-input"
                />
              </div>

              <div className="loc-field">
                <label>Floor / Block (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1st Floor / Block B"
                  value={floorNo}
                  onChange={(e) => setFloorNo(e.target.value)}
                  className="loc-text-input"
                />
              </div>

              <div className="loc-field">
                <label>Famous Landmark (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Near Bilal Masjid"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="loc-text-input"
                />
              </div>
            </div>

            {validationError && (
              <span className="loc-error-banner">⚠️ {validationError}</span>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="loc-modal-footer">
          <div className="loc-footer-details">
            <span className="loc-preview-label">DELIVERY ADDRESS PREVIEW</span>
            <strong className="loc-preview-text">{buildAddressString()}</strong>
            <span className="loc-fee-badge">
              Distance: <b>{distanceKm} km</b> • Delivery Fee: <b className="text-yellow">Rs. {deliveryFee}</b>
            </span>
          </div>
          <button type="button" className="loc-confirm-btn" onClick={handleConfirm}>
            CONFIRM ADDRESS
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerModal;