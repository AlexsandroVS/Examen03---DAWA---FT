// components/customer/ProductItem.tsx
'use client';

import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

export default function ProductItem({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100 group">
      <div className="relative h-48 w-full aspect-square">
        <Image
          src={product.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholder-product.jpg"
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
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">S/ {product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`p-2 rounded-full transition-colors ${
              product.stock > 0
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            aria-label={product.stock > 0 ? 'Añadir al carrito' : 'Producto agotado'}
          >
            <FiShoppingCart />
          </button>
        </div>
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-xs text-orange-500 mt-2">
            ¡Solo quedan {product.stock} unidades!
          </p>
        )}
      </div>
    </div>
  );
}