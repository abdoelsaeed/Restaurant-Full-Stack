"use client";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Search({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const [debouncedValue] = useDebounce(value, 400);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }
    router.push(`/menu?${params.toString()}`);
  }, [debouncedValue]);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <p
        className="
          text-secondary font-semibold text-center
          text-2xl sm:text-3xl md:text-4xl lg:text-[40px]
          max-w-3xl mx-auto
        "
      >
        It’s the food and groceries you Love, delivered
      </p>

      {/* Search */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <div className="relative w-full max-w-md sm:max-w-lg ">
          <Input
            type="text"
            placeholder="Search your items"
            value={value}
            className="
              h-12 sm:h-14
              pr-24 sm:pr-28
              rounded-3xl
              placeholder:text-base sm:placeholder:text-xl
              placeholder:text-secondary
              border-2 sm:border-4
              hover:border-secondary
            "
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
