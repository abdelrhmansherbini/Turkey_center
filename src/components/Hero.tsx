import { ArrowLeft, Star, Shield, Truck, ChevronDown } from 'lucide-react';

export default function Hero() {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCategories = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Full-bleed background ── */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=1"
          alt="غرفة نوم فاخرة"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* ── Decorative crimson accent line ── */}
      <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-crimson-600 via-crimson-400 to-transparent opacity-80" />

      {/* ── Main content ── */}
      <div className="relative flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-28 md:py-36">
        <div className="max-w-2xl text-right mr-auto">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/25 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-7 animate-fade-in-up">
            <span className="w-2 h-2 bg-crimson-400 rounded-full badge-pulse" />
            مفروشات تركية أصيلة منذ ٢٠٠٠
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white leading-[1.2] mb-6 animate-fade-in-up-delay-1">
            أحدث صيحات{' '}
            <span className="relative inline-block">
              <span className="text-crimson-400">المفروشات التركية</span>
              {/* Underline accent */}
              <svg
                className="absolute -bottom-1 right-0 w-full"
                viewBox="0 0 400 10"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8C80 3 160 1 240 3C320 5 370 7 398 5"
                  stroke="#DC143C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>
            {' '}والعالمية
            <br className="hidden sm:block" />
            في بيتك
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-medium animate-fade-in-up-delay-2">
            نوفر لكِ تشكيلة فاخرة من أرقى المفروشات، اللحفة، والبطاطين بأعلى جودة وأفضل الأسعار
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 justify-end animate-fade-in-up-delay-2">
            <a
              href="#products"
              onClick={handleScrollToProducts}
              className="group inline-flex items-center gap-3 px-9 py-4 bg-crimson-600 hover:bg-crimson-700 text-white rounded-2xl font-black text-lg transition-all duration-300 shadow-2xl shadow-crimson-900/50 hover:shadow-crimson-800/60 hover:-translate-y-0.5 active:scale-95"
            >
              تصفح المنتجات الآن
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-300 rtl-flip"
              />
            </a>

            <a
              href="#categories"
              onClick={(e) => { e.preventDefault(); document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 hover:border-white/50 text-white rounded-2xl font-bold text-lg transition-all duration-300"
            >
              استعرض الأقسام
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-5 justify-end mt-12 pt-10 border-t border-white/15 animate-fade-in-up-delay-3">
            {[
              { icon: <Truck size={16} />, label: 'شحن سريع لكل مصر' },
              { icon: <Shield size={16} />, label: 'ضمان الجودة ١٠٠٪' },
              { icon: <Star size={16} />, label: '+٥٠٠٠ عميل سعيد' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white/75 text-sm font-semibold">
                <div className="w-8 h-8 bg-crimson-600/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-crimson-500/40">
                  {item.icon}
                </div>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Floating rating card — desktop only */}
        <div className="hidden lg:flex absolute left-12 bottom-24 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 flex-col gap-1 border border-white/60 animate-fade-in-up-delay-3">
          <div className="flex gap-1 mb-1">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-3xl font-black text-gray-900 leading-none">٤.٩</p>
          <p className="text-xs text-gray-400 font-semibold">تقييم عملائنا</p>
          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2">
            {/* Avatars stack */}
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {[
                'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40',
                'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40',
                'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  alt=""
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">+٥٠٠٠ تقييم</span>
          </div>
        </div>

        {/* Floating collection badge — desktop only */}
        <div className="hidden lg:block absolute left-60 top-24 bg-crimson-600 text-white rounded-2xl shadow-xl px-5 py-4 animate-fade-in-up">
          <p className="text-xs font-bold opacity-75 mb-0.5">جديد الآن</p>
          <p className="font-black text-base">كولكشن ٢٠٢٥</p>
        </div>
      </div>

      {/* ── Scroll-down cue ── */}
      <div className="relative flex justify-center pb-8">
        <button
          onClick={handleScrollToCategories}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors group"
          aria-label="للأسفل"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">اكتشف المزيد</span>
          <ChevronDown size={22} className="group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </div>
    </section>
  );
}
