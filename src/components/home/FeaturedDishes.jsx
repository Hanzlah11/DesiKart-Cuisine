import SectionHeading from '../common/SectionHeading'
import { featuredDishes } from '../../data/featuredDishes'

function FeaturedDishes() {
  return (
    <section className="dk-section">
      <div className="dk-container">

        <SectionHeading
          eyebrow="Signature Selection"
          title="A Taste Worth Remembering"
          description="Authentic recipes, carefully prepared with bold flavour and a premium DesiKart presentation."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {featuredDishes.map((dish) => (
            <article
              key={dish.id}
              className="group overflow-hidden rounded-[24px] border border-[#d4a24c]/15 bg-[#110f0c]"
            >
              <div className="dk-image-zoom aspect-[4/5]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="font-display text-3xl font-semibold text-[#f5ead8]">
                  {dish.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#9f9283]">
                  {dish.description}
                </p>

                <a
                  href="#menu"
                  className="mt-5 inline-flex text-sm font-semibold text-[#d4a24c] transition hover:text-[#e2b45e]"
                >
                  View Menu →
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturedDishes