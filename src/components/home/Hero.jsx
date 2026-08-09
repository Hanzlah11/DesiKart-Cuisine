import CinematicBackground from '../common/CinematicBackground'

function Hero() {
  return (
    <>
      <style>
        {`
          @keyframes dkHeroReveal {
            0% {
              opacity: 0;
              transform: translate3d(-42px, 22px, 0);
              filter: blur(9px);
            }

            60% {
              opacity: 0.9;
              filter: blur(1px);
            }

            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
              filter: blur(0);
            }
          }

          @keyframes dkHeroButtonReveal {
            0% {
              opacity: 0;
              transform: translateY(26px) scale(0.96);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes dkHeroDetailReveal {
            0% {
              opacity: 0;
              transform: translateX(-24px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .dk-hero-item {
            opacity: 0;
            animation:
              dkHeroReveal
              950ms
              cubic-bezier(0.16, 1, 0.3, 1)
              forwards;
          }

          .dk-hero-buttons {
            opacity: 0;
            animation:
              dkHeroButtonReveal
              900ms
              cubic-bezier(0.16, 1, 0.3, 1)
              forwards;
          }

          .dk-hero-detail {
            opacity: 0;
            animation:
              dkHeroDetailReveal
              850ms
              cubic-bezier(0.16, 1, 0.3, 1)
              forwards;
          }
        `}
      </style>

      <section
        id="home"
        className="
          relative isolate
          min-h-[calc(100vh-84px)]
          overflow-hidden
          bg-[#050403]
        "
      >
        {/* Canvas smoke + embers */}
        <CinematicBackground />

        {/* Cinematic vignette */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-[1]
            bg-[radial-gradient(circle_at_72%_48%,transparent_0%,rgba(0,0,0,0.06)_34%,rgba(0,0,0,0.40)_100%)]
          "
        />

        {/* Side shading */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-[1]
            bg-[linear-gradient(90deg,rgba(0,0,0,0.16)_0%,transparent_38%,transparent_72%,rgba(0,0,0,0.12)_100%)]
          "
        />

        {/* =========================================
            MAIN HERO LAYOUT
        ========================================= */}

        <div
          className="
            dk-container
            relative z-10
            grid
            min-h-[calc(100vh-84px)]
            items-center
            gap-10
            py-14

            lg:grid-cols-[1.08fr_0.92fr]
            lg:gap-14
            lg:py-8
          "
        >
          {/* =====================================
              LEFT — CONTENT
          ===================================== */}

          <div
            className="
              order-2
              mx-auto
              max-w-[720px]
              text-center

              lg:order-1
              lg:mx-0
              lg:text-left
            "
          >
            {/* Eyebrow */}
            <div
              className="
                dk-hero-item
                mb-5
                flex
                items-center
                justify-center
                gap-3

                lg:justify-start
              "
              style={{ animationDelay: '100ms' }}
            >
              <span
                className="
                  h-px w-10
                  bg-gradient-to-r
                  from-transparent
                  to-[#D4A24C]
                "
              />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.30em]
                  text-[#C77B39]
                "
              >
                Authentic Pakistani Cuisine
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                dk-hero-item
                font-display

                text-[50px]
                font-semibold
                leading-[0.95]
                tracking-[-0.025em]
                text-[#F7EAD6]

                sm:text-[62px]
                md:text-[72px]
                lg:text-[68px]
                xl:text-[82px]
              "
              style={{ animationDelay: '230ms' }}
            >
              Desi flavours

              <span
                className="
                  mt-1 block
                  bg-gradient-to-r
                  from-[#B9782B]
                  via-[#E1B45D]
                  to-[#C18436]
                  bg-clip-text
                  text-transparent
                "
              >
                made memorable.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                dk-hero-item

                mx-auto mt-7
                max-w-[610px]

                text-[15px]
                leading-[1.85]
                text-[#B7A693]

                sm:text-[16px]

                lg:mx-0
              "
              style={{ animationDelay: '390ms' }}
            >
              Slow-cooked classics, signature weekend dishes and freshly
              prepared favourites — crafted with authentic recipes,
              premium ingredients and the warmth of true desi hospitality.
            </p>

            {/* Signature */}
            <p
              className="
                dk-hero-item
                dk-signature

                mt-5
                text-[27px]

                sm:text-[31px]
              "
              style={{ animationDelay: '500ms' }}
            >
              Desi Swaad, Dil Se.
            </p>

            {/* Buttons */}
            <div
              className="
                dk-hero-buttons

                mt-9
                flex
                flex-col
                items-stretch
                justify-center
                gap-4

                sm:flex-row
                sm:items-center

                lg:justify-start
              "
              style={{ animationDelay: '650ms' }}
            >
              {/* Explore Menu */}
              <a
                href="#menu"
                className="dk-btn dk-btn-primary"
              >
                <span>Explore Menu</span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 shrink-0"
                >
                  <path d="M5 12h14" />
                  <path d="m14 7 5 5-5 5" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923115077779"
                target="_blank"
                rel="noreferrer"
                className="dk-btn dk-btn-dark"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="
                    h-[22px]
                    w-[22px]
                    shrink-0
                    text-[#25D366]
                    drop-shadow-[0_0_7px_rgba(37,211,102,0.30)]
                  "
                >
                  <path d="M16 3C8.83 3 3 8.66 3 15.62c0 2.46.74 4.86 2.13 6.91L3.72 27.8l5.4-1.37A13.16 13.16 0 0 0 16 28.32c7.17 0 13-5.66 13-12.63S23.17 3 16 3Zm0 23.2a10.9 10.9 0 0 1-5.55-1.5l-.4-.23-3.2.81.85-3.08-.26-.4a10.38 10.38 0 0 1-1.69-5.68C5.75 10.08 10.34 5.2 16 5.2s10.25 4.88 10.25 10.49S21.66 26.2 16 26.2Z" />

                  <path d="M21.65 18.4c-.3-.15-1.74-.84-2-.93-.26-.09-.45-.14-.64.14-.19.28-.74.92-.9 1.11-.17.19-.34.21-.63.07-.3-.15-1.24-.44-2.37-1.42-.87-.76-1.46-1.71-1.63-2-.17-.28-.02-.43.13-.57.13-.13.3-.33.44-.5.15-.16.2-.28.3-.47.1-.19.05-.35-.03-.5-.07-.14-.64-1.5-.88-2.05-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.03 2.82 1.17 3.01c.15.19 2.03 3.05 4.92 4.27.69.29 1.23.47 1.65.6.69.21 1.31.18 1.81.11.55-.08 1.7-.67 1.94-1.32.24-.65.24-1.2.17-1.32-.08-.12-.27-.19-.57-.34Z" />
                </svg>

                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* IMPORTANT: larger breathing room */}
            <div
              className="
                dk-hero-detail

                mt-[64px]
                flex
                items-center
                justify-center
                gap-3

                lg:justify-start
              "
              style={{ animationDelay: '850ms' }}
            >
              <span className="h-px w-7 bg-[#D4A24C]/25" />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.20em]
                  text-[#746659]
                "
              >
                Freshly Cooked · Authentic Recipes · Honest Value
              </p>
            </div>
          </div>

          {/* =====================================
              RIGHT — ANIMATED LOGO
          ===================================== */}

          <div
            className="
              order-1
              flex
              items-center
              justify-center

              lg:order-2
            "
          >
            <div
              className="
                relative

                h-[280px]
                w-[280px]

                sm:h-[350px]
                sm:w-[350px]

                md:h-[390px]
                md:w-[390px]

                lg:h-[460px]
                lg:w-[460px]

                xl:h-[520px]
                xl:w-[520px]
              "
            >
              {/* Ambient glow */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2 top-1/2

                  h-[88%]
                  w-[88%]

                  -translate-x-1/2
                  -translate-y-1/2

                  rounded-full

                  bg-[radial-gradient(circle,rgba(212,162,76,0.13)_0%,rgba(184,97,50,0.07)_38%,transparent_70%)]

                  blur-[38px]
                "
              />

              {/* Rotating ring */}
              <div
                aria-hidden="true"
                className="dk-logo-ring"
              />

              {/* Pulsating halo */}
              <div
                aria-hidden="true"
                className="dk-logo-halo"
              />

              {/* Secondary orbit */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-[12%]
                  rounded-full
                  border
                  border-[#D4A24C]/[0.07]
                  shadow-[0_0_45px_rgba(212,162,76,0.05)]
                "
              />

              {/* Logo */}
              <img
                src="/images/brand/desikart-logo.png"
                alt="DesiKart Cuisine"
                className="
                  dk-logo-float

                  relative z-10

                  h-full
                  w-full

                  object-contain

                  drop-shadow-[0_28px_50px_rgba(0,0,0,0.65)]
                "
              />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0 bottom-0
            z-[2]

            h-36

            bg-gradient-to-b
            from-transparent
            to-[#050403]
          "
        />
      </section>
    </>
  )
}

export default Hero