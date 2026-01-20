/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import OrderButton from "@/app/_components/OrderButton";
import { HomeFood } from "@/app/types/food";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface FeaturedItemsProps {
  featuredItems: HomeFood[];
}

export default function FeaturedSection({ featuredItems }: FeaturedItemsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!featuredItems || featuredItems.length === 0) return null;

  const currentItem = featuredItems[currentIndex];

  // 🔄 Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === featuredItems.length - 1 ? 0 : prev + 1
      );
    }, 4000); // ⏱️ كل 4 ثواني

    return () => clearInterval(interval);
  }, [featuredItems.length]);

  return (
    <div
      className="
        flex flex-col lg:flex-row items-center md:justify-center
        mt-12 sm:mt-16 lg:mt-24
        gap-8 lg:gap-12 xl:gap-16
        px-4 sm:px-6 md:px-8 lg:px-0 lg:ml-20
      "
    >
      {/* ================= Text ================= */}
      <div className="flex-1 lg:flex-[1.5] flex justify-center items-center w-full order-1">
        <div className="text-secondary font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center lg:text-left">
          <p className="text-primary font-semibold text-base sm:text-lg md:text-xl lg:text-[23px] xl:text-2xl mb-3 sm:mb-4 lg:mb-5">
            Best In Town
          </p>

          <p className="leading-tight mb-2">ENJOY OUR FOOD</p>

          {/* ✨ اسم متغير بس بأنيميشن ناعمة */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentItem._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="leading-tight"
            >
              <span className="text-primary">{currentItem.name}</span> FAST FOOD
            </motion.p>
          </AnimatePresence>

          {/* Desktop price */}
          <div className="hidden lg:flex items-center gap-8 mt-16 xl:mt-20">
            <Link href="/menu" className="cursor-pointer">
              <OrderButton />
            </Link>

            <div className="flex items-center gap-3">
              {currentItem.discount > 0 && (
                <span className="text-gray-400 line-through text-2xl">
                  ${currentItem.price}
                </span>
              )}
              <span className="text-primary font-semibold text-4xl">
                ${currentItem.finalPrice}
              </span>
            </div>
          </div>

          {/* Social + dots */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8 lg:mt-10 w-full">
            <ul className="text-primary flex gap-4">
              <li className="w-6 h-6 hover:scale-125 transition cursor-pointer">
                <Twitter />
              </li>
              <li className="w-6 h-6 hover:scale-125 transition cursor-pointer">
                <Instagram />
              </li>
              <li className="w-6 h-6 hover:scale-125 transition cursor-pointer">
                <Facebook />
              </li>
              <li className="w-6 h-6 hover:scale-125 transition cursor-pointer">
                <Linkedin />
              </li>
            </ul>

            <ul className="flex gap-2">
              {featuredItems.map((item, index) => (
                <li
                  key={item._id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 border-2 border-primary rounded-full cursor-pointer transition
                    ${index === currentIndex ? "bg-primary scale-110" : ""}`}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ================= Image ================= */}
      <div className="flex-1 lg:flex-[1.5] flex justify-center items-center w-full order-2">
        <div
          className="
      relative w-full
      max-w-[300px] sm:max-w-[360px] md:max-w-[420px]
      lg:max-w-[480px] xl:max-w-[540px]
      aspect-[430/300]
      overflow-hidden
      rounded-3xl
      bg-white/60
      backdrop-blur-sm
      shadow-xl
    "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem._id}
              initial={{ clipPath: "inset(0 100% 0 0)", scale: 0.96 }}
              animate={{ clipPath: "inset(0 0% 0 0)", scale: 1 }}
              exit={{ clipPath: "inset(0 0 0 100%)", scale: 1.04 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentItem.image}
                alt={currentItem.name}
                fill
                priority
                className="object-contain p-6 drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ================= Mobile price ================= */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:hidden order-3 mt-4">
        <Link href="/menu">
          <Button className="bg-primary text-white w-full sm:w-[180px] h-[55px] text-xl rounded-xl cursor-pointer">
            Order Now
          </Button>
        </Link>
        <p className="text-xl font-semibold">${currentItem.finalPrice}</p>
      </div>
    </div>
  );
}
