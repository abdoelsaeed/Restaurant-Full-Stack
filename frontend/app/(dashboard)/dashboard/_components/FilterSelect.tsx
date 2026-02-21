"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function FilterSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortBy = searchParams.get("sortBy");
  const isFeatured = searchParams.get("isFeatured");

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "price" || value === "createdAt") {
      params.set("sortBy", value);
      params.delete("isFeatured");
    } else if (value === "isFeatured") {
      const current = params.get("isFeatured");
      if (current === "true") {
        params.delete("isFeatured");
      } else {
        params.set("isFeatured", "true");
      }
      params.delete("sortBy");
    } else if (value === "clear") {
      params.delete("sortBy");
      params.delete("isFeatured");
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  // تحديد القيمة الحالية
  const currentValue =
    isFeatured === "true"
      ? "isFeatured"
      : sortBy === "price"
        ? "price"
        : sortBy === "createdAt"
          ? "createdAt"
          : "";

  return (
    <Select value={currentValue} onValueChange={handleSelect} >
      <SelectTrigger className="w-full max-w-52 bg-[#2a2d33] border border-white/5 font-semibold text-white">
        <SelectValue placeholder="Sort / Filter" />
      </SelectTrigger>

      <SelectContent className="bg-[#2a2d33]  border border-white/5 text-white ">
        <SelectGroup>
          <SelectItem value="price">Sort by Price</SelectItem>
          <SelectItem value="createdAt">Sort by Created At</SelectItem>
          <SelectItem value="isFeatured">Featured Items</SelectItem>
          <SelectItem value="clear" className="text-red-400">
            Clear Filters
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
