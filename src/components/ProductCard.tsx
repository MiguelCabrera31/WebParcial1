"use client"; // Componente de cliente porque reacciona a eventos (onClick) y consume hooks

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Consumimos la acción addToCart del contexto global
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
      <div>
        {/* Imagen del producto */}
        <div className="relative h-48 w-full bg-slate-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información principal */}
        <div className="p-4 space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {product.category}
          </span>
          <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
            {product.title}
          </h3>
          <div className="flex justify-between items-center pt-1">
            <span className="text-xl font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Stock: {product.stock} u.
            </span>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="p-4 pt-0 space-y-2">
        {/* Botón rápido para agregar al carrito */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg text-sm transition flex items-center justify-center gap-2"
        >
          <span>➕</span> Agregar al Carrito
        </button>

        {/* Enlace SPA a la vista dinámica de detalle */}
        <Link
          href={`/productos/${product.id}`}
          className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg text-sm transition"
        >
          Ver Detalle
        </Link>
      </div>
    </div>
  );
}