/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import QuantityButtons from "./QuantityButtons";
import { updateCartQuantity } from "../services/cart/cart.client";
import { getGuestCart, updateGuestCartQuantity } from "../utils/cartStorage";

/* =============================
   Types
============================= */
interface CartItem {
  _id: string; // cart item id OR food id (guest)
  quantity: number;
  price: number;
  foodId: {
    _id: string;
    name: string;
    finalPrice: number;
    image: string;
  };
}

export function TableDemo({
  items,
  user,
}: {
  items: CartItem[];
  user: any | null;
}) {
  const [displayItems, setDisplayItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  /* =============================
     Init cart (User / Guest)
  ============================= */
  useEffect(() => {
    if (user) {
      // 👤 Logged in → backend
      setDisplayItems(items);

      const initial: Record<string, number> = {};
      items.forEach((item) => {
        initial[item.foodId._id] = item.quantity;
      });
      setQuantities(initial);
    } else {
      // 👤 Guest → localStorage
      const guestCart = getGuestCart();

      const mapped: CartItem[] = guestCart.map((item: any) => ({
        _id: item._id,
        quantity: item.quantity,
        price: item.finalPrice,
        foodId: {
          _id: item._id,
          name: item.name,
          finalPrice: item.finalPrice,
          image: item.image,
        },
      }));

      setDisplayItems(mapped);

      const initial: Record<string, number> = {};
      guestCart.forEach((item: any) => {
        initial[item._id] = item.quantity;
      });
      setQuantities(initial);
    }
  }, [items, user]);

  /* =============================
     Handle Quantity Change
  ============================= */
  const handleQuantityChange = (foodId: string, newQty: number) => {
    if (newQty < 1) return;

    // UI update
    setQuantities((prev) => ({
      ...prev,
      [foodId]: newQty,
    }));

    if (!user) {
      // 👤 Guest
      updateGuestCartQuantity(foodId, newQty);
      return;
    }

    // 👤 Logged in
    updateCartQuantity(foodId, newQty);
  };

  /* =============================
     Compute Total
  ============================= */
  const totalPrice = displayItems.reduce((sum, item) => {
    const qty = quantities[item.foodId._id] ?? item.quantity;
    return sum + item.foodId.finalPrice * qty;
  }, 0);

  if (displayItems.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-10">
        Your cart is empty 🛒
      </p>
    );
  }

  return (
    <Table className="bg-white rounded-xl overflow-hidden shadow-sm">
      <TableCaption className="text-secondary/70">
        Your shopping cart
      </TableCaption>

      {/* ===== Header ===== */}
      <TableHeader>
        <TableRow className="bg-primary hover:bg-primary">
          <TableHead className="w-[110px] text-white">Image</TableHead>
          <TableHead className="text-white px-5">Product</TableHead>
          <TableHead className="text-white">Price</TableHead>
          <TableHead className="text-white text-center">Quantity</TableHead>
          <TableHead className="text-white text-right">Total</TableHead>
          <TableHead className="text-white text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      {/* ===== Body ===== */}
      <TableBody>
        {displayItems.map(
          ({ _id, foodId: { _id: foodID, name, finalPrice, image } }) => {
            const qty = quantities[foodID] ?? 1;

            return (
              <TableRow
                key={_id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="relative h-20">
                  <Image
                    src={image}
                    fill
                    alt={name}
                    className="object-cover rounded-lg"
                  />
                </TableCell>

                <TableCell className="font-medium px-5">{name}</TableCell>

                <TableCell className="text-secondary">${finalPrice}</TableCell>

                <TableCell className="text-center">
                  <QuantityButtons
                    value={qty}
                    onChange={(newQty) => handleQuantityChange(foodID, newQty)}
                  />
                </TableCell>

                <TableCell className="text-right font-medium">
                  ${finalPrice * qty}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50"
                  >
                    <CircleX size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>

      {/* ===== Footer ===== */}
      <TableFooter>
        <TableRow className="bg-muted">
          <TableCell colSpan={4} className="font-semibold">
            Total
          </TableCell>

          <TableCell className="text-right text-lg font-bold">
            ${totalPrice}
          </TableCell>

          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
