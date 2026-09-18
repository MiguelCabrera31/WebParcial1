"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <h1 className="text-3xl font-bold text-slate-800">Tu carrito está vacío 🛒</h1>
        <p className="text-slate-500">Añade productos desde el catálogo para comenzar tu compra.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
        >
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-800">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Resumen de Compras</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
        {cart.map(({ product, quantity }) => (
          <div key={product.id} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg bg-slate-100"
              />
              <div>
                <h3 className="font-bold text-slate-900">{product.title}</h3>
                <p className="text-sm text-slate-500">
                  ${product.price.toFixed(2)} x {quantity} u.
                </p>
              </div>
            </div>


            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="w-8 h-8 rounded-md hover:bg-slate-100 font-bold"
                  aria-label={`Disminuir cantidad de ${product.title}`}
                >
                  -
                </button>
                <span className="w-6 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="w-8 h-8 rounded-md hover:bg-slate-100 font-bold"
                  aria-label={`Aumentar cantidad de ${product.title}`}
                >
                  +
                </button>
              </div>
              <span className="font-extrabold text-slate-900">
                ${(product.price * quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                title="Eliminar producto"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-xl flex justify-between items-center">
        <div>
          <span className="text-sm text-slate-400 uppercase font-semibold">Total a pagar:</span>
          <div className="text-3xl font-black">${totalPrice.toFixed(2)}</div>
        </div>
        <Link
          href="/checkout"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg transition"
        >
          Finalizar el <p></p>edido
        </Link>
      </div>
    </div>
  );
}