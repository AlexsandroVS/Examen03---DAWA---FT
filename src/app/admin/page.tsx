// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getProducts, 
  searchProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '@/services/api';
import ProductModal from '@/components/admin/ProductModal';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';
import ProductSearch from '@/components/admin/ProductSearch';
import ProductCard from '@/components/admin/ProductCard';
import { Product } from '@/types/product';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

 const fetchProducts = async (query = '') => {
    try {
      setLoading(true);
      const data = query ? await searchProducts(query) : await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchProducts(query);
  };

  const handleCreate = async (product: Omit<Product, 'id'>) => {
    await createProduct(product);
    fetchProducts(searchQuery);
  };

  const handleUpdate = async (product: Omit<Product, 'id'>) => {
    if (!currentProduct?.id) return;
    await updateProduct(currentProduct.id, product);
    fetchProducts(searchQuery);
  };

  const handleDelete = async () => {
    if (!currentProduct?.id) return;
    await deleteProduct(currentProduct.id);
    fetchProducts(searchQuery);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Panel de Administración</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <span>+</span> Crear Producto
        </button>
      </div>

      <ProductSearch onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery ? 'No se encontraron productos' : 'No hay productos disponibles'}
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Crear primer producto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => {
                setCurrentProduct(product);
                setIsEditModalOpen(true);
              }}
              onDelete={() => {
                setCurrentProduct(product);
                setIsDeleteModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <ProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
      />

      <ProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={currentProduct}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        productName={currentProduct?.name || ''}
      />
    </section>
  );
}