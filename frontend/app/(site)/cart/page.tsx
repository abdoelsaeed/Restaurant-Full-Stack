// app/cart/page.tsx
import { ShoppingCart } from "lucide-react";
import { TableDemo } from "@/app/_components/Table";
import { getMyCartServices } from "@/app/services/cart/cart.server";

export default async function Page() {
  const response = await getMyCartServices();

  const cart = response?.data ?? null;

  return (
    <div>
      <h1 className="flex justify-center items-center gap-3 mt-20 mb-10 text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-2xl shadow-lg mx-auto max-w-md">
        <ShoppingCart size={40} className="text-white" />
        <span>My Cart</span>
      </h1>

      <TableDemo items={cart?.items ?? []} user={cart?.user ?? null} />
    </div>
  );
}
