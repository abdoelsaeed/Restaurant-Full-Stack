"use client";
import { Clock4, LogOut, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "../types/user";
import { logoutService } from "../services/auth/auth.client";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";

export default function TopHeader({ user }: { user: User }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutService();
      router.push("/");
      router.refresh();
      toast.success(`successfully Logout`);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="py-2.5 bg-primary text-pureWhite w-screen px-4 sm:px-8 md:px-12 lg:px-15 flex justify-between items-center gap-3 sm:gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-12 lg:gap-20">
        <p className="flex items-center gap-2 text-sm sm:text-base">
          <Clock4 size={16} className="sm:w-5 sm:h-5" />
          <span>7:30 AM - 9:30 PM</span>
        </p>
        <p className="flex items-center gap-2 text-sm sm:text-base">
          <Phone size={16} className="sm:w-5 sm:h-5" />
          <span className="whitespace-nowrap">+20 1147440577</span>
        </p>
      </div>
      
      {/* 👇 ضع ThemeToggle داخل flex container */}
      <div className="flex items-center gap-3">
        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm sm:text-base whitespace-nowrap hover:underline cursor-pointer flex justify-center items-center gap-1"
          >
            <LogOut size={16} />
            LOGOUT
          </button>
        ) : (
          <p className="text-sm sm:text-base whitespace-nowrap">
            <Link href="/auth/signup">REGISTER</Link>
          </p>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}