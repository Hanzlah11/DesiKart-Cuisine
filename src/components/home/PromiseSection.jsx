import SectionHeading from '../common/SectionHeading'
import { promises } from '../../data/promises'

function PromiseSection() {
  return (
    <section
      id="promise"
      className="dk-section"
    >
      <div className="dk-container">

        <SectionHeading
          eyebrow="What We Stand For"
          title="The DesiKart Promise"
        />

        <div className="grid gap-px overflow-hidden rounded-[28px] border border-[#d4a24c]/15 bg-[#d4a24c]/10 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((item) => (
            <div
              key={item.number}
              className="bg-[#110f0c] p-8 transition-colors hover:bg-[#18140f]"
            >
              <span className="text-xs font-bold tracking-[0.22em] text-[#b86132]">
                {item.number}
              </span>

              <h3 className="font-display mt-4 text-2xl font-semibold text-[#f5ead8]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default PromiseSection