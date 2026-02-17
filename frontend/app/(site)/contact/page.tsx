import ContactInfo from "@/app/_components/ContactInfo";
import Map from "@/app/_components/Map";

export const revalidate = 86400;

export default function Page() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]
               bg-cover bg-center bg-no-repeat
               flex flex-col justify-center items-center
               px-4 sm:px-6 md:px-8
               py-12 sm:py-16 md:py-20"
        style={{ backgroundImage: "url('/image_contact_bg.png')" }}
      >
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-pureWhite text-center mb-4 sm:mb-6">
          CONTACT US
        </h1>

        <div className="text-pureWhite text-sm sm:text-base md:text-lg lg:text-[18px] text-center max-w-2xl px-4">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
          <p className="mt-1">
            sed do eiusmod tempor incididunt ut labore et dolore magna.
          </p>
        </div>
      </div>

      {/* Contact Info & Map Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 mt-8 sm:mt-12 md:mt-section px-4 sm:px-6 md:px-8 lg:px-15">
        <div className="w-full lg:w-[35%] lg:flex-shrink-0">
          <ContactInfo />
        </div>
        <div className="w-full lg:w-[60%] lg:flex-shrink-0">
          <Map />
        </div>
      </div>
    </div>
  );
}
