import { useEffect, useRef } from 'react'

export default function OurStory() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible'))
      },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) =>
      observer.observe(el)
    )
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(228,87,30,0.08) 0%, #050505 60%)',
      }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A24C, transparent)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <div className="reveal mb-12">
          <p
            className="font-poppins text-xs tracking-widest mb-3"
            style={{ color: '#D4A24C' }}
          >
            ✦ OUR STORY ✦
          </p>
          <h2
            className="font-cinzel font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F5E8D0' }}
          >
            From Our Kitchen{' '}
            <span style={{ color: '#D4A24C' }}>To Your Heart</span>
          </h2>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Story text */}
        <div className="reveal max-w-3xl mx-auto mb-16">
          <p
            className="font-poppins text-base leading-relaxed mb-5"
            style={{ color: '#F5E8D0', opacity: 0.85 }}
          >
            <strong style={{ color: '#D4A24C' }}>DesiKart</strong> was born from a simple
            belief — that real food has the power to bring people closer.
          </p>
          <p
            className="font-poppins text-sm leading-relaxed mb-5"
            style={{ color: '#F5E8D0', opacity: 0.7 }}
          >
            What started as a passion for authentic Desi flavours soon turned into a mission to
            deliver the true taste of tradition right to your doorstep.
          </p>
          <p
            className="font-poppins text-sm leading-relaxed mb-5"
            style={{ color: '#F5E8D0', opacity: 0.7 }}
          >
            Every recipe at DesiKart Cuisine is crafted with care, using traditional cooking
            techniques, premium ingredients and a lot of heart. From slow-cooked Nihari to smoky
            BBQ, from rich Haleem to comforting Paya, we prepare every dish the way it should
            be — with time, patience and love.
          </p>
          <p
            className="font-poppins text-sm leading-relaxed"
            style={{ color: '#F5E8D0', opacity: 0.7 }}
          >
            We are not just a cloud kitchen. We are a promise of quality, hygiene and
            unforgettable taste.
          </p>

          <div className="mt-8">
            <p
              className="font-cinzel font-bold text-xl"
              style={{ color: '#D4A24C' }}
            >
              "From Our Kitchen To Your Heart."
            </p>
            <p className="font-poppins text-sm mt-2" style={{ color: '#F5E8D0', opacity: 0.5 }}>
              Enjoy the taste of tradition, delivered with love.
            </p>
          </div>
        </div>

        {/* Tandoor image */}
        <div className="reveal-left mb-12">
          <img
            src="/images/tandoor.jpg"
            alt="Our Tandoor"
            className="w-full max-w-2xl mx-auto rounded-2xl object-cover"
            style={{
              maxHeight: '400px',
              border: '1px solid rgba(212,162,76,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(228,87,30,0.1)',
            }}
          />
        </div>

        {/* Stats row */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: '🏆', label: 'Authentic Recipes', sub: 'Traditional & Time-tested' },
            { icon: '🌿', label: 'Fresh Ingredients', sub: 'Sourced Daily' },
            { icon: '🔥', label: 'Slow Cooked', sub: 'Hours of Preparation' },
            { icon: '🚀', label: 'Fast Delivery', sub: 'Hot to Your Door' },
          ].map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-xl"
              style={{
                background: 'rgba(212,162,76,0.05)',
                border: '1px solid rgba(212,162,76,0.2)',
              }}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div
                className="font-poppins font-semibold text-sm mb-1"
                style={{ color: '#D4A24C' }}
              >
                {s.label}
              </div>
              <div
                className="font-poppins text-xs"
                style={{ color: '#F5E8D0', opacity: 0.5 }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A24C, transparent)' }}
      />
    </section>
  )
}