import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import { products, type Product } from '../data/products';

const tabs = ['الكل', 'مفارش السرير', 'اللحفة', 'البطاطين'];

const categoryMap: Record<string, string> = {
  'مفارش السرير': 'مفارش السرير',
  'اللحفة': 'اللحفة',
  'البطاطين': 'البطاطين',
};

const sortOptions = ['الافتراضي', 'السعر: من الأقل', 'السعر: من الأعلى', 'التقييم الأعلى'];

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
  activeCategory?: string;
  searchQuery?: string;
}

export default function ProductsSection({ onAddToCart, activeCategory, searchQuery }: ProductsSectionProps) {
  const [activeTab, setActiveTab] = useState('الكل');
  const [sortBy, setSortBy] = useState('الافتراضي');
  const [showSort, setShowSort] = useState(false);

  // Sync active tab when parent category prop changes
  const resolvedCategory = activeCategory ? (categoryMap[activeCategory] ?? activeCategory) : '';
  if (resolvedCategory && resolvedCategory !== activeTab && tabs.includes(resolvedCategory)) {
    setActiveTab(resolvedCategory);
  }

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
            مجموعة مختارة من أجود المفروشات التركية بأسعار منافسة — اطلب عبر الواتساب مباشرة
          </p>
        </div>

        {/* ── Filter bar ── */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Category tabs */}
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

          {/* Sort */}
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

        {/* Count */}
        <p className="text-gray-400 text-sm mb-6 font-medium">
          عرض <span className="text-gray-800 font-bold">{sorted.length}</span> منتج
        </p>

        {/* ── Products grid ── */}
        {sorted.length > 0 ? (
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

        {/* WhatsApp CTA banner */}
        <div className="mt-14 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
          <div>
            <h3 className="font-black text-gray-900 text-lg mb-1">لا تجد ما تبحث عنه؟</h3>
            <p className="text-gray-500 text-sm">تواصل معنا مباشرة عبر الواتساب وسنساعدك في إيجاد ما تحتاجه</p>
          </div>
          <a
            href="https://wa.me/201001003061"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#1fbe5a] text-white rounded-xl font-black text-base transition-colors shadow-md shadow-green-200"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            تواصل معنا
          </a>
        </div>
      </div>
    </section>
  );
}
