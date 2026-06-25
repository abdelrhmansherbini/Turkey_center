import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../data/products';
import type { Product } from '../lib/supabase';

const tabs = ['الكل', 'مفارش السرير', 'اللحفة', 'البطاطين', 'السجاد التركي'];

const categoryMap: Record<string, string> = {
  'مفارش السرير': 'مفارش السرير',
  'اللحفة': 'اللحفة',
  'البطاطين': 'البطاطين',
  'السجاد التركي': 'السجاد التركي',
};

const sortOptions = ['الافتراضي', 'السعر: من الأقل', 'السعر: من الأعلى', 'التقييم الأعلى'];

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
  activeCategory?: string;
  searchQuery?: string;
}

export default function ProductsSection({ onAddToCart, activeCategory, searchQuery }: ProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('الكل');
  const [sortBy, setSortBy] = useState('الافتراضي');
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // Sync active tab when parent category prop changes
  const resolvedCategory = activeCategory ? (categoryMap[activeCategory] ?? activeCategory) : '';
  useEffect(() => {
    if (resolvedCategory && tabs.includes(resolvedCategory)) {
      setActiveTab(resolvedCategory);
    }
  }, [resolvedCategory]);

  const filtered = products.filter((p) => {
    const matchesTab = activeTab === 'الكل' || p.category === activeTab;
    const matchesSearch = !searchQuery || p.name.includes(searchQuery) || p.category.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'السعر: من الأقل') return a.price - b.price;
    if (sortBy === 'السعر: من الأعلى') return b.price - a.price;
    if (sortBy === 'التقييم الأعلى') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          <span className="inline-block text-crimson-600 font-bold text-sm bg-crimson-50 px-4 py-1.5 rounded-full border border-crimson-100 mb-4">
            منتجاتنا المميزة
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : 'اكتشف أحدث المنتجات'}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            مجموعة مختارة من أجود المفروشات التركية بأسعار منافسة — أضف للسلة أو اطلب عبر الواتساب
          </p>
        </div>

        {/* ── Filter bar ── */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-crimson-600 text-white shadow-md shadow-crimson-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-crimson-300 hover:text-crimson-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-crimson-300 hover:text-crimson-600 transition-colors bg-white"
            >
              <SlidersHorizontal size={14} />
              {sortBy}
              <ChevronDown size={14} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
            </button>
            {showSort && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-10 py-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSort(false); }}
                    className={`block w-full text-right px-4 py-2.5 text-sm transition-colors ${
                      sortBy === opt ? 'text-crimson-600 font-bold bg-crimson-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6 font-medium">
          عرض <span className="text-gray-800 font-bold">{sorted.length}</span> منتج
        </p>

        {/* ── Products grid ── */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={32} className="animate-spin text-crimson-500" />
          </div>
        ) : sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal size={32} className="text-gray-300" />
            </div>
            <p className="text-xl font-bold text-gray-600 mb-2">لا توجد نتائج</p>
            <p className="text-sm text-gray-400">جرب البحث بكلمات مختلفة أو اختر قسماً آخر</p>
          </div>
        )}
      </div>
    </section>
  );
}
