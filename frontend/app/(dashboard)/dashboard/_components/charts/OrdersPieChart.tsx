"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { PieChart, Pie, Tooltip, Cell, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

interface Props {
  peakDays: {
    orders: number;
    day: string;
  }[];
}

/* 🎨 Dynamic Color Palette */
const COLORS = [
  "#CC3333",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
];

export function OrdersPieChart({ peakDays }: Props) {
  const data = Array.isArray(peakDays) ? peakDays : [];
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // ✅ نحسب إجمالي الطلبات
  const totalOrders = React.useMemo(() => {
    return data.reduce((acc, item) => acc + item.orders, 0);
  }, [data]);

  return (
    <Card className="bg-transparent h-full border-white/10 text-white bg-linear-to-b from-[#25262a] via-[#383d45] to-[#32343a]">
      <CardHeader>
        <CardTitle>Peak Days</CardTitle>
        <CardDescription>
          {from} - {to}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center mt-20">
        <PieChart width={300} height={300}>
          <Tooltip formatter={(value: number) => `${value} Orders`} />

          <Pie
            data={data}
            dataKey="orders" // ✅ بدل revenue
            nameKey="day" // ✅ بدل period
            innerRadius={70}
            outerRadius={110}
            strokeWidth={3}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}

            <Label
              position="center"
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-white text-2xl font-bold"
                      >
                        {totalOrders}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 22}
                        className="fill-white/60 text-sm"
                      >
                        Total Orders
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </CardContent>
    </Card>
  );
}
