// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShoppingBag, FiUser, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const pathname = usePathname();
  const { totalItems, toggleCart } = useCart();

  const isActive = (path: string) => 
    pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500';

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-30">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ecommerce
          </h1>
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link href="/" className={`flex items-center gap-2 ${isActive('/')}`}>
          <FiHome className="text-lg" />
          <span className="hidden sm:inline">Inicio</span>
        </Link>
        <Link href="/admin" className={`flex items-center gap-2 ${isActive('/admin')}`}>
          <FiShoppingBag className="text-lg" />
          <span className="hidden sm:inline">Administrador</span>
        </Link>
        
        {/* Botón del carrito */}
        <button
          onClick={toggleCart}
          className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Carrito de compras"
        >
          <FiShoppingCart className="text-xl" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUser className="text-blue-600" />
          </div>
          <span className="hidden sm:inline text-sm font-medium">Usuario</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;