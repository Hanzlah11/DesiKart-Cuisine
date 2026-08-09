import { useState } from 'react'
import { useCart } from '../../context/CartContext'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Our Promise', href: '#promise' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
]

function Header({ onOpenCart }) {
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()

  const closeMenu = () => setOpen(false)

  return (
    <header
      className="
        dk-navbar-enter
        fixed
        left-0
        right-0
        top-0
        z-50

        border-b
        border-[#D4A24C]/10

        bg-[#050403]/95
        backdrop-blur-xl

        shadow-[0_8px_30px_rgba(0,0,0,0.22)]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[88px]
          w-full
          max-w-[1440px]
          items-center
          justify-between

          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="DesiKart Cuisine home"
          className="flex shrink-0 items-center"
        >
          <img
            src="/images/brand/desikart-logo.png"
            alt="DesiKart Cuisine"
            className="
              h-[70px]
              w-auto
              object-contain

              sm:h-[74px]
              lg:h-[78px]
            "
          />
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="dk-nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Kart Button */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open Kart with ${totalItems} items`}
            className="
              group
              relative

              flex
              h-[50px]
              min-w-[118px]

              items-center
              justify-center
              gap-2.5

              rounded-full

              border
              border-[#D4A24C]/35

              bg-[#100C09]

              px-5

              text-[13px]
              font-semibold
              tracking-[0.03em]
              text-[#E8D4B4]

              shadow-[0_8px_24px_rgba(0,0,0,0.26)]

              transition-all
              duration-300

              hover:-translate-y-[2px]
              hover:border-[#D4A24C]/70
              hover:bg-[#16100B]
              hover:text-[#D4A24C]
            "
          >
            {/* Kart icon */}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="
                h-[19px]
                w-[19px]
                shrink-0

                transition-transform
                duration-300

                group-hover:scale-110
              "
            >
              <path d="M3 4h2l2.2 9.2a2 2 0 0 0 2 1.6h6.8a2 2 0 0 0 2-1.6L20 7H6" />
              <circle cx="10" cy="19" r="1.2" />
              <circle cx="17" cy="19" r="1.2" />
            </svg>

            <span>Kart</span>

            {/* Counter */}
            {totalItems > 0 && (
              <span
                className="
                  flex
                  h-[22px]
                  min-w-[22px]
                  items-center
                  justify-center

                  rounded-full

                  bg-[#D4A24C]

                  px-[5px]

                  text-[10px]
                  font-extrabold
                  leading-none
                  text-[#120B04]
                "
              >
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* Order CTA */}
          <a
            href="#menu"
            className="
              inline-flex

              h-[50px]
              min-w-[150px]

              items-center
              justify-center

              whitespace-nowrap
              rounded-full

              border
              border-[#D4A24C]

              bg-gradient-to-r
              from-[#A96C25]
              via-[#D8A64B]
              to-[#B77929]

              px-6

              text-[13px]
              font-bold
              leading-none
              tracking-[0.03em]
              text-[#080604]

              shadow-[0_10px_28px_rgba(212,162,76,0.16)]

              transition-all
              duration-300

              hover:-translate-y-[2px]
              hover:shadow-[0_14px_36px_rgba(212,162,76,0.26)]
            "
          >
            Order Now
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">

          {/* Mobile Kart */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open Kart with ${totalItems} items`}
            className="
              relative

              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-full

              border
              border-[#D4A24C]/30

              bg-[#100C09]

              text-[#D4A24C]

              transition-all
              duration-300

              hover:border-[#D4A24C]/60
            "
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[20px] w-[20px]"
            >
              <path d="M3 4h2l2.2 9.2a2 2 0 0 0 2 1.6h6.8a2 2 0 0 0 2-1.6L20 7H6" />
              <circle cx="10" cy="19" r="1.2" />
              <circle cx="17" cy="19" r="1.2" />
            </svg>

            {totalItems > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1

                  flex
                  h-5
                  min-w-5

                  items-center
                  justify-center

                  rounded-full

                  border-2
                  border-[#050403]

                  bg-[#D4A24C]

                  px-1

                  text-[9px]
                  font-extrabold
                  text-[#120B04]
                "
              >
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="
              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-full

              border
              border-[#D4A24C]/30

              bg-[#D4A24C]/[0.03]

              transition-colors
              duration-300

              hover:border-[#D4A24C]/60
            "
          >
            <div className="flex w-[19px] flex-col gap-[5px]">
              <span
                className={`
                  h-[1.5px]
                  w-full
                  bg-[#D4A24C]
                  transition-all
                  duration-300

                  ${
                    open
                      ? 'translate-y-[6.5px] rotate-45'
                      : ''
                  }
                `}
              />

              <span
                className={`
                  h-[1.5px]
                  w-full
                  bg-[#D4A24C]
                  transition-all
                  duration-300

                  ${
                    open
                      ? 'opacity-0'
                      : 'opacity-100'
                  }
                `}
              />

              <span
                className={`
                  h-[1.5px]
                  w-full
                  bg-[#D4A24C]
                  transition-all
                  duration-300

                  ${
                    open
                      ? '-translate-y-[6.5px] -rotate-45'
                      : ''
                  }
                `}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          overflow-hidden
          border-t
          bg-[#090705]/98

          transition-all
          duration-300

          lg:hidden

          ${
            open
              ? 'max-h-[520px] border-[#D4A24C]/10 opacity-100'
              : 'max-h-0 border-transparent opacity-0'
          }
        `}
      >
        <nav
          className="
            mx-auto
            flex
            max-w-xl
            flex-col

            px-5
            py-5

            sm:px-8
          "
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="
                dk-nav-link

                border-b
                border-white/[0.04]

                px-1
                py-4
              "
            >
              {link.label}
            </a>
          ))}

          <a
            href="#menu"
            onClick={closeMenu}
            className="
              mt-5

              flex
              h-[52px]

              items-center
              justify-center

              whitespace-nowrap
              rounded-full

              border
              border-[#D4A24C]

              bg-gradient-to-r
              from-[#A96C25]
              via-[#D8A64B]
              to-[#B77929]

              px-7

              text-sm
              font-bold
              leading-none
              text-[#080604]
            "
          >
            Order Now
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header