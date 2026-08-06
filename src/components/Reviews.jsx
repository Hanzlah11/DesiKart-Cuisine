import { useEffect, useRef } from 'react'
import { reviews } from '../data/menuData'

export default function Reviews() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible'))
      },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 reveal">
          <p
            className="font-poppins text-xs tracking-widest mb-3"
            style={{ color: '#D4A24C' }}
          >
            ✦ WHAT CUSTOMERS SAY ✦
          </p>
          <h2
            className="font-cinzel font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F5E8D0' }}
          >
            Customer <span style={{ color: '#D4A24C' }}>Reviews</span>
          </h2>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="reveal group p-6 rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,162,76,0.15)',
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,162,76,0.05)'
                e.currentTarget.style.borderColor = 'rgba(212,162,76,0.35)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(212,162,76,0.15)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(r.stars)
                  .fill(null)
                  .map((_, j) => (
                    <span key={j} style={{ color: '#D4A24C', fontSize: '14px' }}>
                      ★
                    </span>
                  ))}
              </div>

              {/* Quote */}
              <p
                className="font-poppins text-sm leading-relaxed mb-5"
                style={{ color: '#F5E8D0', opacity: 0.75 }}
              >
                "{r.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel font-bold text-sm"
                  style={{ background: 'rgba(212,162,76,0.15)', color: '#D4A24C' }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div
                    className="font-poppins font-semibold text-sm"
                    style={{ color: '#F5E8D0' }}
                  >
                    {r.name}
                  </div>
                  <div
                    className="font-poppins text-xs"
                    style={{ color: '#D4A24C', opacity: 0.7 }}
                  >
                    📍 {r.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FoodPanda rating badge */}
        <div className="text-center mt-12 reveal">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(255,45,120,0.08)',
              border: '1px solid rgba(255,45,120,0.3)',
            }}
          >
            <span style={{ fontSize: '20px' }}>🐼</span>
            <div className="text-left">
              <div
                className="font-poppins font-semibold text-sm"
                style={{ color: '#ff2d78' }}
              >
                Available on FoodPanda
              </div>
              <div className="flex gap-0.5 mt-0.5">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <span key={i} style={{ color: '#ff2d78', fontSize: '11px' }}>
                      ★
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}