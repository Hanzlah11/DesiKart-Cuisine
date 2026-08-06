import { useEffect, useRef } from 'react'

const features = [
  {
    icon: '🍲',
    title: 'Authentic Desi Taste',
    desc: 'Real recipes, true flavours and the perfect blend of traditional spices passed down through generations.',
  },
  {
    icon: '🌿',
    title: 'Premium Ingredients',
    desc: 'We use only high-quality, fresh and carefully sourced ingredients — no shortcuts, ever.',
  },
  {
    icon: '🛡️',
    title: 'Hygienic & Safe',
    desc: 'Our kitchen follows strict hygiene standards to ensure safe and healthy food every single time.',
  },
  {
    icon: '🚀',
    title: 'Fast & Reliable Delivery',
    desc: 'Hot, fresh and on time — delivered to your doorstep with care.',
  },
  {
    icon: '❤️',
    title: 'Cooked With Love',
    desc: 'Every dish is made the way we would serve our own family — with love, patience and respect.',
  },
  {
    icon: '✨',
    title: 'Freshly Made Daily',
    desc: 'No pre-cooked batches. Everything is prepared fresh the same day, every day.',
  },
]

export default function WhyUs() {
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
      id="why-us"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="reveal-left relative">
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(228,87,30,0.15) 0%, transparent 70%)',
              }}
            />
            <img
              src="/images/story.jpg"
              alt="Our Kitchen"
              className="relative w-full rounded-2xl object-cover"
              style={{
                maxHeight: '600px',
                border: '1px solid rgba(212,162,76,0.3)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
              }}
            />

            {/* Floating card */}
            <div
              className="absolute bottom-6 right-6 px-5 py-4 rounded-xl"
              style={{
                background: 'rgba(5,5,5,0.92)',
                border: '1px solid rgba(212,162,76,0.4)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="font-cinzel font-bold text-lg" style={{ color: '#D4A24C' }}>
                From Our Kitchen
              </div>
              <div className="font-poppins text-sm mt-1" style={{ color: '#F5E8D0', opacity: 0.7 }}>
                To Your Heart ❤️
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className="reveal-right">
            <p
              className="font-poppins text-xs tracking-widest mb-3"
              style={{ color: '#D4A24C' }}
            >
              ✦ WHY CHOOSE US ✦
            </p>
            <h2
              className="font-cinzel font-bold mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F5E8D0' }}
            >
              Why Choose{' '}
              <span style={{ color: '#D4A24C' }}>DesiKart</span>
              <br />
              <span style={{ color: '#E4571E' }}>Cuisine?</span>
            </h2>
            <div className="gold-divider mb-8" style={{ marginLeft: 0 }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="group flex gap-4 p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(212,162,76,0.15)',
                    transitionDelay: `${i * 60}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212,162,76,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(212,162,76,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                    e.currentTarget.style.borderColor = 'rgba(212,162,76,0.15)'
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ background: 'rgba(212,162,76,0.1)' }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h4
                      className="font-poppins font-semibold text-sm mb-1"
                      style={{ color: '#D4A24C' }}
                    >
                      {f.title}
                    </h4>
                    <p
                      className="font-poppins text-xs leading-relaxed"
                      style={{ color: '#F5E8D0', opacity: 0.65 }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}