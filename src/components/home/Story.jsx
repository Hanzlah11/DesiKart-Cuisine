import SectionHeading from '../common/SectionHeading'

function Story() {
  return (
    <section
      id="story"
      className="dk-section bg-[#0d0b09]"
    >
      <div className="dk-container grid items-center gap-12 lg:grid-cols-2">

        <div>
          <SectionHeading
            eyebrow="Our Story"
            title="Desi Food, Prepared With Purpose"
            align="left"
          />

          <div className="space-y-5 leading-8 text-[#a99c8e]">
            <p>
              DesiKart Cuisine is built around a simple idea:
              authentic desi food should taste familiar, generous
              and genuinely satisfying.
            </p>

            <p>
              From traditional slow-cooked dishes to freshly prepared
              BBQ favourites, every dish is approached with care,
              consistency and respect for the recipe.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[36px] bg-[#b86132]/5 blur-3xl" />

          <div className="relative rounded-[30px] border border-[#d4a24c]/15 bg-[#15110d] p-8 md:p-12">
            <p className="font-display text-4xl leading-tight text-[#f5ead8] md:text-5xl">
              “Desi Swaad,
              <span className="text-[#d4a24c]"> Dil Se.</span>”
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Story