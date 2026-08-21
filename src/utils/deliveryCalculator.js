// Exact Pinpoint Coordinates: House No 402, Street 38-A, I-9/4, Islamabad
export const KITCHEN_COORDS = {
  lat: 33.65281416291356,
  lng: 73.06097552800422
};

export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const rawDist = R * c;

  // Clamps to 0.0 km if within 100m premises
  if (rawDist < 0.1) {
    return 0.0;
  }

  return Math.round(rawDist * 10) / 10;
};

export const getDeliveryFeeFromDistance = (distanceKm) => {
  if (distanceKm === null || distanceKm === undefined) return 250;
  if (distanceKm <= 2.5) return 0;
  if (distanceKm <= 5.0) return 250;
  if (distanceKm <= 7.5) return 500;
  if (distanceKm <= 10.0) return 750;
  return 750 + Math.ceil((distanceKm - 10) / 2.5) * 250;
};