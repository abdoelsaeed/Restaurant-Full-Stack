import {
  Award,
  ChefHat,
  Heart,
  Users,
  Star,
  Clock,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const revalidate = 86400;
export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      {/* ===== Modern Hero with Gradient ===== */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-pureWhite py-32 px-4 sm:px-6 md:px-10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pureWhite rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pureWhite rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-6xl text-center z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-pureWhite/10 backdrop-blur-sm rounded-full border border-pureWhite/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase font-medium">
              WHO WE ARE
            </span>
          </div>

          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            A Modern Restaurant <br className="hidden sm:block" />
            <span className="text-pureWhite/90">With a Passion</span>{" "}
            <span className="text-pureWhite/80">for Flavor</span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl opacity-95 leading-relaxed">
            We create unforgettable dining experiences by combining fresh
            ingredients, modern recipes, and a warm atmosphere that makes every
            visit special.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-pureWhite text-primary hover:bg-pureWhite/90 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Link href="/items">View Our Menu</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-pureWhite text-primary hover:bg-pureWhite/10 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Experience Section with Icons ===== */}
      <section className="py-24 px-4 sm:px-6 md:px-10 bg-third">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
              Our Story & Values
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Discover what drives us and makes our restaurant unique
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: Clock,
                title: "Our Experience",
                description:
                  "With years of experience in the food industry, we focus on delivering dishes that are rich in taste, beautifully presented, and carefully prepared with attention to every detail.",
              },
              {
                icon: Heart,
                title: "Our Philosophy",
                description:
                  "We believe food should be simple, honest, and full of character. Every plate reflects our dedication to quality, consistency, and the joy of sharing great meals.",
              },
              {
                icon: Award,
                title: "Our Promise",
                description:
                  "From the first bite to the last, we promise an experience that keeps you coming back. Your satisfaction is our commitment, and excellence is our standard.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group bg-pureWhite rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-pureWhite transition-colors" />
                  </div>
                  <h3 className="text-primary font-bold text-2xl sm:text-3xl mb-4">
                    {item.title}
                  </h3>
                  <p className="text-secondary leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Values Cards with Enhanced Design ===== */}
      <section className="py-24 px-4 sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-0.5 bg-primary"></div>
              <Star className="w-6 h-6 text-primary" />
              <div className="w-12 h-0.5 bg-primary"></div>
            </div>
            <h2 className="text-primary font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
              What Makes Us Different
            </h2>
            <p className="text-secondary text-lg max-w-xl mx-auto">
              Our values shape everything we do, from the kitchen to your table.
              Each element is crafted with care and passion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: UtensilsCrossed,
                title: "Fresh Ingredients",
                text: "We use carefully selected, locally sourced ingredients to ensure quality and freshness in every dish.",
                color: "from-green-500/10 to-green-500/5",
                iconColor: "text-green-600",
              },
              {
                icon: ChefHat,
                title: "Modern Recipes",
                text: "Our menu blends classic flavors with innovative techniques, creating dishes that surprise and delight.",
                color: "from-orange-500/10 to-orange-500/5",
                iconColor: "text-orange-600",
              },
              {
                icon: Award,
                title: "Skilled Chefs",
                text: "Our talented chefs bring years of experience, creativity, and passion to every plate they create.",
                color: "from-blue-500/10 to-blue-500/5",
                iconColor: "text-blue-600",
              },
              {
                icon: Users,
                title: "Great Atmosphere",
                text: "A warm, welcoming space designed for comfort, enjoyment, and creating lasting memories.",
                color: "from-purple-500/10 to-purple-500/5",
                iconColor: "text-purple-600",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-gradient-to-br bg-pureWhite rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon
                        className={`w-7 h-7 ${item.iconColor} group-hover:scale-110 transition-transform`}
                      />
                    </div>
                    <h3 className="text-primary font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Enhanced Stats Section ===== */}
      <section className="bg-gradient-to-br from-primary/5 via-third to-primary/5 py-24 px-4 sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
              Our Achievements
            </h2>
            <p className="text-secondary text-lg max-w-xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "10+", label: "Years Experience", icon: Clock },
              {
                value: "50+",
                label: "Signature Dishes",
                icon: UtensilsCrossed,
              },
              { value: "5k+", label: "Happy Guests", icon: Users },
              { value: "4.8", label: "Customer Rating", icon: Star },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group text-center bg-pureWhite rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-pureWhite transition-colors" />
                  </div>
                  <h3 className="text-primary font-bold text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform inline-block">
                    {stat.value}
                  </h3>
                  <p className="text-secondary text-sm sm:text-base font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Enhanced CTA Section ===== */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-pureWhite py-24 px-4 sm:px-6 md:px-10 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-pureWhite rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-pureWhite rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-4xl text-center z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-pureWhite/10 backdrop-blur-sm rounded-full border border-pureWhite/20">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">JOIN US TODAY</span>
          </div>

          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
            Ready to Experience{" "}
            <span className="text-pureWhite/90">Our Food?</span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed mb-10">
            Join us today and enjoy food crafted with passion, precision, and
            love. Every meal is an opportunity to create something special.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-pureWhite text-primary hover:bg-pureWhite/90 px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <Link href="/items">Explore Menu</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
