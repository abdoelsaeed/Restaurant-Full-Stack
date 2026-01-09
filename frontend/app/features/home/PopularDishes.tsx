import { ImageSlider } from "@/app/_components/ImageSlider";
import { HomeFood } from "@/app/types/food";


type popularsItemsProps = {
  popularsItems: HomeFood[];
};
export default function PopularDishes({ popularsItems }: popularsItemsProps) {
  const images = popularsItems?.map((item) => item.image);
  return (
    <div className="mt-15">
      <p className="text-secondary text-center text-[20px] font-semibold">
        Food Items
      </p>
      <h3 className="text-primary text-center text-[35px] font-bold ">
        Popular Dishes
      </h3>
      <ImageSlider images={images} />
    </div>
  );
}
