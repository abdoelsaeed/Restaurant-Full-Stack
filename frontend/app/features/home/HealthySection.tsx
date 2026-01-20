import OrderButton from "@/app/_components/OrderButton";
import Image from "next/image";
import Link from "next/link";

export default function HealthySection() {
  return (
    <div className="mt-20 px-4 md:px-10">
      {/* Title */}
      <div className="flex justify-center items-center">
        <p
          className="
            inline-block text-secondary 
            text-[22px] sm:text-[26px] md:text-[30px]
            font-semibold mb-8
            border-b-4 border-primary
          "
        >
          RICH & HEALTHY
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Image */}
        <div className="relative w-full lg:flex-1 h-[250px] sm:h-[350px] lg:h-auto">
          <Image
            alt="healthy"
            quality={90}
            src="/richHealthy1.png"
            fill
            className="object-contain"
          />
        </div>

        {/* Right Content */}
        <div className="lg:flex-[2]">
          <h1
            className="
              text-primary font-bold
              text-[24px] sm:text-[30px] md:text-[35px]
            "
          >
            Highest quality artisangrains,
            <p>proteins & seasonal ingredients</p>
          </h1>

          <h2
            className="
              text-secondary font-semibold mt-6
              text-[16px] sm:text-[18px] md:text-[23px]
            "
          >
            Righteous indignation and dislike men who are so beguiled and
            <p>
              demoralized by the charms of pleasure of the moment, so blinded by
            </p>
            desires, that they cannot foresee.
          </h2>

          {/* List + Image */}
          <div className="flex flex-col xl:flex-row items-center justify-between mt-10 gap-10">
            <div>
              <ul className="mb-10">
                {[
                  "Simple and easy to distinguish",
                  "Pleasure of the moment blinded desire",
                  "Able to do what we like best",
                ].map((text, i) => (
                  <li key={i} className="mb-6 flex items-center">
                    <span className="mr-4 relative w-5 h-5 flex-shrink-0">
                      <Image
                        src="/Star1.png"
                        alt="star"
                        fill
                        className="object-contain"
                      />
                    </span>
                    <p className="text-secondary text-[16px] sm:text-[20px] md:text-[25px]">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="text-center lg:text-left">
                <Link href="/menu" className="cursor-pointer">
                  <OrderButton />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full sm:w-[300px] md:w-[350px]">
              <img
                src="/richHealthy2.png"
                alt="healthy"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
