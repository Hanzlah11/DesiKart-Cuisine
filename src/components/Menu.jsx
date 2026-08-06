import { useState, useEffect, useRef } from 'react'
import { menuData } from '../data/menuData'

function SpiceLevel({ level }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1.5 h-3 rounded-sm"
          style={{ background: i <= level ? '#E4571E' : 'rgba(228,87,30,0.2)' }}
        />
      ))}
    </div>
  )
}

function MenuCard({ item }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: '#111',
        border: '1px solid rgba(212,162,76,0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'rgba(212,162,76,0.4)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(212,162,76,0.15)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ height: '180px' }}>
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
        />
        {/* Tag */}
        {item.tag && (
          <div
            className="absolute top-3 left-3 px-2 py-0.5 rounded-md font-poppins font-medium text-xs"
            style={{ background: '#E4571E', color: '#fff' }}
          >
            {item.tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4
          className="font-poppins font-semibold text-sm mb-1"
          style={{ color: '#F5E8D0' }}
        >
          {item.name}
        </h4>
        <p
          className="font-poppins text-xs leading-relaxed mb-3"
          style={{ color: '#F5E8D0', opacity: 0.55 }}
        >
          {item.desc}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <SpiceLevel level={item.spice} />
          </div>
          <span
            className="font-cinzel font-bold text-base"
            style={{ color: '#D4A24C' }}
          >
            {item.price}
          </span>
        </div>

        {/* Order button */}
        <a
          href="https://wa.me/923115077779"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full block text-center py-2.5 rounded-xl font-poppins font-medium text-xs transition-all duration-300"
          style={{
            background: 'rgba(228,87,30,0.1)',
            border: '1px solid rgba(228,87,30,0.3)',
            color: '#E4571E',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E4571E'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(228,87,30,0.1)'
            e.currentTarget.style.color = '#E4571E'
          }}
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('breakfast')
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

  const tabs = Object.entries(menuData).map(([key, val]) => ({
    key,
    label: val.label,
    emoji: val.emoji,
  }))

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: '#080808' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 reveal">
          <p
            className="font-poppins text-xs tracking-widest mb-3"
            style={{ color: '#D4A24C' }}
          >
            ✦ BROWSE OUR MENU ✦
          </p>
          <h2
            className="font-cinzel font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F5E8D0' }}
          >
            Our <span style={{ color: '#D4A24C' }}>Menu</span>
          </h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="font-poppins text-sm" style={{ color: '#F5E8D0', opacity: 0.6 }}>
            Freshly prepared daily. Slow-cooked with passion.
          </p>
        </div>

        {/* Tabs */}
        <div className="reveal mb-10">
          <div
            className="flex gap-1 overflow-x-auto pb-2 scrollbar-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-poppins font-medium text-sm transition-all duration-300"
                style={
                  activeTab === t.key
                    ? {
                        background: '#D4A24C',
                        color: '#050505',
                      }
                    : {
                        background: 'rgba(212,162,76,0.08)',
                        color: '#F5E8D0',
                        border: '1px solid rgba(212,162,76,0.2)',
                      }
                }
              >
                <span>{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {menuData[activeTab].items.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 reveal">
          <p className="font-poppins text-sm mb-4" style={{ color: '#F5E8D0', opacity: 0.6 }}>
            Can't find what you're looking for? Message us directly!
          </p>
          <a
            href="https://wa.me/923115077779"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-poppins font-medium text-sm transition-all duration-300"
            style={{
              background: '#25D366',
              color: '#fff',
              boxShadow: '0 0 20px rgba(37,211,102,0.3)',
            }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us Your Order
          </a>
        </div>
      </div>
    </section>
  )
}