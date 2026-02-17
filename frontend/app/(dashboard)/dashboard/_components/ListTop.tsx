import TopProductItem from "./TopProductItem";

export default function ListTop({
  topProducts,
}: {
  topProducts: {
    totalQuantity: string;
    totalRevenue: number;
    productName: string;
  }[];
}) {
  const limitedProducts = topProducts?.slice(0, 10);
  if (topProducts?.length === 0)
    return (
      <div className="bg-linear-to-b from-[#25262a] via-[#4A4F56] to-[#2c2e33] h-full rounded-2xl shadow-2xl p-5">
        <h1 className="text-white text-[16px] font-semibold text-center pt-3">
          No top-selling products
        </h1>
      </div>
    );
  return (
    <div className="bg-linear-to-b from-[#25262a] via-[#383d45] to-[#32343a] h-full rounded-2xl  p-5">
      <h1 className="text-white text-[16px] font-semibold text-center pt-3">
        Top-selling
      </h1>

      {limitedProducts?.map(
        (
          product: {
            totalQuantity: string;
            totalRevenue: number;
            productName: string;
          },
          i,
        ) => 
          <TopProductItem key={i} i={i} product={product}/>
      )}
    </div>
  );
}
