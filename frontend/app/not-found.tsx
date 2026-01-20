/* eslint-disable react/no-unescaped-entities */
// frontend/app/not-found.tsx
"use client"
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");

  const popularPages = [
    { name: "Home", href: "/", description: "Go back to homepage" },
    { name: "Menu", href: "/menu", description: "Browse our delicious menu" },
    { name: "About", href: "/about", description: "Learn more about us" },
    { name: "Contact", href: "/contact", description: "Get in touch with us" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement search functionality here
      window.location.href = `/menu?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="mt-1 min-h-screen bg-third flex items-center justify-center px-4 mt-5">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="w-16 h-16 text-primary" />
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">404</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="text-lg px-8 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Popular Pages */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Popular Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary mb-1">
                  {page.name}
                </h3>
                <p className="text-sm text-gray-600">{page.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Still can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>

        {/* Fun 404 Animation (Optional) */}
        <div className="mt-12 text-6xl animate-bounce">🤔</div>
      </div>
    </div>
  );
}
