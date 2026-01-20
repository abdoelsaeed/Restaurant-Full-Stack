import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import HeaderWrapper from "./_components/HeaderWrapper";
import { CartProvider } from "./context/cartContext";
import  ProviderTheme from "@/app/theme/providerTheme";

export const metadata: Metadata = {
  title: {
    template: "%s | Restaurant",
    default: "Welcome to Restaurant",
  },
  description: "Restaurant is a platform for ordering food online",
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-third min-h-screen flex flex-col">

        <ProviderTheme>
        <CartProvider >
          <HeaderWrapper />
          <main className="px-section">{children}</main>
        </CartProvider>
        <Footer />
        <Toaster
          position="top-center"
          offset={150} // 👈 ارتفاع الهيدر
          richColors
          closeButton
          />
          </ProviderTheme>
      </body>
    </html>
  );
}
