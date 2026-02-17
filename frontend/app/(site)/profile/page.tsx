// frontend/app/profile/page.tsx

import { getMe } from "@/app/services/auth/auth.server";
import ProfileOverview from "./_components/ProfileOverview";
import ProfileForm from "./_components/ProfileForm";
import ProfileStats from "./_components/ProfileStats";
import { User as UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { getMyStatistics } from "@/app/services/order/order.server";
import { Suspense } from "react";
import ProfileSkeleton from "./_components/ProfileSkeleton";

export default async function Page() {
  const user = await getMe();
  if (!user) {
    redirect("/auth/login");
  }
  const { data } = await getMyStatistics();
  const {
    totalOrders,
    completedOrders,
    pendingOrders,
    reviewsGiven,
    totalSpent,
  } = data;

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <div className="min-h-screen py-6 sm:py-8 lg:py-12 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="flex justify-center items-center gap-3 text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-2xl shadow-lg mx-auto max-w-md mb-4">
              <UserIcon size={40} className="text-white" />
              <span>My Profile</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <ProfileOverview user={user} />
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileForm user={user} />
              <ProfileStats
                totalOrders={totalOrders}
                completedOrders={completedOrders}
                pendingOrders={pendingOrders}
                reviewsGiven={reviewsGiven}
                totalSpent={totalSpent}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}