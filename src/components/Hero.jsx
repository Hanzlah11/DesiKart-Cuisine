import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: Math.random() * 80 + 20,
        speedY: Math.random() * 0.4 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.12,
        type: Math.random() > 0.8 ? 'ember' : 'smoke',
      })
    }

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.y -= p.speedY
        p.x += p.speedX

        if (p.y < -p.size) {
          p.y = canvas.height + 50
          p.x = Math.random() * canvas.width
        }

        if (p.type === 'ember') {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 3)
          grad.addColorStop(0, `rgba(228,87,30,${p.opacity * 6})`)
          grad.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        } else {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          grad.addColorStop(0, `rgba(180,180,180,${p.opacity})`)
          grad.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 50%, #1a0800 0%, #050505 70%)' }}
    >
      {/* Smoke/ember canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 60%, rgba(228,87,30,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="fade-in-left order-2 lg:order-1">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                border: '1px solid rgba(212,162,76,0.4)',
                background: 'rgba(212,162,76,0.08)',
              }}
            >
              <span style={{ color: '#D4A24C', fontSize: '12px', letterSpacing: '0.15em' }}>
                ✦ AUTHENTIC DESI FLAVOURS ✦
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-cinzel font-black leading-tight mb-4">
              <span
                className="block"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: '#F5E8D0' }}
              >
                Authentic
              </span>
              <span
                className="block"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: '#D4A24C' }}
              >
                Desi
              </span>
              <span
                className="block"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: '#E4571E' }}
              >
                Flavours
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div style={{ height: '1px', width: '40px', background: '#D4A24C' }} />
              <span
                className="font-cinzel text-xs tracking-widest"
                style={{ color: '#D4A24C' }}
              >
                DESI SWAAD, DIL SE
              </span>
              <div style={{ height: '1px', width: '40px', background: '#D4A24C' }} />
            </div>

            <p
              className="font-poppins text-base leading-relaxed mb-3"
              style={{ color: '#F5E8D0', opacity: 0.85 }}
            >
              Slow Cooked With Passion. Served With Love.
            </p>
            <p
              className="font-poppins text-sm leading-relaxed mb-8"
              style={{ color: '#F5E8D0', opacity: 0.65, maxWidth: '480px' }}
            >
              From smoky BBQ to rich Nihari and comforting Haleem — DesiKart Cuisine brings
              authentic desi taste directly to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              {/* Primary */}
              <a
                href="https://wa.me/923115077779"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn flex items-center gap-2 px-7 py-3.5 rounded-full font-poppins font-semibold text-sm transition-all duration-300"
                style={{ background: '#E4571E', color: '#fff' }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order Now
              </a>

              {/* Secondary */}
              <a
                href="#menu"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-poppins font-medium text-sm transition-all duration-300"
                style={{
                  border: '1px solid rgba(212,162,76,0.6)',
                  color: '#D4A24C',
                  background: 'rgba(212,162,76,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212,162,76,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212,162,76,0.05)'
                }}
              >
                View Menu
              </a>

              {/* FoodPanda */}
              <a
                href="https://www.foodpanda.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full font-poppins font-medium text-sm transition-all duration-300"
                style={{
                  border: '1px solid rgba(212,0,104,0.4)',
                  color: '#ff2d78',
                  background: 'rgba(212,0,104,0.05)',
                }}
              >
                🐼 FoodPanda
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { num: '5★', label: 'Rated' },
                { num: '1000+', label: 'Orders' },
                { num: '100%', label: 'Fresh' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="font-cinzel font-bold text-2xl"
                    style={{ color: '#D4A24C' }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="font-poppins text-xs mt-1"
                    style={{ color: '#F5E8D0', opacity: 0.6 }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Food image */}
          <div className="fade-in-right order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(228,87,30,0.25) 0%, transparent 70%)',
                  transform: 'scale(1.2)',
                }}
              />
              <img
                src="/images/hero-food.jpg"
                alt="Authentic Desi Cuisine"
                className="relative rounded-3xl object-cover"
                style={{
                  width: 'clamp(280px, 45vw, 520px)',
                  height: 'clamp(350px, 55vw, 620px)',
                  border: '2px solid rgba(212,162,76,0.3)',
                  boxShadow:
                    '0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(228,87,30,0.2)',
                }}
              />
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(5,5,5,0.92)',
                  border: '1px solid rgba(212,162,76,0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  className="font-cinzel font-bold text-sm"
                  style={{ color: '#D4A24C' }}
                >
                  Coal Grilled
                </div>
                <div
                  className="font-poppins text-xs"
                  style={{ color: '#F5E8D0', opacity: 0.7 }}
                >
                  Over Live Charcoal
                </div>
              </div>
              {/* Floating delivery badge */}
              <div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(5,5,5,0.92)',
                  border: '1px solid rgba(228,87,30,0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="font-poppins font-semibold text-sm" style={{ color: '#E4571E' }}>
                  🚀 Fast Delivery
                </div>
                <div
                  className="font-poppins text-xs"
                  style={{ color: '#F5E8D0', opacity: 0.7 }}
                >
                  To Your Doorstep
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-poppins text-xs" style={{ color: '#D4A24C' }}>
          Scroll
        </span>
        <div
          className="w-px h-8 animate-bounce"
          style={{ background: 'linear-gradient(to bottom, #D4A24C, transparent)' }}
        />
      </div>
    </section>
  )
}