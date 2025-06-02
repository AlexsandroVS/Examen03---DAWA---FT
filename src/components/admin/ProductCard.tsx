'use client';

import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onView?: () => void;
};

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 group">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={product.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
          }}
        />
        {product.stock <= 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Agotado
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="font-bold text-blue-600 whitespace-nowrap ml-2">
            S/ {Number(product.price).toFixed(2)}
          </p>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center border-t pt-3">
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Editar producto"
            >
              <FiEdit className="text-base" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Eliminar producto"
            >
              <FiTrash2 className="text-base" />
            </button>
          </div>
          
          <div className="text-xs text-gray-500">
            Stock: <span className={product.stock <= 3 ? 'text-red-500 font-bold' : 'text-green-600'}>{product.stock}</span>
          </div>
        </div>
      </div>
    </div>
  );
}