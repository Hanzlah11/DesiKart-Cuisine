import { trackEvent } from '../../utils/analytics'

function QuickOrder() {
  const trackOrder = (channel) => {
    trackEvent({
      category: 'Ordering',
      action: 'Order button clicked',
      label: channel,
    })
  }

  return (
    <section
      id="order"
      className="border-y border-[#d4a24c]/10 bg-[#110f0c]"
    >
      <div className="dk-container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">

        <div className="text-center md:text-left">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#b86132]">
            Freshly Prepared
          </p>

          <h2 className="font-display text-3xl font-semibold text-[#f5ead8]">
            Ready for authentic desi flavour?
          </h2>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

          <a
            href="https://wa.me/923115077779"
            target="_blank"
            rel="noreferrer"
            className="dk-btn-primary"
            onClick={() => trackOrder('WhatsApp')}
          >
            Order on WhatsApp
          </a>

          <a
            href="#menu"
            className="dk-btn-secondary"
          >
            Explore Menu
          </a>

        </div>
      </div>
    </section>
  )
}

export default QuickOrder