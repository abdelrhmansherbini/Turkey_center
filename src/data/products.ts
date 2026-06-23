export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  description: string;
  colors: string[];
  sizes: string[];
}

export const products: Product[] = [
  // ── قسم المفروشات ──────────────────────────────────────────────
  {
    id: 1,
    name: 'طقم ملاية تركي مطرز',
    category: 'مفارش السرير',
    price: 449,
    originalPrice: 650,
    image: 'https://images.pexels.com/photos/6032281/pexels-photo-6032281.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 243,
    badge: 'الأكثر مبيعاً',
    badgeColor: 'bg-crimson-600',
    description: 'طقم ملاية مطرز بخيوط ذهبية من القطن التركي الفاخر، ناعم وطويل الأمد',
    colors: ['#FFFFFF', '#F5F5DC', '#C0C0C0', '#D2B48C'],
    sizes: ['غرفة واحدة', 'غرفتين', 'كينج', 'سوبر كينج'],
  },
  {
    id: 2,
    name: 'طقم مفارش قطن تركي ساتان',
    category: 'مفارش السرير',
    price: 599,
    originalPrice: 850,
    image: 'https://images.pexels.com/photos/6186812/pexels-photo-6186812.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 178,
    badge: 'خصم ٣٠٪',
    badgeColor: 'bg-orange-500',
    description: 'طقم مفارش ساتان تركي فاخر، لامع وناعم كالحرير مع ألوان راقية تناسب غرفتك',
    colors: ['#FFFFFF', '#F0EAD6', '#B0C4DE', '#D8BFD8'],
    sizes: ['غرفة واحدة', 'مزدوج', 'كينج'],
  },

  // ── قسم اللحفة ─────────────────────────────────────────────────
  {
    id: 3,
    name: 'لحاف فايبر شتوي فاخر',
    category: 'اللحفة',
    price: 389,
    originalPrice: 560,
    image: 'https://images.pexels.com/photos/6782384/pexels-photo-6782384.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 312,
    badge: 'الأكثر مبيعاً',
    badgeColor: 'bg-crimson-600',
    description: 'لحاف شتوي بحشوة فايبر عالية الكثافة يمنحك دفئاً استثنائياً طوال الليل',
    colors: ['#FFFFFF', '#FFF8DC', '#E8E8E8'],
    sizes: ['فردي', 'مزدوج', 'كينج', 'سوبر كينج'],
  },
  {
    id: 4,
    name: 'لحاف مبطن تركي بالأكواد',
    category: 'اللحفة',
    price: 499,
    originalPrice: 720,
    image: 'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 195,
    badge: 'جديد',
    badgeColor: 'bg-emerald-500',
    description: 'لحاف مبطن بخيوط أكواد منظمة يمنع تجمع الحشوة، تصميم أنيق وخامة تركية أصيلة',
    colors: ['#FFFFFF', '#C8A882', '#708090'],
    sizes: ['فردي', 'مزدوج', 'كينج'],
  },

  // ── قسم البطاطين ───────────────────────────────────────────────
  {
    id: 5,
    name: 'بطانية حفر ليزر ناعمة',
    category: 'البطاطين',
    price: 279,
    originalPrice: 400,
    image: 'https://images.pexels.com/photos/6782354/pexels-photo-6782354.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 267,
    badge: 'الأكثر طلباً',
    badgeColor: 'bg-blue-500',
    description: 'بطانية بتقنية الحفر بالليزر تمنح نعومة استثنائية وتصميماً فاخراً لا يتكرر',
    colors: ['#8B0000', '#000080', '#228B22', '#D2691E'],
    sizes: ['فردي', 'مزدوج', 'كينج'],
  },
  {
    id: 6,
    name: 'بطانية صوف تركية دافئة',
    category: 'البطاطين',
    price: 319,
    originalPrice: 450,
    image: 'https://images.pexels.com/photos/6032285/pexels-photo-6032285.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 143,
    badge: 'خصم ٢٩٪',
    badgeColor: 'bg-orange-500',
    description: 'بطانية صوف تركي طبيعي خفيفة الوزن ودافئة جداً، مناسبة لكل الفصول',
    colors: ['#8B0000', '#4169E1', '#2E8B57', '#8B4513'],
    sizes: ['فردي', 'مزدوج', 'كينج'],
  },
];
