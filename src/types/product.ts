// src/types/product.ts

// Representa la estructura de un producto proveniente de la API de DummyJSON
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  images?: string[];
  description?: string;
  brand?: string;
  stock: number;
}

// Representa un ítem dentro del carrito de compras
export interface CartItem {
  product: Product;
  quantity: number;
}

// Respuesta paginada de la API DummyJSON para la lista de productos
export interface DummyJSONProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}