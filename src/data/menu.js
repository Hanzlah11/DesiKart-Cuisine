export const menuCategories = [
  { id: 'all', label: 'All' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'weekend-specials', label: 'Weekend Specials' },
  { id: 'bbq', label: 'BBQ / Dinner' },
  { id: 'family-deals', label: 'Family Deals' },
  { id: 'addons', label: 'Add-ons' },
]

export const menuItems = [
  /* =========================================================
     BREAKFAST
  ========================================================= */

  {
    id: 'beef-nihari',
    name: 'Beef Nihari',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    price: 1250,
    image: '/images/menu/beef-nihari.jpeg',
    description: 'Slow-cooked to perfection with rich, aromatic flavours.',
    serving: 'Single Serving',
  },

  {
    id: 'special-nali-beef-nihari',
    name: 'Special Nali Beef Nihari',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    price: 1690,
    image: '/images/menu/nalli-beef-nihari.jpeg',
    description: 'Rich slow-cooked beef nihari served with special nali.',
    serving: 'Single Serving',
    badge: 'Special',
  },

  {
    id: 'beef-paya',
    name: 'Beef Paya',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    price: 1590,
    image: '/images/menu/beef-paya.jpeg',
    description: 'Traditional slow-cooked beef paya with deep desi flavour.',
    serving: 'Single Serving',
  },

  {
    id: 'special-nali-beef-paya',
    name: 'Special Nali Beef Paya',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    price: 2090,
    image: '/images/menu/nalli-beef-paya.jpeg',
    description: 'Premium beef paya served with special nali.',
    serving: 'Single Serving',
    badge: 'Special',
  },

  /* =========================================================
     LUNCH
  ========================================================= */

  {
    id: 'degi-beef-qorma',
    name: 'Degi Beef Qorma',
    category: 'lunch',
    categoryLabel: 'Lunch',
    price: 1690,
    image: '/images/menu/degi-beef-qorma.jpeg',
    description: 'Traditional degi beef qorma, rich and aromatic.',
    serving: 'Single Serving',
  },

  {
    id: 'beef-haleem',
    name: 'Beef Haleem',
    category: 'lunch',
    categoryLabel: 'Lunch',
    price: 890,
    image: '/images/menu/beef-haleem.jpeg',
    description: 'Slow-cooked beef haleem with a rich traditional finish.',
    serving: 'Single Serving',
  },

  {
    id: 'kalay-channay',
    name: 'Kalay Channay',
    category: 'lunch',
    categoryLabel: 'Lunch',
    price: 690,
    image: '/images/menu/kalay-channay.jpeg',
    description: 'Traditional black chickpeas cooked with aromatic spices.',
    serving: 'Single Serving',
  },

  /* =========================================================
     WEEKEND SPECIALS
  ========================================================= */

  {
    id: 'chicken-achari',
    name: 'Chicken Achari',
    category: 'weekend-specials',
    categoryLabel: 'Weekend Specials',
    price: 790,
    image: '/images/menu/chicken-achari.jpeg',
    description: 'Bold, tangy chicken with authentic traditional pickling spices.',
    serving: 'Single Serving',
    badge: 'Weekend Special',
  },

  /* =========================================================
     BBQ / DINNER
  ========================================================= */

  {
    id: 'chicken-tikka-leg',
    name: 'Chicken Tikka Leg',
    category: 'bbq',
    categoryLabel: 'BBQ / Dinner',
    price: 690,
    image: '/images/menu/chicken-tikka-leg.jpeg',
    description: 'Whole chicken leg tikka, BBQ grilled to perfection.',
    serving: 'Single Serving',
  },

  {
    id: 'chicken-tikka-breast',
    name: 'Chicken Tikka Chest',
    category: 'bbq',
    categoryLabel: 'BBQ / Dinner',
    price: 690,
    image: '/images/menu/chicken-tikka-breast.jpeg',
    description: 'Whole chicken chest tikka with an authentic BBQ finish.',
    serving: 'Single Serving',
  },

  {
    id: 'chicken-tikka-boti-half-with-bone',
    name: 'Chicken Tikka Boti Half (With Bone)',
    category: 'bbq',
    categoryLabel: 'BBQ / Dinner',
    price: 850,
    image: '/images/menu/chicken-boti-with-bone-half.png',
    description: 'Half serving of juicy BBQ chicken tikka boti with bone.',
    serving: 'Half',
  },

  {
    id: 'chicken-tikka-boti-full-with-bone',
    name: 'Chicken Tikka Boti Full (With Bone)',
    category: 'bbq',
    categoryLabel: 'BBQ / Dinner',
    price: 1250,
    image: '/images/menu/chicken-boti-with-bone-full.jpeg',
    description: 'Full serving of juicy BBQ chicken tikka boti with bone.',
    serving: 'Full',
  },

  {
    id: 'chicken-boti-half-boneless',
    name: 'Chicken Boti Half (Boneless)',
    category: 'bbq',
    categoryLabel: 'BBQ / Dinner',
    price: 890,
    image: '/images/menu/chicken-boti-boneless-half.jpeg',
    description: 'Tender boneless chicken boti, BBQ grilled to perfection.',
    serving: 'Half',
  },

  {
    id: 'chicken-boti-full-boneless',
    name: 'Chicken Boti Full (Boneless)',
    category: 'bbq',
    categoryLabel: 'BBQ / Dinner',
    price: 1590,
    image: '/images/menu/chicken-boti-boneless-full.jpeg',
    description: 'Full serving of tender boneless BBQ chicken boti.',
    serving: 'Full',
  },

  /* =========================================================
     FAMILY DEALS
  ========================================================= */

  {
    id: 'family-kalay-channay',
    name: 'Kalay Channay',
    category: 'family-deals',
    categoryLabel: 'Family Deals',
    price: 1590,
    image: '/images/menu/kalay-channay-family.jpeg',
    description: 'Family portion with naan, fresh salad, zeera raita and drink.',
    serving: 'Family Deal',
    badge: 'Family Deal',
  },

  {
    id: 'family-beef-haleem',
    name: 'Beef Haleem',
    category: 'family-deals',
    categoryLabel: 'Family Deals',
    price: 2290,
    image: '/images/menu/beef-haleem-family.jpeg',
    description: 'Family portion with naan, fresh salad, zeera raita and drink.',
    serving: 'Family Deal',
    badge: 'Family Deal',
  },

  {
    id: 'family-degi-beef-qorma',
    name: 'Degi Beef Qorma',
    category: 'family-deals',
    categoryLabel: 'Family Deals',
    price: 4990,
    image: '/images/menu/degi-beef-qorma-family.jpeg',
    description: 'Family portion with roghni naan, fresh salad, zeera raita and drink.',
    serving: 'Family Deal',
    badge: 'Family Deal',
  },

  {
    id: 'family-chinioti-mutton-kunna',
    name: 'Chinioti Mutton Kunna',
    category: 'family-deals',
    categoryLabel: 'Family Deals',
    price: 5990,
    image: '/images/menu/mutton-kunna-family.jpeg',
    description: 'Signature Chinioti Mutton Kunna family deal for 4–5 persons.',
    serving: 'Family Deal',
    badge: 'Signature',
  },

  {
    id: 'family-chicken-achari',
    name: 'Chicken Achari',
    category: 'family-deals',
    categoryLabel: 'Family Deals',
    price: 2390,
    image: '/images/menu/chicken-achari-family.jpeg',
    description: 'Family portion with roghni naan, fresh salad, zeera raita and drink.',
    serving: 'Family Deal',
    badge: 'Family Deal',
  },

  {
    id: 'family-special-nali-beef-nihari',
    name: 'Special Nali Beef Nihari',
    category: 'family-deals',
    categoryLabel: 'Family Deals',
    price: 5590,
    image: '/images/menu/nalli-beef-nihari-family.jpeg',
    description: 'Special nali beef nihari family deal for 4–5 persons.',
    serving: 'Family Deal',
    badge: 'Special Family Deal',
  },

  {
    id: 'family-beef-paya',
    name: 'Beef Paya',
    category: 'family-deals',
    categoryLabel: 'Family Deals',
    price: 4990,
    image: '/images/menu/beef-paya-family.jpeg',
    description: 'Traditional beef paya family deal for 4–5 persons.',
    serving: 'Family Deal',
    badge: 'Family Deal',
  },

  {
    id: 'family-special-nali-beef-paya',
    name: 'Special Nali Beef Paya',
    category: 'family-deals',
    categoryLabel: 'Family Deals',
    price: 6490,
    image: '/images/menu/nalli-beef-paya-family.jpeg',
    description: 'Premium special nali beef paya family deal for 4–5 persons.',
    serving: 'Family Deal',
    badge: 'Special Family Deal',
  },

  /* =========================================================
     ADD-ONS
  ========================================================= */

  {
    id: 'plain-naan',
    name: 'Plain Naan',
    category: 'addons',
    categoryLabel: 'Add-ons',
    price: 50,
    image: '/images/menu/plain-naan.jpeg',
    description: 'Freshly baked traditional plain naan.',
    serving: 'Add-on',
  },

  {
    id: 'roghni-naan',
    name: 'Roghni Naan',
    category: 'addons',
    categoryLabel: 'Add-ons',
    price: 120,
    image: '/images/menu/roghni-naan.jpeg',
    description: 'Rich traditional roghni naan.',
    serving: 'Add-on',
  },

  {
    id: 'garlic-naan',
    name: 'Garlic Naan',
    category: 'addons',
    categoryLabel: 'Add-ons',
    price: 95,
    image: '/images/menu/garlic-naan.jpeg',
    description: 'Fresh naan finished with aromatic garlic.',
    serving: 'Add-on',
  },

  {
    id: 'zeera-raita',
    name: 'Zeera Raita',
    category: 'addons',
    categoryLabel: 'Add-ons',
    price: 160,
    image: '/images/menu/zeera-raita.jpeg',
    description: 'Cooling yogurt raita seasoned with zeera.',
    serving: 'Add-on',
  },

  {
    id: 'pudina-raita',
    name: 'Pudina Raita',
    category: 'addons',
    categoryLabel: 'Add-ons',
    price: 160,
    image: '/images/menu/pudina-raita.jpeg',
    description: 'Refreshing mint yogurt raita.',
    serving: 'Add-on',
  },

  {
    id: 'mixed-pickle',
    name: 'Mixed Pickle',
    category: 'addons',
    categoryLabel: 'Add-ons',
    price: 70,
    image: '/images/menu/mixed-pickle.jpeg',
    description: 'Traditional mixed achar with bold desi flavour.',
    serving: 'Add-on',
  },

  {
    id: 'mineral-water',
    name: 'Mineral Water 500ml',
    category: 'addons',
    categoryLabel: 'Add-ons',
    price: 80,
    image: '/images/menu/mineral-water.jpeg',
    description: '500ml mineral water.',
    serving: 'Add-on',
  },

  {
    id: 'soft-drink',
    name: 'Soft Drink 250ml Can',
    category: 'addons',
    categoryLabel: 'Add-ons',
    price: 140,
    image: '/images/menu/soft-drink.jpeg',
    description: 'Chilled 250ml soft drink can.',
    serving: 'Add-on',
  },
]

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price)