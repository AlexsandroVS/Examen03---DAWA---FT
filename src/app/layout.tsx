import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import Navbar from "@/components/Navbar"; 
const geistSans = Geist({
  
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ✅ Asegura que la fuente se cargue correctamente
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // ✅ Mejora la compatibilidad con SSR
});

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Frontend de ecommerce para examen",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning> {/* ✅ Suprime advertencias de hidratación */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
        suppressHydrationWarning // ✅ Evita conflictos con atributos inyectados por extensiones
      >
       <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}