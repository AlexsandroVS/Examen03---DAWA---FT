// components/customer/HeroSection.tsx
'use client';

import { FiArrowRight } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenido a nuestra tienda</h1>
          <p className="text-xl mb-8">
            Descubre los mejores productos a precios increíbles
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
            Ver productos <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}