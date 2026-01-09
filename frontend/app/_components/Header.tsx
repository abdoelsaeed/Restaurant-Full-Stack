/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import TopHeader from "./TopHeader";
import { LogIn, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCart } from "../context/cartContext";
export default function Header({ user }: any) {
  const { cartCount, refreshCartCount } = useCart();
  const [chosenPage, setChosenPage] = useState<string>("HOME");
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginStatus = searchParams.get("login");
  useEffect(() => {
    if (loginStatus === "success") {
      toast.success("Welcome back 👋");
      router.replace("/");
    }
  });
  useEffect(() => {
    refreshCartCount(user); // ✅ Load initial count
  }, [user, refreshCartCount]);

  return (
    <header className="sticky top-0 z-50 bg-pureWhite/95 backdrop-blur-sm shadow-md border-b border-primary/20">
      <TopHeader user={user} />

      <div className="px-4 sm:px-6 md:px-10 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logoHeader.png"
              alt="Logo"
              className="w-[70px] sm:w-[90px] h-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-6 text-[18px] font-semibold text-secondary">
              {["HOME", "MENU", "ORDER", "CONTACT", "ABOUT"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setChosenPage(item)}
                    className={`hover:text-primary transition-colors 1 ${
                      chosenPage === item
                        ? "text-primary border-b-2 border-primary"
                        : "text-secondary"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart */}
            <Link href="/cart">
              <div className="relative bg-secondary w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center">
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[12px] w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
                <ShoppingCart size={22} color="white" />
              </div>
            </Link>

            {/* Delivery (Desktop only) */}
            <div className="hidden xl:flex items-center gap-2 text-secondary">
              <div>
                <p className="font-semibold text-[18px]">Delivery Order</p>
                <p className="text-sm">+880 1630 225 015</p>
              </div>
              <Image src="/bycle.png" alt="delivery" width={30} height={30} />
            </div>

            {/* Login */}
            {user ? (
              // هنا لازم تعرض معلومات اليوزر
              <div className="flex items-center gap-2 text-secondary">
                <span className="hidden sm:inline font-semibold">
                  {user.name}
                </span>
                {user.avatar && (
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                {/* ممكن تضيف زر logout كمان */}
              </div>
            ) : (
              <Link href="/auth/login">
                <Button
                  className="
                  bg-primary text-white
                  px-4 py-2 sm:px-5 sm:py-3
                  rounded-xl
                  flex items-center gap-2
                  text-sm sm:text-base
                  cursor-pointer
                "
                >
                  <span className="hidden sm:inline">LOGIN</span>
                  <LogIn size={18} />
                </Button>
              </Link>
            )}
            {/* Mobile Menu Icon */}
            <button className="lg:hidden">
              <Menu size={28} className="text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
