export const menuCategories = [
  { id: 'all', label: 'All' },
  { id: 'single', label: 'Single Dishes (À La Carte)' },
  { id: 'combo', label: 'Combo Deals (Complete Meal)' },
  { id: 'addons', label: 'Add-ons' },
];

export const COMBO_INCLUSIONS_BY_PORTION = {
  single: ['2 Sada Naan', '1 Fresh Salad', '250ml Drink Can'],
  half: ['4 Sada Naan', '1 Fresh Salad', '500ml Chilled Drink'],
  full: ['6 Sada Naan', '1 Fresh Salad', '1 Special Raita', '1L Chilled Drink']
};

export const menuItems = [
  /* =========================================================
     DESIKART SPECIALS (Chinioti Mutton Kunna & Chicken Achari)
  ========================================================= */
  // 1. Chinioti Mutton Kunna
  {
    id: 'mutton-kunna-alacarte',
    name: 'Chinioti Mutton Kunna',
    category: 'single',
    subCategory: 'specials',
    subCategoryLabel: 'DesiKart Specials',
    image: '/images/menu/mutton_kunna.jpeg',
    description: 'Authentic clay-pot slow-cooked mutton prepared with traditional spices.',
    badge: 'Special',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 1290, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 2590, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 5190, complimentary: [] }
    ]
  },
  {
    id: 'mutton-kunna-combo',
    name: 'Chinioti Mutton Kunna',
    category: 'combo',
    subCategory: 'specials',
    subCategoryLabel: 'DesiKart Specials',
    image: '/images/menu/mutton_kunna.jpeg',
    description: 'Authentic clay-pot mutton served with freshly baked naan, salad & drink.',
    badge: 'Special Deal',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 1590, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 2990, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 5890, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  // 2. Chicken Achari
  {
    id: 'chicken-achari-alacarte',
    name: 'Chicken Achari',
    category: 'single',
    subCategory: 'specials',
    subCategoryLabel: 'DesiKart Specials',
    image: '/images/menu/chicken_achari.jpeg',
    description: 'Tender chicken simmered in tangy, aromatic traditional pickling spices.',
    badge: 'Special',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 790, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 1390, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 2490, complimentary: [] }
    ]
  },
  {
    id: 'chicken-achari-combo',
    name: 'Chicken Achari',
    category: 'combo',
    subCategory: 'specials',
    subCategoryLabel: 'DesiKart Specials',
    image: '/images/menu/chicken_achari.jpeg',
    description: 'Tangy pickling chicken served with freshly baked naan, salad & chilled drink.',
    badge: 'Special Deal',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 1090, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 1790, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 3190, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  /* =========================================================
     MAIN DISHES (À LA CARTE & COMBOS)
  ========================================================= */
  // 3. Beef Nihari
  {
    id: 'beef-nihari-alacarte',
    name: 'Beef Nihari',
    category: 'single',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/beef_nihari.jpeg',
    description: 'Slow-cooked tender shank beef simmered in authentic fragrant spiced gravy.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 590, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 1190, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 2290, complimentary: [] }
    ]
  },
  {
    id: 'beef-nihari-combo',
    name: 'Beef Nihari',
    category: 'combo',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/beef_nihari.jpeg',
    description: 'Signature slow-cooked beef nihari complete meal with naan, salad & drink.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 890, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 1590, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 2990, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  // 4. Special Nali Beef Nihari
  {
    id: 'special-nali-nihari-alacarte',
    name: 'Special Nali Beef Nihari',
    category: 'single',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/nali_beef_nihari.jpeg',
    description: 'Rich slow-cooked beef nihari topped with prime bone marrow nali.',
    badge: 'Special',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 790, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 1590, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 3090, complimentary: [] }
    ]
  },
  {
    id: 'special-nali-nihari-combo',
    name: 'Special Nali Beef Nihari',
    category: 'combo',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/nali_beef_nihari.jpeg',
    description: 'Special nali beef nihari complete meal with fresh naan, salad & drink.',
    badge: 'Special',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 1090, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 1990, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 3790, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  // 5. Beef Paya
  {
    id: 'beef-paya-alacarte',
    name: 'Beef Paya',
    category: 'single',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/beef_paya.jpeg',
    description: 'Overnight simmered traditional beef trotters in rich, collagenous broth.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 790, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 1590, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 3090, complimentary: [] }
    ]
  },
  {
    id: 'beef-paya-combo',
    name: 'Beef Paya',
    category: 'combo',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/beef_paya.jpeg',
    description: 'Traditional beef trotters complete meal served with naan, salad & chilled drink.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 1090, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 1990, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 3790, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  // 6. Special Nali Beef Paya
  {
    id: 'special-nali-paya-alacarte',
    name: 'Special Nali Beef Paya',
    category: 'single',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/nali_beef_paya.jpeg',
    description: 'Traditional slow-cooked beef paya topped with rich nali bone marrow.',
    badge: 'Special',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 990, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 1990, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 3890, complimentary: [] }
    ]
  },
  {
    id: 'special-nali-paya-combo',
    name: 'Special Nali Beef Paya',
    category: 'combo',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/nali_beef_paya.jpeg',
    description: 'Special nali beef paya complete meal with fresh naan, salad & drink.',
    badge: 'Special',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 1290, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 2390, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 4590, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  // 7. Degi Beef Qorma
  {
    id: 'degi-qorma-alacarte',
    name: 'Degi Beef Qorma',
    category: 'single',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/beef_qorma.jpeg',
    description: 'Traditional degi style beef qorma made with caramelized onions and yogurt.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 990, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 1990, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 3890, complimentary: [] }
    ]
  },
  {
    id: 'degi-qorma-combo',
    name: 'Degi Beef Qorma',
    category: 'combo',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/degi_beef_qorma.jpeg',
    description: 'Traditional degi beef qorma complete meal with fresh naan, salad & drink.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 1290, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 2390, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 4590, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  // 8. Beef Haleem
  {
    id: 'beef-haleem-alacarte',
    name: 'Beef Haleem',
    category: 'single',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/beef_haleem.jpeg',
    description: 'Slow-cooked pulses and tender beef simmered to silky perfection.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 690, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 990, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 1790, complimentary: [] }
    ]
  },
  {
    id: 'beef-haleem-combo',
    name: 'Beef Haleem',
    category: 'combo',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/beef_haleem.jpeg',
    description: 'Beef haleem complete meal served with fresh naan, salad & chilled drink.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 990, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 1390, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 2490, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  // 9. Kalay Channay
  {
    id: 'kalay-channay-alacarte',
    name: 'Kalay Channay',
    category: 'single',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/kalay_channay.jpeg',
    description: 'Traditional spiced black chickpeas in deep aromatic gravy.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 490, complimentary: [] },
      { id: 'half', label: 'Half (500g)', price: 790, complimentary: [] },
      { id: 'full', label: 'Full (1kg)', price: 1390, complimentary: [] }
    ]
  },
  {
    id: 'kalay-channay-combo',
    name: 'Kalay Channay',
    category: 'combo',
    subCategory: 'mains',
    subCategoryLabel: 'Main Dishes',
    image: '/images/menu/kalay_channay.jpeg',
    description: 'Authentic kalay channay complete meal with fresh naan, salad & chilled drink.',
    variations: [
      { id: 'single', label: 'Single (250g)', price: 790, complimentary: COMBO_INCLUSIONS_BY_PORTION.single },
      { id: 'half', label: 'Half (500g)', price: 1190, complimentary: COMBO_INCLUSIONS_BY_PORTION.half },
      { id: 'full', label: 'Full (1kg)', price: 2090, complimentary: COMBO_INCLUSIONS_BY_PORTION.full }
    ]
  },

  /* =========================================================
     ADD-ONS
  ========================================================= */
  {
    id: 'plain-naan',
    name: 'Plain Naan',
    category: 'addons',
    subCategory: 'addons',
    subCategoryLabel: 'Add-ons',
    price: 50,
    image: '/images/menu/plain_naan.jpeg',
    description: 'Freshly baked traditional plain sada naan.',
    serving: 'Add-on',
    complimentary: [],
  },
  {
    id: 'roghni-naan',
    name: 'Roghni Naan',
    category: 'addons',
    subCategory: 'addons',
    subCategoryLabel: 'Add-ons',
    price: 120,
    image: '/images/menu/roghni_naan.jpeg',
    description: 'Rich traditional roghni naan glazed with butter & sesame.',
    serving: 'Add-on',
    complimentary: [],
  },
  {
    id: 'extra-nali',
    name: '1 Nali (Beef)',
    category: 'addons',
    subCategory: 'addons',
    subCategoryLabel: 'Add-ons',
    price: 200,
    image: '/images/menu/nali.jpeg',
    description: 'Single portion of rich beef bone marrow.',
    serving: 'Add-on',
    complimentary: [],
  },
  {
    id: 'zeera-raita',
    name: 'Zeera Raita (10 oz)',
    category: 'addons',
    subCategory: 'addons',
    subCategoryLabel: 'Add-ons',
    price: 160,
    image: '/images/menu/zeera_raita.jpeg',
    description: 'Cooling yogurt raita seasoned with roasted zeera.',
    serving: 'Add-on (10 oz)',
    complimentary: [],
  },
  {
    id: 'pudina-chutney',
    name: 'Pudina Chutney (10 oz)',
    category: 'addons',
    subCategory: 'addons',
    subCategoryLabel: 'Add-ons',
    price: 160,
    image: '/images/menu/pudina_chatney.jpeg',
    description: 'Refreshing homemade mint chutney.',
    serving: 'Add-on (10 oz)',
    complimentary: [],
  },
  {
    id: 'mixed-pickle',
    name: 'Mixed Pickle (2 oz)',
    category: 'addons',
    subCategory: 'addons',
    subCategoryLabel: 'Add-ons',
    price: 70,
    image: '/images/menu/mixed_pickle.jpeg',
    description: 'Traditional desi mixed achar.',
    serving: 'Add-on (2 oz)',
    complimentary: [],
  },
  {
    id: 'mineral-water',
    name: 'Mineral Water (500ml)',
    category: 'addons',
    subCategory: 'addons',
    subCategoryLabel: 'Add-ons',
    price: 80,
    image: '/images/menu/mineral_water.jpeg',
    description: '500ml chilled mineral water.',
    serving: 'Add-on',
    complimentary: [],
  },
  {
    id: 'soft-drink',
    name: 'Soft Drink (250ml Can)',
    category: 'addons',
    subCategory: 'addons',
    subCategoryLabel: 'Add-ons',
    price: 150,
    image: '/images/menu/soft_drink.jpeg',
    description: 'Chilled 250ml soft drink can.',
    serving: 'Add-on',
    complimentary: [],
  },
];

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price);