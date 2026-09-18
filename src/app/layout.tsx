import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopHub - Plataforma E-Commerce",
  description: "Pre-parcial Next.js & React Context",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        {/* Envolvemos toda la aplicación con el CartProvider */}
        <CartProvider>
          <Header />
          <main className="flex-1 container mx-auto p-4 md:p-6">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}