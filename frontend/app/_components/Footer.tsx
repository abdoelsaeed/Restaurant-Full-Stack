import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-pureWhite px-15 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-12">
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-[20px] font-semibold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed text-pureWhite/90">
              We serve fresh, delicious meals made with high-quality
              ingredients. Our passion is creating food you’ll love, every
              single day.
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-[20px] font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Mon - Fri: 7:30 AM – 9:30 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Sat - Sun: 8:00 AM – 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[20px] font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+20 114 744 0577</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@restaurant.com</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-[20px] font-semibold mb-4">Location</h3>
            <p className="text-sm mb-3 text-pureWhite/90">
              21 Downtown Street, Cairo, Egypt
            </p>

            {/* Google Maps Link */}
            <Link
              href="https://www.google.com/maps"
              target="_blank"
              className="
                inline-flex items-center gap-2
                text-sm font-semibold
                text-link
                border-b border-link
                hover:opacity-80 transition
              "
            >
              <MapPin size={16} />
              View on Google Maps
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-pureWhite/30 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-pureWhite/80">
            © {new Date().getFullYear()} Restaurant. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
