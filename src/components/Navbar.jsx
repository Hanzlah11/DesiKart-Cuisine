import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#specialties', label: 'Specialties' },
    { href: '#menu', label: 'Menu' },
    { href: '#story', label: 'Our Story' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#order', label: 'Order' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(212,162,76,0.2)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="DesiKart Cuisine"
            className="w-12 h-12 rounded-full object-cover"
            style={{ border: '2px solid rgba(212,162,76,0.5)' }}
          />
          <div>
            <div
              className="font-cinzel font-bold text-lg leading-tight"
              style={{ color: '#F5E8D0' }}
            >
              Desi<span style={{ color: '#E4571E' }}>Kart</span>
            </div>
            <div
              className="font-poppins text-xs leading-tight"
              style={{ color: '#D4A24C', letterSpacing: '0.1em' }}
            >
              CUISINE
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-poppins text-sm transition-colors duration-200"
              style={{ color: '#F5E8D0' }}
              onMouseEnter={(e) => (e.target.style.color = '#D4A24C')}
              onMouseLeave={(e) => (e.target.style.color = '#F5E8D0')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Order Now button */}
        <a
          href="https://wa.me/923115077779"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-poppins font-medium text-sm transition-all duration-300"
          style={{
            background: '#E4571E',
            color: '#fff',
            boxShadow: '0 0 20px rgba(228,87,30,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 35px rgba(228,87,30,0.7)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(228,87,30,0.4)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Order Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{ background: '#D4A24C' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: 'rgba(5,5,5,0.98)', borderTop: '1px solid rgba(212,162,76,0.2)' }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-poppins text-sm py-2"
              style={{ color: '#F5E8D0', borderBottom: '1px solid rgba(212,162,76,0.1)' }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/923115077779"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center py-3 rounded-full font-poppins font-medium text-sm mt-2"
            style={{ background: '#E4571E', color: '#fff' }}
          >
            Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}