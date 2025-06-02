// services/api.ts
import axios from 'axios';
import { Product } from '@/types/product';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://examen03-backend.onrender.com/api';

// Tipo para la respuesta de la API sin procesar
interface RawProduct {
  id: number;
  name: string;
  description: string;
  price: string | number;
  stock: string | number;
  image_url: string;
}

// Tipo para los datos de creación (sin image_url)
interface ProductCreateInput {
  name: string;
  description: string;
  price: number;
  stock: number;
}

// Tipo para actualización (todos los campos opcionales excepto id)
interface ProductUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

// Función para normalizar los datos del producto
const normalizeProduct = (product: RawProduct): Product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: Number(product.price),
  stock: Number(product.stock),
  image_url: product.image_url
});

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get<RawProduct[]>(`${API_BASE}/products`);
  return res.data.map(normalizeProduct);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  if (!query.trim()) return getProducts(); // si está vacío, obtener todos
  const res = await axios.get<RawProduct[]>(`${API_BASE}/products/search?name=${query}`);
  return res.data.map(normalizeProduct);
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await axios.get<RawProduct>(`${API_BASE}/products/${id}`);
  return normalizeProduct(res.data);
};

export const createProduct = async (product: Omit<Product, 'id' | 'image_url'>): Promise<Product> => {
  // Solo enviamos los datos básicos, el backend generará la imagen
  const productToCreate: ProductCreateInput = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock
  };
  
  const res = await axios.post<RawProduct>(`${API_BASE}/products`, productToCreate);
  return normalizeProduct(res.data);
};

export const updateProduct = async (id: number, product: Partial<Omit<Product, 'id' | 'image_url'>>): Promise<Product> => {
  const productToUpdate: ProductUpdateInput = {
    ...product
  };
  
  const res = await axios.patch<RawProduct>(`${API_BASE}/products/${id}`, productToUpdate);
  return normalizeProduct(res.data);
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/products/${id}`);
};