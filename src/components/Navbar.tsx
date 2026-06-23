import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Phone, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

const categories = [
  { name: 'المفروشات', sub: ['طقم غرفة النوم', 'مفارش السرير', 'مناشف'] },
  { name: 'البطاطين', sub: ['بطاطين صوف', 'بطاطين حرارية', 'بطاطين أطفال'] },
  { name: 'الحفة والوسائد', sub: ['وسائد نوم', 'وسائد زينة', 'حفة تركية'] },
  { name: 'السجاد', sub: ['سجاد تركي', 'سجاد فارسي', 'سجاد عصري'] },
  { name: 'العروض', sub: [] },
];

export default function Navbar({ cartCount, onCartClick, onSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchOpen(false);
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-crimson-700 text-white text-center py-2 text-sm font-medium tracking-wide">
        <span>شحن مجاني للطلبات فوق ٥٠٠ جنيه</span>
        <span className="mx-4 opacity-50">|</span>
        <span>عروض حصرية يومياً على المفروشات التركية</span>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg shadow-black/10'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-crimson-600 flex items-center justify-center shadow-md group-hover:bg-crimson-700 transition-colors">
                <span className="text-white font-black text-sm md:text-base tracking-tight leading-none">
                  CTR
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-crimson-600 font-black text-lg md:text-xl leading-tight">سنتر التركي</p>
                <p className="text-gray-400 text-xs font-medium">للمفروشات التركية</p>
              </div>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="relative"
                  onMouseEnter={() => cat.sub.length && setActiveDropdown(cat.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-crimson-600 font-semibold text-sm transition-colors rounded-lg hover:bg-crimson-50">
                    {cat.name}
                    {cat.sub.length > 0 && <ChevronDown size={14} className="opacity-60" />}
                  </button>
                  {cat.sub.length > 0 && activeDropdown === cat.name && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-up">
                      {cat.sub.map((item) => (
                        <a
                          key={item}
                          href="#products"
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-crimson-600 hover:bg-crimson-50 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search toggle desktop */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-crimson-600 hover:bg-crimson-50 rounded-lg transition-colors"
                aria-label="بحث"
              >
                <Search size={18} />
              </button>

              {/* Contact button */}
              <a
                href="tel:+201000000000"
                className="hidden md:flex items-center gap-2 px-4 py-2 border border-crimson-200 text-crimson-600 rounded-lg hover:bg-crimson-50 transition-colors text-sm font-semibold"
              >
                <Phone size={15} />
                تواصل معنا
              </a>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:text-crimson-600 hover:bg-crimson-50 transition-colors"
                aria-label="سلة التسوق"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-crimson-600 text-white text-xs font-bold rounded-full flex items-center justify-center badge-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="القائمة"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar (desktop) */}
          {searchOpen && (
            <div className="hidden md:block pb-4 animate-fade-in-up">
              <form onSubmit={handleSearch} className="relative">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن مفروشات، بطاطين، سجاد..."
                  className="w-full h-12 pr-5 pl-14 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-crimson-400 focus:ring-2 focus:ring-crimson-100 outline-none text-sm font-medium transition-all"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-crimson-600 rounded-lg flex items-center justify-center text-white hover:bg-crimson-700 transition-colors"
                >
                  <Search size={14} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            {/* Mobile search */}
            <div className="px-4 pt-4 pb-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن منتجات..."
                  className="w-full h-11 pr-4 pl-12 rounded-xl border border-gray-200 bg-gray-50 focus:border-crimson-400 outline-none text-sm font-medium"
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-crimson-600">
                  <Search size={16} />
                </button>
              </form>
            </div>

            <nav className="px-4 pb-4">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <button
                    className="flex items-center justify-between w-full py-3 text-gray-700 font-semibold border-b border-gray-50 hover:text-crimson-600 transition-colors"
                    onClick={() => setActiveDropdown(activeDropdown === cat.name ? null : cat.name)}
                  >
                    {cat.name}
                    {cat.sub.length > 0 && <ChevronDown size={14} className={`transition-transform ${activeDropdown === cat.name ? 'rotate-180' : ''}`} />}
                  </button>
                  {activeDropdown === cat.name && cat.sub.map((item) => (
                    <a
                      key={item}
                      href="#products"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 pr-4 text-sm text-gray-500 hover:text-crimson-600 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              ))}
              <a
                href="tel:+201000000000"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-crimson-600 text-white rounded-xl font-semibold hover:bg-crimson-700 transition-colors"
              >
                <Phone size={16} />
                تواصل معنا
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
