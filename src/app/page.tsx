// app/page.tsx
import HeroSection from '@/components/customer/HeroSection';
import FeaturesSection from '@/components/customer/FeaturesSection';
import ProductGrid from '@/components/customer/ProductGrid';
import CartSidebar from '@/components/cart/CartSidebar';
import { getProducts } from '@/services/api';

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ProductGrid products={products} />
      <CartSidebar />
    </main>
  );
}