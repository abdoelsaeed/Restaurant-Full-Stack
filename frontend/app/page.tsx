import FeaturedSection from "./features/home/FeaturedSection";
import PopularDishes from "./features/home/PopularDishes";
import HealthySection from "./features/home/HealthySection";
import OffersSection from "./features/home/OffersSection";
import SpecialsSection from "./features/home/SpecialsSection";
import { getHome } from "./services/food/food.server";
export default async function Page() {
  const { populars, featured, offers } = await getHome();
  

  return (
    <div className="">
      <FeaturedSection featuredItems={featured} />
      <PopularDishes popularsItems={populars} />
      <HealthySection />
      <OffersSection offers={offers} />
      <SpecialsSection />
    </div>
  );
}
