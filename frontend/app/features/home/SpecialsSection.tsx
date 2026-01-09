import AvailableMeals from "./_components/AvailableMeals";
import HeadingSpecials from "./_components/HeadingSpecials";
import MenuDetils from "./_components/MenuDetils";
import ReviewSection from "./_components/ReviewSection";
export default function SpecialsSection() {
  return (
    <div className="mt-section">
      <HeadingSpecials />
      <AvailableMeals />
      <MenuDetils />
      <ReviewSection/>
    </div>
  );
}
