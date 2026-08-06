import { useEffect, useRef } from 'react'
import { specialties } from '../data/menuData'

export default function Specialties() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="specialties"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #E4571E 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4A24C 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16 reveal">
          <p
            className="font-poppins text-xs tracking-widest mb-3"
            style={{ color: '#D4A24C' }}
          >
            ✦ OUR SPECIALTIES ✦
          </p>
          <h2
            className="font-cinzel font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F5E8D0' }}
          >
            Featured <span style={{ color: '#D4A24C' }}>Categories</span>
          </h2>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {specialties.map((item, i) => (
            <a
              key={item.name}
              href="#menu"
              className="specialty-card reveal group block rounded-2xl overflow-hidden relative cursor-pointer"
              style={{
                transitionDelay: `${i * 80}ms`,
                border: '1px solid rgba(212,162,76,0.2)',
                background: '#111',
              }}
            >
              {/* Image */}
              <div className="overflow-hidden aspect-square">
                <img
                  src={item.img}
                  alt={item.name}
                  className="card-img w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-400"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%)',
                }}
              />

              {/* Hover glow border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ boxShadow: `inset 0 0 0 1px ${item.color}` }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3
                  className="font-cinzel font-bold text-sm mb-1"
                  style={{ color: '#F5E8D0' }}
                >
                  {item.name}
                </h3>
                <p
                  className="font-poppins text-xs leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: '#D4A24C' }}
                >
                  {item.desc}
                </p>
                {/* Quick order */}
                <div
                  className="mt-2 text-xs font-poppins font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: '#E4571E' }}
                >
                  Order Now →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}