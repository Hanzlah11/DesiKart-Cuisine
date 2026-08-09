function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}) {
  const centered = align === 'center'

  return (
    <div
      className={
        centered
          ? 'mx-auto mb-12 max-w-2xl text-center'
          : 'mb-12 max-w-2xl'
      }
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-[#b86132]">
          {eyebrow}
        </p>
      )}

      <h2 className="font-display text-4xl font-semibold leading-tight text-[#f5ead8] md:text-5xl">
        {title}
      </h2>

      <div
        className={`dk-gold-line mt-5 ${
          centered ? 'mx-auto' : ''
        }`}
      />

      {description && (
        <p className="mt-5 leading-7 text-[#9f9283]">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading