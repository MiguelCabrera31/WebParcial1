// src/app/productos/[id]/page.tsx
import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Producto no encontrado");
  }

  return res.json();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  // En Next.js 15+, los parámetros de ruta son una Promesa
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        ← Volver al Catálogo
      </Link>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-slate-800">
        <div className="relative h-64 w-full bg-slate-100 rounded-xl overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
            {product.category}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">{product.title}</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <div className="text-3xl font-black text-slate-900">
            ${product.price.toFixed(2)}
          </div>
          <div className="pt-2">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}