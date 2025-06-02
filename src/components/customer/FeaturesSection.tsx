// components/customer/FeaturesSection.tsx
'use client';

import { FiTruck, FiShield, FiCreditCard, FiHeadphones } from 'react-icons/fi';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FiTruck className="text-3xl mb-4 text-blue-600" />,
      title: "Envío Rápido",
      description: "Recibe tus productos en 24-48 horas"
    },
    {
      icon: <FiShield className="text-3xl mb-4 text-blue-600" />,
      title: "Garantía",
      description: "Todos nuestros productos tienen garantía"
    },
    {
      icon: <FiCreditCard className="text-3xl mb-4 text-blue-600" />,
      title: "Pago Seguro",
      description: "Múltiples métodos de pago"
    },
    {
      icon: <FiHeadphones className="text-3xl mb-4 text-blue-600" />,
      title: "Soporte 24/7",
      description: "Estamos siempre para ayudarte"
    }
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}