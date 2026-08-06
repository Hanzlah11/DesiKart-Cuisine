import { useEffect, useRef } from 'react'

export default function OrderCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible'))
      },
      { threshold: 0.2 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="order"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 100%, rgba(228,87,30,0.2) 0%, #050505 60%)',
      }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #E4571E, transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="reveal">
          <p
            className="font-poppins text-xs tracking-widest mb-4"
            style={{ color: '#E4571E' }}
          >
            ✦ ORDER NOW ✦
          </p>
          <h2
            className="font-cinzel font-black mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F5E8D0' }}
          >
            Craving Authentic{' '}
            <span style={{ color: '#D4A24C' }}>Desi Food?</span>
          </h2>
          <p
            className="font-poppins text-base mb-10"
            style={{ color: '#F5E8D0', opacity: 0.7, maxWidth: '500px', margin: '0 auto 40px' }}
          >
            Order fresh, hot, and authentic desi food delivered straight to your door. We're just
            a message away!
          </p>

          {/* Offer badge */}
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-10"
            style={{
              background: 'rgba(228,87,30,0.1)',
              border: '1px solid rgba(228,87,30,0.4)',
            }}
          >
            <span className="text-lg">🎉</span>
            <span className="font-poppins font-semibold text-sm" style={{ color: '#E4571E' }}>
              New Customer Offer: 20% OFF — Use Code:{' '}
            </span>
            <span
              className="font-cinzel font-bold text-sm px-3 py-0.5 rounded"
              style={{ background: '#E4571E', color: '#fff' }}
            >
              DESIKART20
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/923115077779"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-poppins font-semibold text-base transition-all duration-300"
              style={{
                background: '#25D366',
                color: '#fff',
                boxShadow: '0 0 30px rgba(37,211,102,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 0 50px rgba(37,211,102,0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(37,211,102,0.4)'
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order on WhatsApp
            </a>

            <a
              href="https://www.foodpanda.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-poppins font-semibold text-base transition-all duration-300"
              style={{
                background: 'rgba(255,45,120,0.1)',
                border: '1px solid rgba(255,45,120,0.4)',
                color: '#ff2d78',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ff2d78'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,45,120,0.1)'
                e.currentTarget.style.color = '#ff2d78'
              }}
            >
              🐼 View on FoodPanda
            </a>

            <a
              href="tel:+923115077779"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-poppins font-semibold text-base transition-all duration-300"
              style={{
                background: 'rgba(212,162,76,0.1)',
                border: '1px solid rgba(212,162,76,0.4)',
                color: '#D4A24C',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#D4A24C'
                e.currentTarget.style.color = '#050505'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(212,162,76,0.1)'
                e.currentTarget.style.color = '#D4A24C'
              }}
            >
              📞 Call Now
            </a>
          </div>

          {/* Phone number */}
          <p className="font-poppins text-sm mt-8" style={{ color: '#F5E8D0', opacity: 0.5 }}>
            📱 0311 5077779 — We're just a message away!
          </p>
        </div>
      </div>
    </section>
  )
}