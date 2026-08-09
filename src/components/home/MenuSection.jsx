import { useMemo, useState } from "react";

import {
  menuCategories,
  menuItems,
  formatPrice,
} from "../../data/menu";

import { useCart } from "../../context/CartContext";

/* =========================================================
   DISH IMAGE
========================================================= */

function DishThumb({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#18110B] to-[#0F0A06]">
        <div className="text-center">
          <div className="mb-2 text-3xl text-[#7D6134]">🍽</div>
          <p className="font-display text-base italic text-[#9C8460]">
            Photo coming soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
    />
  );
}

/* =========================================================
   MENU CARD
========================================================= */

function MenuCard({ item, index }) {
  const { addToCart, cartItems } = useCart();

  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );

  const quantity = existingItem?.quantity || 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#D4A24C]/15 bg-[#100C09] shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A24C]/40 hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)]">
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <DishThumb src={item.image} alt={item.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0705]/90 via-transparent to-transparent" />

        {item.badge && (
          <span className="absolute right-4 top-4 rounded-full bg-[#D4A24C] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1A0F04]">
            {item.badge}
          </span>
        )}

        <span className="font-display absolute left-4 top-4 text-lg italic text-[#E7D9BF]/75">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-6 text-left">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C4863F]">
          {item.categoryLabel}
        </p>

        <h3 className="font-display text-[26px] font-semibold leading-tight text-[#F5E7D2]">
          {item.name}
        </h3>

        <p className="mt-3 text-[14px] leading-7 text-[#B6A18A]">
          {item.description}
        </p>

        <div className="flex-1" />

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/20 to-transparent" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#89755A]">
              {item.serving}
            </p>
            <h4 className="font-display mt-0.5 text-[24px] font-semibold text-[#E8BB65]">
              {formatPrice(item.price)}
            </h4>
          </div>

          <button
            type="button"
            onClick={() => addToCart(item)}
            className="flex shrink-0 items-center justify-center gap-2.5 rounded-full border border-[#D4A24C] bg-gradient-to-r from-[#9C6424] via-[#D5A246] to-[#AF7129] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-[#150C04] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(212,162,76,.30)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0"
            >
              <path d="M3 4h2l2.2 9.2a2 2 0 0 0 2 1.6h6.8a2 2 0 0 0 2-1.6L20 7H6" />
              <circle cx="10" cy="19" r="1.2" />
              <circle cx="17" cy="19" r="1.2" />
            </svg>
            <span className="whitespace-nowrap">
              {quantity > 0 ? `Added (${quantity})` : "Add"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MENU SECTION
========================================================= */

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="menu" className="bg-[#080604] py-28">
      <div className="dk-container flex flex-col items-center gap-24 text-center">
        {/* =============== BLOCK 1: HEADING =============== */}
        <div className="flex max-w-2xl flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#D4A24C]" />
            <span className="h-2 w-2 rotate-45 border border-[#D4A24C]" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#D4A24C]" />
          </div>

          <h1 className="font-display text-5xl font-semibold italic leading-none text-[#E9C57D] sm:text-6xl lg:text-7xl">
            Our Menu
          </h1>

          <h2 className="font-display text-2xl text-[#F7EAD6] sm:text-3xl">
            Authentic Desi Favourites
          </h2>

          <p className="text-[15px] leading-8 text-[#AA9A87]">
            From slow-cooked breakfast classics to hearty lunches, BBQ
            favourites, traditional family meals and weekend signature
            dishes — every recipe is prepared fresh with authentic desi
            flavours and premium ingredients.
          </p>
        </div>

        {/* =============== BLOCK 2: CTA =============== */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/923115077779"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[58px] min-w-[240px] items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_25px_rgba(37,211,102,0.25)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#20BD5A] hover:shadow-[0_14px_35px_rgba(37,211,102,0.4)] whitespace-nowrap"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m0-18.322c-4.653 0-8.439 3.786-8.441 8.44 0 1.487.389 2.94 1.127 4.216l.173.299-.668 2.441 2.498-.655.288.171a8.412 8.412 0 004.22 1.132h.004c4.65 0 8.437-3.786 8.439-8.44A8.397 8.397 0 0017.07 3.463 8.397 8.397 0 0012.051 1z" />
            </svg>
            <span>Order on WhatsApp</span>
          </a>

          <a
            href="tel:+923115077779"
            className="flex min-h-[58px] min-w-[200px] items-center justify-center gap-3 rounded-full border border-[#D4A24C]/40 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#E8D4B4] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#D4A24C]/70 hover:text-[#D4A24C] whitespace-nowrap"
          >
            <span>Call to Order</span>
          </a>
        </div>

        {/* =============== BLOCK 3: MENU EXPLORER =============== */}
        <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-b border-[#D4A24C]/10 pb-6">
          {menuCategories.map((category) => {
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`relative pb-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                  active
                    ? "text-[#E7C075]"
                    : "text-[#766A5D] hover:text-[#D4A24C]"
                }`}
              >
                {category.label}
                <span
                  className={`absolute -bottom-[26px] left-0 h-[2px] bg-[#D4A24C] transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* =============== BLOCK 4: ACTUAL MENU =============== */}
        <div className="w-full">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 text-left sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#D4A24C]/15 bg-[#100C09] py-14">
              <h3 className="font-display text-3xl text-[#F5EAD8]">
                No dishes found
              </h3>
              <p className="mt-3 text-[#9E8A73]">
                Please choose another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;