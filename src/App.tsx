import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductsSection from './components/ProductsSection';
import PromoSection from './components/PromoSection';
import Testimonials from './components/Testimonials';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import type { Product } from './data/products';

export interface CartItem extends Product {
  qty: number;
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, qty: number) => {
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-white font-cairo" dir="rtl">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} onSearch={handleSearch} />
      <main>
        <Hero />
        <Categories onCategorySelect={handleCategorySelect} />
        <ProductsSection
          onAddToCart={addToCart}
          activeCategory={selectedCategory}
          searchQuery={searchQuery}
        />
        <PromoSection />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
    </div>
  );
}
