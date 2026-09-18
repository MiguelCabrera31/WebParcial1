import ProductCard from "@/components/ProductCard";
import { DummyJSONProductsResponse, Product } from "@/types/product";

// Función asíncrona para obtener los productos desde la API externa
async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock",
    { cache: "no-store" } // Garantiza que los datos se consulten de forma fresca
  );

  if (!res.ok) {
    throw new Error("Error al consultar el catálogo de productos");
  }

  const data: DummyJSONProductsResponse = await res.json();
  return data.products;
}

export default async function HomePage() {
  // Consumimos directamente la función asíncrona en el Server Component
  const products = await getProducts();

  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Catálogo de Productos
        </h1>
        <p className="text-slate-600 mt-1">
          Explora nuestros artículos destacados y añádelos a tu carrito.
        </p>
      </div>

      {/* Grilla responsiva para las tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}