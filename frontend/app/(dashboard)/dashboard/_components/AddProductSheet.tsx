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
        toast.success("Product created successfully 🎉");
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
        <Button className="flex items-center gap-2 bg-[#fc5900] hover:bg-[#e04a00] text-white font-semibold transition-all duration-300">
          <Plus size={20} />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto p-2 bg-[#23272d] text-white w-full sm:max-w-[500px]">
        <SheetHeader className="border-b border-gray-600 pb-4">
          <SheetTitle className="text-white text-2xl font-bold">
            Add New Product
          </SheetTitle>
          <SheetDescription className="text-gray-400 text-sm">
            Fill in the details below to add a new item to your menu.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-semibold">
                Name
              </Label>
              <Input
                placeholder="Enter product name"
                id="name"
                className="bg-[#2d3139] border-gray-600 text-white placeholder:text-gray-500 focus:border-[#fc5900] focus:ring-[#fc5900]"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                className="bg-[#2d3139] border-gray-600 text-white placeholder:text-gray-500 focus:border-[#fc5900] focus:ring-[#fc5900] resize-none min-h-[100px]"
                {...register("description")}
                placeholder="Describe your product..."
              />
            </div>

            {/* Price & Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white font-semibold">
                  Price
                </Label>
                <Input
                  className="bg-[#2d3139] border-gray-600 text-white placeholder:text-gray-500 focus:border-[#fc5900] focus:ring-[#fc5900]"
                  id="price"
                  type="number"
                  placeholder="0.00"
                  {...register("price", {
                    valueAsNumber: true,
                    required: "Price is required",
                  })}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">
                    {errors.price.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount" className="text-white font-semibold">
                  Discount
                </Label>
                <Input
                  className="bg-[#2d3139] border-gray-600 text-white placeholder:text-gray-500 focus:border-[#fc5900] focus:ring-[#fc5900]"
                  id="discount"
                  type="number"
                  placeholder="0.00"
                  {...register("discount", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-white font-semibold">
                Type
              </Label>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="type"
                      className="bg-[#2d3139] border-gray-600 text-white"
                    >
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d3139] border-gray-600 text-white">
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
              {errors.type && (
                <span className="text-red-500 text-sm">
                  {errors.type.message}
                </span>
              )}
            </div>

            {/* Meal Times */}
            <div className="space-y-2">
              <Label className="text-white font-semibold">Meal Times</Label>
              <div className="flex flex-wrap gap-2">
                {["breakfast", "lunch", "dinner"].map((time) => (
                  <Button
                    key={time}
                    type="button"
                    onClick={() => toggleMealTime(time)}
                    className={`transition-all duration-300 ${
                      mealTimes.includes(time)
                        ? "bg-[#fc5900] hover:bg-[#e04a00] text-white"
                        : "bg-[#2d3139] hover:bg-[#383d47] text-gray-300 border border-gray-600"
                    }`}
                  >
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <Label htmlFor="ingredient" className="text-white font-semibold">
                Ingredients
              </Label>
              <div className="flex gap-2">
                <Input
                  id="ingredient"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="Add ingredient"
                  className="bg-[#2d3139] border-gray-600 text-white placeholder:text-gray-500 focus:border-[#fc5900] focus:ring-[#fc5900]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addIngredient();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addIngredient}
                  className="bg-[#fc5900] hover:bg-[#e04a00] text-white font-semibold transition-all duration-300"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {ingredients.map((ing, index) => (
                  <div
                    key={index}
                    className="bg-[#fc5900] text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium text-sm"
                  >
                    {ing}
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="hover:bg-[#e04a00] rounded-full p-1 transition-all duration-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-600">
              <div className="flex items-center gap-3">
                <Input
                  id="active"
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer accent-[#fc5900]"
                  defaultChecked
                  {...register("active")}
                />
                <Label
                  htmlFor="active"
                  className="cursor-pointer font-semibold"
                >
                  Active
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  id="isFeatured"
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer accent-[#fc5900]"
                  {...register("isFeatured")}
                />
                <Label
                  htmlFor="isFeatured"
                  className="cursor-pointer font-semibold"
                >
                  Featured
                </Label>
              </div>
            </div>
          </div>

          <SheetFooter className="gap-3 pt-6 border-t border-gray-600">
            <SheetClose ref={sheetCloseRef} asChild>
              <Button
                variant="outline"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-[#2d3139] hover:text-white"
              >
                Close
              </Button>
            </SheetClose>
            <Button
              type="submit"
              className="bg-[#fc5900] hover:bg-[#e04a00] text-white font-semibold transition-all duration-300 flex-1"
            >
              Save Product
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
