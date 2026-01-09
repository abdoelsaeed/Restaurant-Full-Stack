"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function AvailableMeals() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const buttons = ["BREAKFAST", "LUNCH", "DINNER"];

  function handleClick(name: string) {
    const newActiveButton = activeButton === name ? null : name;
    setActiveButton(newActiveButton);

    const params = new URLSearchParams(searchParams.toString());
    if (newActiveButton) {
      params.set("mealTimes", newActiveButton.toLowerCase());
    } else {
      params.delete("mealTimes");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap justify-center    px-4 sm:px-6 md:px-0">
      {buttons.map((name) => (
        <Button
          key={name}
          onClick={() => handleClick(name)}
          className={`
            ${
              activeButton === name
                ? "bg-primary text-pureWhite shadow-md"
                : "bg-third text-secondary hover:bg-gray-300"
            }
            rounded-none border-r-2 border-b-primary 
            w-full sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[244px]
            h-[50px] sm:h-[55px] md:h-[60px]
            text-base sm:text-lg md:text-xl lg:text-[25px]
            font-semibold
            transition-all duration-300
            hover:scale-105
            active:scale-95
          `}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
