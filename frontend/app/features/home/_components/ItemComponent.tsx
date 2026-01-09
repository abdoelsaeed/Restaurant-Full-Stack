export default function ItemComponent({
  name,
  id,
  price,
  ingredients,
}: {
  name: string;
  id: string;
  price: number;
  ingredients: string;
}) {
  return (
    <div className="relative border-b-2 border-primary border-dashed mb-5 pb-3">
      <h1 className="text-primary font-semibold text-[20px] sm:text-[25px]">
        {name}
      </h1>

      <p className="text-secondary text-[15px] sm:text-[18px] mb-1">
        {ingredients}
      </p>

      {/* Price */}
      <p
        className="
          text-primary font-semibold text-[18px]
          mt-2
          sm:mt-0
          sm:text-[23px]
          sm:absolute sm:bottom-[-10px] sm:right-[-70px]
        "
      >
        ${price}
      </p>
    </div>
  );
}
