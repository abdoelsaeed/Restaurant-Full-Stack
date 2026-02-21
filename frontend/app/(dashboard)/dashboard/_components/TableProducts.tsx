"use client";
import { deleteFood, duplicateFood } from "@/app/actions/dashboard.actions";
import { Food } from "@/app/types/food";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import { EditProductSheet } from "./EditProductSheet";

export function TableProducts({ products }: { products: Food[] }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-[#1c1f24] shadow-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/10 bg-[#23262b]">
            <TableHead className="text-gray-400">Image</TableHead>
            <TableHead className="text-gray-400">Product</TableHead>
            <TableHead className="text-gray-400">Price</TableHead>
            <TableHead className="text-gray-400">Discount</TableHead>
            <TableHead className="text-gray-400">Final Price</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400">Orders</TableHead>
            <TableHead className="text-right text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products?.map((product) => {
            const {
              _id,
              image,
              name,
              finalPrice,
              active,
              price,
              isFeatured,
              discount,
              ingredients,
              ordersCount,
            } = product;

            return (
              <TableRow
                key={_id}
                className="border-b border-white/5 hover:bg-white/3 transition-all duration-200"
              >
                {/* Image */}
                <TableCell>
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={image}
                      fill
                      alt={name}
                      className="object-cover"
                    />
                  </div>
                </TableCell>

                {/* Name + Ingredients */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{name}</span>
                    <span className="text-xs text-gray-500 truncate max-w-xs">
                      {ingredients?.join(", ")}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-white">
                  ${price.toFixed(2)}
                </TableCell>

                {/* Discount */}
                <TableCell>
                  {discount ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      -${discount}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">—</span>
                  )}
                </TableCell>
                {/*Final Price */}
                <TableCell className="font-semibold text-white">
                  ${finalPrice.toFixed(2)}
                </TableCell>
                {/* Status */}
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 text-xs rounded-full border ${
                        active
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {active ? "Active" : "Inactive"}
                    </span>

                    {isFeatured && (
                      <span className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Orders */}
                <TableCell className="text-gray-300 font-medium">
                  {ordersCount}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 hover:bg-white/10"
                      >
                        <MoreHorizontalIcon size={18} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="bg-[#23262b] border border-white/10 text-white"
                    >
                      <EditProductSheet product={product}>
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer"></DropdownMenuItem>
                      </EditProductSheet>
                      <form action={duplicateFood.bind(null, _id)}>
                        <DropdownMenuItem asChild>
                          <button type="submit" className="w-full text-left">
                            Duplicate
                          </button>
                        </DropdownMenuItem>
                      </form>
                      <DropdownMenuSeparator />
                      <form action={deleteFood.bind(null, _id)}>
                        <DropdownMenuItem asChild>
                          <button
                            type="submit"
                            className="w-full text-left text-red-400"
                          >
                            Delete
                          </button>
                        </DropdownMenuItem>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
