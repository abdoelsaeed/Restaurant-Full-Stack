"use client";

import { Button } from "@/components/ui/button";

export default function QuantityButtons({
  value,
  onChange,
}: {
  value: number;
  onChange: (newQty: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
      >
        −
      </Button>

      <span className="min-w-[20px] text-center">{value}</span>

      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8"
        onClick={() => onChange(value + 1)}
      >
        +
      </Button>
    </div>
  );
}
