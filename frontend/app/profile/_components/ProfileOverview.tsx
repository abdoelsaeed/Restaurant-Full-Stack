// frontend/app/_components/ProfileOverview.tsx

"use client";

import { User } from "../../types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ProfileOverviewProps {
  user: User;
}

export default function ProfileOverview({ user }: ProfileOverviewProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Card className="sticky top-6">
      <CardHeader className="text-center">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
          resolvedTheme === 'dark' ? 'bg-primary/20' : 'bg-primary/10'
        }`}>
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={96}
              height={96}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <UserIcon className="w-12 h-12 text-primary" />
          )}
        </div>
        <CardTitle className="text-xl">{user.name}</CardTitle>
        <p className={resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          {user.email}
        </p>
        {user.age && (
          <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Age: {user.age}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <span className={`font-medium ${
              resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Phone
            </span>
            <span className={resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}>
              {user.phone_number}
            </span>
          </div>
          {user.address && (
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <span className={`font-medium ${
                resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Address
              </span>
              <span className={`text-right ${
                resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {user.address}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}