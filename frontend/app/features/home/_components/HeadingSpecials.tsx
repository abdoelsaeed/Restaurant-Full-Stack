export default function HeadingOffer() {
  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Subtitle */}
      <div className="flex justify-center items-center">
        <p
          className="
            inline-block text-secondary font-semibold text-center
            text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px]
            border-b-4 border-primary
          "
        >
          SPECIALS
        </p>
      </div>

      {/* Main Title */}
      <h1
        className="
          text-primary font-bold text-center
          text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px]
          mt-4
        "
      >
        Check out our menu
      </h1>

      {/* Description */}
      <p
        className="
          text-secondary text-center mt-4 mb-8
          text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          max-w-3xl mx-auto leading-relaxed
        "
      >
        Demoralized by the charms of pleasure of the moment so blinded except to
        some advantage.
      </p>
    </div>
  );
}
