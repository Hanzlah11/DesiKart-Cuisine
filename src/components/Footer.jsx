export default function Footer() {
  return (
    <footer
      className="pt-16 pb-6 relative"
      style={{ background: '#030303', borderTop: '1px solid rgba(212,162,76,0.2)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="DesiKart Cuisine"
                className="w-14 h-14 rounded-full object-cover"
                style={{ border: '2px solid rgba(212,162,76,0.4)' }}
              />
              <div>
                <div className="font-cinzel font-bold text-xl" style={{ color: '#F5E8D0' }}>
                  Desi<span style={{ color: '#E4571E' }}>Kart</span>
                </div>
                <div
                  className="font-poppins text-xs tracking-widest"
                  style={{ color: '#D4A24C' }}
                >
                  CUISINE
                </div>
              </div>
            </div>
            <p
              className="font-poppins text-xs leading-relaxed mb-4"
              style={{ color: '#F5E8D0', opacity: 0.55 }}
            >
              Authentic Desi Flavours — Slow Cooked With Passion, Served With Love.
            </p>
            <p
              className="font-cinzel text-sm italic"
              style={{ color: '#D4A24C' }}
            >
              ❤ Desi Swaad, Dil Se
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-cinzel font-bold text-sm mb-5"
              style={{ color: '#D4A24C', letterSpacing: '0.1em' }}
            >
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#specialties', label: 'Specialties' },
                { href: '#menu', label: 'Our Menu' },
                { href: '#story', label: 'Our Story' },
                { href: '#reviews', label: 'Reviews' },
                { href: '#order', label: 'Order Now' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-poppins text-xs transition-colors duration-200"
                    style={{ color: '#F5E8D0', opacity: 0.6 }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#D4A24C'
                      e.target.style.opacity = '1'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#F5E8D0'
                      e.target.style.opacity = '0.6'
                    }}
                  >
                    → {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-cinzel font-bold text-sm mb-5"
              style={{ color: '#D4A24C', letterSpacing: '0.1em' }}
            >
              CONTACT US
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/923115077779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-poppins text-xs flex items-center gap-2 transition-colors duration-200"
                  style={{ color: '#25D366' }}
                >
                  <span>📱</span> 0311 5077779
                </a>
              </li>
              <li>
                <span className="font-poppins text-xs flex items-center gap-2" style={{ color: '#F5E8D0', opacity: 0.6 }}>
                  <span>⏰</span> Breakfast: 7 AM – 11 AM
                </span>
              </li>
              <li>
                <span className="font-poppins text-xs flex items-center gap-2" style={{ color: '#F5E8D0', opacity: 0.6 }}>
                  <span>🔥</span> BBQ/Dinner: Evening Daily
                </span>
              </li>
              <li>
                <span className="font-poppins text-xs flex items-center gap-2" style={{ color: '#F5E8D0', opacity: 0.6 }}>
                  <span>📍</span> Rawalpindi, Punjab
                </span>
              </li>
            </ul>
          </div>

          {/* Social + Delivery */}
          <div>
            <h4
              className="font-cinzel font-bold text-sm mb-5"
              style={{ color: '#D4A24C', letterSpacing: '0.1em' }}
            >
              FOLLOW & ORDER
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                {
                  href: 'https://facebook.com/DesiKartCuisine',
                  label: 'Facebook',
                  bg: '#1877F2',
                  icon: (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://instagram.com/desikart.cuisine',
                  label: 'Instagram',
                  bg: '#E1306C',
                  icon: (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://wa.me/923115077779',
                  label: 'WhatsApp',
                  bg: '#25D366',
                  icon: (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: `${s.bg}20`, border: `1px solid ${s.bg}60`, color: s.bg }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = s.bg
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${s.bg}20`
                    e.currentTarget.style.color = s.bg
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* FoodPanda */}
            <a
              href="https://www.foodpanda.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-poppins text-xs transition-colors duration-200"
              style={{ color: '#ff2d78' }}
            >
              🐼 Available on FoodPanda ★★★★★
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(212,162,76,0.15)' }}
        >
          <p
            className="font-poppins text-xs"
            style={{ color: '#F5E8D0', opacity: 0.4 }}
          >
            © 2025 DesiKart Cuisine. All rights reserved.
          </p>
          <p
            className="font-poppins text-xs"
            style={{ color: '#D4A24C', opacity: 0.6 }}
          >
            Desi Swaad, Dil Se ❤
          </p>
        </div>
      </div>
    </footer>
  )
}