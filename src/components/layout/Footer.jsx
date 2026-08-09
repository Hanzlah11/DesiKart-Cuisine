function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="border-t border-[#d4a24c]/10 bg-[#070605]"
    >
      <div className="dk-container py-14">

        <div className="grid gap-10 md:grid-cols-3">

          <div>
            <img
              src="/images/brand/desikart-logo.png"
              alt="DesiKart Cuisine"
              className="h-16 w-auto"
            />

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#8f8376]">
              Authentic desi flavours, prepared fresh with care.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4a24c]">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#a99c8e]">
              <a href="#home" className="hover:text-[#d4a24c]">
                Home
              </a>

              <a href="#menu" className="hover:text-[#d4a24c]">
                Menu
              </a>

              <a href="#promise" className="hover:text-[#d4a24c]">
                Our Promise
              </a>

              <a href="#story" className="hover:text-[#d4a24c]">
                Our Story
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4a24c]">
              Order
            </p>

            <p className="mt-5 text-sm text-[#a99c8e]">
              WhatsApp
            </p>

            <a
              href="https://wa.me/923115077779"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-semibold text-[#f5ead8] hover:text-[#d4a24c]"
            >
              +92 311 50 77779
            </a>
          </div>

        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-[#645b52]">
          © {year} DesiKart Cuisine. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer