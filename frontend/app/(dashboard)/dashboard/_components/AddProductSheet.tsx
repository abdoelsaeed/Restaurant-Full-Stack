/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Food } from "@/app/types/food";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { createFood } from "@/app/actions/dashboard.actions";
import { toast } from "sonner";
import { useRef, useState } from "react";

export function AddProductSheet() {
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [mealTimes, setMealTimes] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Food>({
    defaultValues: {
      name: "",
      price: 0,
      discount: 0,
      finalPrice: 0,
      type: "",
      description: "",
      ingredients: [],
      mealTimes: [],
      active: true,
      isFeatured: false,
    },
  });

  function addIngredient() {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  }

  function removeIngredient(index: number) {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function toggleMealTime(time: string) {
    setMealTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    );
  }

  async function onSubmit(data: Food) {
    try {
      if (ingredients.length === 0) {
        toast.error("Please add at least one ingredient");
        return;
      }

      if (mealTimes.length === 0) {
        toast.error("Please select at least one meal time");
        return;
      }

      const formData = {
        ...data,
        ingredients,
        mealTimes,
      };

      const result: any = await createFood(formData);

      if (result.success) {
        toast("Product created successfully 🎉");
        reset();
        setIngredients([]);
        setMealTimes([]);
        sheetCloseRef.current?.click();
      } else {
        toast.error(result.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product");
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#fc5900] hover:bg-[#e04a00] text-white">
          <Plus size={20} />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto bg-[#1c1f24] text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Add New Product</SheetTitle>
          <SheetDescription>
            Add a new product to your menu. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input placeholder="Product Name" id="name" {...register("name", { required: true })} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter product description"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true, required: true })}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                type="number"
                {...register("discount", { valueAsNumber: true })}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="type">Type</Label>
              <Controller
                name="type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="burger">Burger</SelectItem>
                      <SelectItem value="pizza">Pizza</SelectItem>
                      <SelectItem value="salad">Salad</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="beef">Beef</SelectItem>
                      <SelectItem value="chicken">Chicken</SelectItem>
                      <SelectItem value="meal">Meal</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="grid gap-3">
              <Label>Meal Times</Label>
              <div className="flex flex-wrap gap-2">
                {["breakfast", "lunch", "dinner"].map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={mealTimes.includes(time) ? "default" : "outline"}
                    className={mealTimes.includes(time) ? "bg-[#fc5900]" : ""}
                    onClick={() => toggleMealTime(time)}
                  >
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="ingredient">Ingredients</Label>
              <div className="flex gap-2">
                <Input
                  id="ingredient"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="Add ingredient"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addIngredient();
                    }
                  }}
                />
                <Button type="button" onClick={addIngredient}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {ingredients.map((ing, index) => (
                  <div
                    key={index}
                    className="bg-[#fc5900] text-white px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {ing}
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Input
                  id="active"
                  type="checkbox"
                  className="w-4 h-4"
                  defaultChecked
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
            <Button type="submit">Save Product</Button>
            <SheetClose ref={sheetCloseRef} asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
