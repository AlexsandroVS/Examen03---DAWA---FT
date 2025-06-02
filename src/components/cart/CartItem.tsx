// components/cart/CartItem.tsx
'use client';

import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import type { CartItem } from '@/types/product';

type CartItemProps = {
  item: CartItem;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
};

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex gap-4 p-6 hover:bg-gray-50 transition-colors">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.product.image_url || '/placeholder-product.jpg'}
          alt={item.product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
          }}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-800 truncate">{item.product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">S/ {item.product.price.toFixed(2)}</p>
          </div>
          <button
            onClick={() => onRemove(item.product.id)}
            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors ml-2"
            aria-label="Eliminar producto"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Reducir cantidad"
            >
              <FiMinus size={14} />
            </button>
            <span className="px-3 text-gray-700 font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Aumentar cantidad"
            >
              <FiPlus size={14} />
            </button>
          </div>
          
          <span className="font-semibold text-blue-600">
            S/ {(item.product.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}