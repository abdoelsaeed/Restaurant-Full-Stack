"use client";

import ActiveProducts from "./ActiveProducts";
import SortProduct from "./SortProduct";

export default function FilterProducts() {
  return (
    <div className="flex justify-between items-center">
      <ActiveProducts />
      <SortProduct />
    </div>
  );
}
