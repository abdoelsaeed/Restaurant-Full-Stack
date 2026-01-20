// frontend/app/page.tsx

import FeaturedSection from "./features/home/FeaturedSection";
import PopularDishes from "./features/home/PopularDishes";
import HealthySection from "./features/home/HealthySection";
import OffersSection from "./features/home/OffersSection";
import SpecialsSection from "./features/home/SpecialsSection";
import { getHome } from "./services/food/food.server";
import { Suspense } from "react";
import { LoadingPage, LoadingGrid } from "./_components/Loading";

// ✅ إضافة caching للصفحة الرئيسية
export const revalidate = 1800; // 30 minutes

// Loading Components
function FeaturedSectionSkeleton() {
  return (
    <div className="py-8">
      <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}

function PopularDishesSkeleton() {
  return (
    <div className="py-8">
      <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>
      <LoadingGrid count={4} />
    </div>
  );
}

export default async function Page() {
  const { populars, featured, offers } = await getHome();

  return (
    <div className="">
      <Suspense fallback={<FeaturedSectionSkeleton />}>
        <FeaturedSection featuredItems={featured} />
      </Suspense>

      <Suspense fallback={<PopularDishesSkeleton />}>
        <PopularDishes popularsItems={populars} />
      </Suspense>

      <Suspense fallback={<LoadingPage message="Loading healthy options..." />}>
        <HealthySection />
      </Suspense>

      <Suspense fallback={<LoadingPage message="Loading offers..." />}>
        <OffersSection offers={offers} />
      </Suspense>

      <Suspense fallback={<LoadingPage message="Loading specials..." />}>
        <SpecialsSection />
      </Suspense>
    </div>
  );
}
