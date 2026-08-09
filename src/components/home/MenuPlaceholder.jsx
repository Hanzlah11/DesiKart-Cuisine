import SectionHeading from '../common/SectionHeading'

function MenuPlaceholder() {
  return (
    <section
      id="menu"
      className="dk-section bg-[#0d0b09]"
    >
      <div className="dk-container">

        <SectionHeading
          eyebrow="Our Menu"
          title="Authentic Desi Favourites"
          description="Breakfast classics, hearty mains, BBQ favourites, family servings and traditional weekend specials."
        />

        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#d4a24c]/15 bg-[#15110d] px-6 py-14 text-center md:px-12">

          <p className="font-display text-3xl text-[#f5ead8]">
            Full menu coming next.
          </p>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#9f9283]">
            We are preparing the new menu using the approved dish
            photography and final pricing.
          </p>

        </div>

      </div>
    </section>
  )
}

export default MenuPlaceholder