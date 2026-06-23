interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  count: number;
  accentColor: string;
  overlayFrom: string;
  overlayTo: string;
  span?: string;
}

const categories: Category[] = [
  {
    id: 'مفارش السرير',
    title: 'قسم المفروشات',
    subtitle: 'Beddings',
    description: 'أرقى المفارش والأغطية من القطن التركي الفاخر لنوم مريح وبأعلى جودة',
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=900',
    count: 120,
    accentColor: '#DC143C',
    overlayFrom: 'from-crimson-800/75',
    overlayTo: 'to-rose-900/40',
  },
  {
    id: 'اللحفة',
    title: 'قسم اللحفة',
    subtitle: 'Comforters',
    description: 'لحفات حريرية ناعمة بحشوات طبيعية فاخرة تمنحك دفء الشتاء وخفة الصيف',
    image: 'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=900',
    count: 75,
    accentColor: '#b45309',
    overlayFrom: 'from-amber-800/75',
    overlayTo: 'to-orange-900/40',
  },
  {
    id: 'البطاطين',
    title: 'قسم البطاطين',
    subtitle: 'Blankets',
    description: 'بطاطين صوف وأكريليك تركية بتصاميم مميزة تجمع الدفء والأناقة معاً',
    image: 'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=900',
    count: 85,
    accentColor: '#065f46',
    overlayFrom: 'from-emerald-800/75',
    overlayTo: 'to-teal-900/40',
  },
  {
    id: 'السجاد التركي',
    title: 'السجاد التركي',
    subtitle: 'Turkish Rugs',
    description: 'تصاميم أصيلة مصنوعة يدوياً تعكس الحرفية التركية الراقية وتُضفي لمسة فنية على كل ركن من منزلك',
    image: 'https://images.pexels.com/photos/6580227/pexels-photo-6580227.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 50,
    accentColor: '#1e3a5f',
    overlayFrom: 'from-blue-900/75',
    overlayTo: 'to-indigo-900/40',
    span: 'lg:col-span-3',
  },
];

interface CategoriesProps {
  onCategorySelect: (cat: string) => void;
}

export default function Categories({ onCategorySelect }: CategoriesProps) {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <span className="inline-block text-crimson-600 font-bold text-sm bg-crimson-50 px-4 py-1.5 rounded-full border border-crimson-100 mb-4">
            تسوق حسب القسم
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            استكشف أقسامنا المتنوعة
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            نوفر لك أرقى المفروشات التركية بمختلف الأصناف والمقاسات لتناسب كل غرفة في منزلك
          </p>
        </div>

        {/* ── Top 3 equal-width cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.id} cat={cat} onSelect={onCategorySelect} />
          ))}
        </div>

        {/* ── Wide carpet card ── */}
        <div className="grid grid-cols-1 gap-6">
          <CategoryCard key={categories[3].id} cat={categories[3]} onSelect={onCategorySelect} wide />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── */
/*  Reusable card                  */
/* ─────────────────────────────── */
function CategoryCard({
  cat,
  onSelect,
  wide = false,
}: {
  cat: Category;
  onSelect: (id: string) => void;
  wide?: boolean;
}) {
  return (
    <button
      onClick={() => onSelect(cat.id)}
      className={`group relative rounded-3xl overflow-hidden shadow-md
        hover:shadow-2xl transition-all duration-400 text-right
        focus:outline-none focus-visible:ring-4 focus-visible:ring-crimson-400
        ${wide ? 'aspect-[21/7] md:aspect-[21/6]' : 'aspect-[3/4] sm:aspect-[4/5]'}
      `}
    >
      {/* Background image with zoom on hover */}
      <img
        src={cat.image}
        alt={cat.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Colour gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${cat.overlayFrom} ${cat.overlayTo}
          opacity-60 group-hover:opacity-75 transition-opacity duration-400`}
      />

      {/* Dark bottom vignette for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Subtle border glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 transition-all duration-300"
        style={{ '--tw-ring-color': cat.accentColor } as React.CSSProperties}
      />

      {/* ── Card content ── */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">

        {/* Item count pill */}
        <div className="flex items-center justify-end mb-3">
          <span className="bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold px-3 py-1 rounded-full">
            {cat.count}+ منتج
          </span>
        </div>

        {/* Sub-label (EN) */}
        <p className="text-white/60 text-xs font-semibold tracking-[0.15em] uppercase mb-1">
          {cat.subtitle}
        </p>

        {/* Title (AR) */}
        <h3 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2">
          {cat.title}
        </h3>

        {/* Description — revealed on hover */}
        <p
          className={`text-white/75 text-sm font-medium leading-relaxed
            transition-all duration-300
            ${wide ? 'max-w-xl' : ''}
            opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0`}
        >
          {cat.description}
        </p>

        {/* CTA row */}
        <div className="mt-4 flex items-center gap-2 text-white text-sm font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
          <span>استعرض المجموعة</span>
          <span className="text-base leading-none">←</span>
        </div>
      </div>
    </button>
  );
}
