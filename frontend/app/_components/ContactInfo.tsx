import { Clock8, Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="w-full">
      <h1 className="text-primary text-2xl sm:text-3xl md:text-[35px] font-bold mb-4 sm:mb-5 border-b-2 border-b-secondary pb-2">
        ADDRESS
      </h1>
      <div className="px-1 space-y-3 sm:space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-primary flex-shrink-0 mt-1">
            <MapPin
              size={20}
              className="sm:w-6 sm:h-6 md:w-[25px] md:h-[25px]"
            />
          </span>
          <p className="text-secondary text-sm sm:text-base md:text-[18px] leading-relaxed">
            28 Seventh Avenue, New York, 10014
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-primary flex-shrink-0 mt-1">
            <Phone
              size={20}
              className="sm:w-6 sm:h-6 md:w-[25px] md:h-[25px]"
            />
          </span>
          <p className="text-secondary text-sm sm:text-base md:text-[18px]">
            +020 114 744 0577
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-primary flex-shrink-0 mt-1">
            <Mail size={20} className="sm:w-6 sm:h-6 md:w-[25px] md:h-[25px]" />
          </span>
          <p className="text-secondary text-sm sm:text-base md:text-[18px] break-words">
            resturents@gmail.com
          </p>
        </div>
      </div>

      <h1 className="text-primary text-2xl sm:text-3xl md:text-[35px] font-bold mb-4 sm:mb-5 border-b-2 border-b-secondary mt-8 sm:mt-10 md:mt-section pb-2">
        WORKING HOURS
      </h1>
      <div className="px-1">
        <div className="flex items-start gap-3">
          <span className="text-primary flex-shrink-0 mt-1">
            <Clock8
              size={20}
              className="sm:w-6 sm:h-6 md:w-[25px] md:h-[25px]"
            />
          </span>
          <p className="text-secondary text-sm sm:text-base md:text-[18px]">
            7:30 am to 9:30pm on Weekdays
          </p>
        </div>
      </div>

      <h1 className="text-primary text-2xl sm:text-3xl md:text-[35px] font-bold mb-4 sm:mb-5 border-b-2 border-b-secondary mt-8 sm:mt-10 md:mt-section pb-2">
        FOLLOW US
      </h1>
      <div className="mt-4 sm:mt-5">
        <img
          src="/contact.png"
          alt="contact"
          className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[250px] h-auto"
        />
      </div>
    </div>
  );
}
