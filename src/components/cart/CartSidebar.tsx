// components/cart/CartSidebar.tsx
'use client';

import { FiX, FiShoppingCart, FiChevronRight } from 'react-icons/fi';
import CartItem from './CartItem';
import useCart from './useCart';

export default function CartSidebar() {
  const {
    cart,
    totalItems,
    totalPrice,
    isOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <>
      {/* Botón flotante del carrito */}
      <button
        onClick={toggleCart}
        className="fixed right-6 top-20 z-40 p-3 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
        aria-label="Abrir carrito"
      >
        <FiShoppingCart className="text-xl" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0  bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <FiShoppingCart className="text-blue-600 text-2xl" />
            <h2 className="text-xl font-bold text-gray-800">
              Tu Carrito <span className="text-blue-600">({totalItems})</span>
            </h2>
          </div>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar carrito"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="h-[calc(100%-180px)] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <FiShoppingCart className="text-gray-300 text-5xl mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-400 mb-4">
                Agrega productos para comenzar
              </p>
              <button
                onClick={toggleCart}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Seguir comprando <FiChevronRight />
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.quantity}`}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700">Subtotal:</span>
              <span className="font-bold text-lg text-blue-600">
                S/ {totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 font-medium"
            >
              Proceder al pago <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </>
  );
}