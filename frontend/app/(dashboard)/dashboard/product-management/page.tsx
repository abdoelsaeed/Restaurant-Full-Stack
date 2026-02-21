import { getMenu } from "@/app/services/food/food.server";
import FilterProducts from "../_components/FilterProducts";
import { PaginationComponent } from "@/app/_components/PaginationComponent";
import { TableProducts } from "../_components/TableProducts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddProductSheet } from "../_components/AddProductSheet";
type PageProps = {
  searchParams: {
    page?: string;
    q?: string;
    isFeatured?: string;
    active?: string;
    sortBy?: "price" | "createdAt";
  };
};

export default async function Page({ searchParams }: PageProps) {
  const query = await searchParams;
  const page = Number(searchParams.page) || 1;

  const isFeatured =
    query.isFeatured === "true"
      ? true
      : query.isFeatured === "false"
        ? false
        : undefined;

  const isActive =
    query.active === "true"
      ? true
      : query.active === "false"
        ? false
        : undefined;

  const sortBy = query.sortBy === "price" ? "price" : "createdAt";

  

  const { data, meta } = await getMenu(
    query.q || "",
    page,
    isFeatured,
    isActive,
    sortBy,
  );
  

  return (
    <div className="px-5 py-3 mt-section">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <AddProductSheet />
      </div>
      <FilterProducts />
      <TableProducts products={data} />
      {meta && (
        <PaginationComponent
          meta={meta}
          pageName="dashboard/product-management"
          activeClassName="bg-[#fc5900] text-pureWhite"
        />
      )}
    </div>
  );
}
