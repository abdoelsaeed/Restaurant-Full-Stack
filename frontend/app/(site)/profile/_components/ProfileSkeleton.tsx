"use client";

import { useTheme } from "next-themes";

export default function ProfileSkeleton() {
  const { resolvedTheme } = useTheme();

  return (
    <div className={`min-h-screen py-6 sm:py-8 lg:py-12 ${
      resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className={`h-12 rounded w-64 mx-auto mb-4 animate-pulse ${
            resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
          <div className={`h-6 rounded w-96 mx-auto animate-pulse ${
            resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Skeleton */}
          <div className="lg:col-span-1">
            <div className={`rounded-xl shadow-sm border p-6 animate-pulse ${
              resolvedTheme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
              <div className={`h-6 rounded w-32 mx-auto mb-2 ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
              <div className={`h-4 rounded w-24 mx-auto ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
            </div>
          </div>

          {/* Profile Details Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-xl shadow-sm border p-6 animate-pulse ${
              resolvedTheme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className={`h-6 rounded w-48 mb-4 ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`h-12 rounded ${
                    resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}