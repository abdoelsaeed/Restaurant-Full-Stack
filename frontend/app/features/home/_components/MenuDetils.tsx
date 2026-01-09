import ImageMenu from "./ImageMenu";
import MenuItems from "./MenuItems";

export default function MenuDetils() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center mt-6 sm:mt-8 md:mt-10 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-0">
      <ImageMenu />
      <MenuItems />
    </div>
  );
}
