"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItemsCount } = useCart();

  return (
    <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-extrabold tracking-wide hover:text-blue-400 transition">
          Shop<span className="text-blue-500">Hub</span>
        </Link>

        <Link
          href="/carrito"
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full border border-slate-700 transition"
        >
          <span className="text-xl">🛒</span>
          <span className="font-semibold text-sm">Carrito:</span>
          <span className="bg-blue-600 text-white font-bold text-xs px-2.5 py-1 rounded-full">
            {totalItemsCount}
          </span>
        </Link>
      </div>
    </header>
  );
}