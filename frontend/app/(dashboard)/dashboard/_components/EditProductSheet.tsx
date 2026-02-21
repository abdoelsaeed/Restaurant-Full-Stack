/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Food } from "@/app/types/food";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { updateFood } from "@/app/actions/dashboard.actions";
import { toast } from "sonner";

export function EditProductSheet({
  product,
}: {
  children: React.ReactNode;
  product: Food;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Food>({
    defaultValues: product,
  });

  async function onSubmit(data: Food) {
    const result: any = await updateFood(product._id, data);
    
    if (result.success) {
      toast("Product updated successfully 🎉");
    } else {
      if (result.message) {
        console.log(result?.message);
      }
    }
  }

  useEffect(() => {
    reset(product);
  }, [product, reset]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>
            Make changes to product here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price">price</Label>
              <Input
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true })}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="discount">discount</Label>
              <Input
                id="discount"
                type="number"
                {...register("discount", { valueAsNumber: true })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="finalPrice">Final Price</Label>
              <Input id="finalPrice" disabled {...register("finalPrice")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="type">type</Label>
              <Input id="type" {...register("type")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Input
                  id="active"
                  type="checkbox"
                  className="w-4 h-4"
                  {...register("active")}
                />
                <Label htmlFor="active" className="cursor-pointer">
                  Active
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  id="isFeatured"
                  type="checkbox"
                  className="w-4 h-4"
                  {...register("isFeatured")}
                />
                <Label htmlFor="isFeatured" className="cursor-pointer">
                  Is Featured
                </Label>
              </div>
            </div>
          </div>

          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
