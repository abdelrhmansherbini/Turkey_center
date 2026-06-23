import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'أحمد محمد',
    initials: 'أم',
    location: 'القاهرة',
    rating: 5,
    text: 'منتجات رائعة وجودة عالية جداً. البطانية التركية دافئة جداً وناعمة. سأتسوق منهم مرة أخرى بكل تأكيد.',
    date: 'منذ أسبوع',
    color: 'bg-crimson-600',
  },
  {
    name: 'محمد إبراهيم',
    initials: 'مإ',
    location: 'الإسكندرية',
    rating: 5,
    text: 'أفضل مفروشات اشتريتها في حياتي. السجادة التركية أضافت طابعاً رائعاً لغرفة معيشتي. الشحن كان سريعاً جداً!',
    date: 'منذ أسبوعين',
    color: 'bg-blue-600',
  },
  {
    name: 'محمد السيد',
    initials: 'مس',
    location: 'الجيزة',
    rating: 5,
    text: 'خدمة عملاء ممتازة وجودة المنتجات تفوق التوقعات. اشتريت طقم غرفة النوم الكامل وهو أجمل من الصور.',
    date: 'منذ شهر',
    color: 'bg-emerald-600',
  },
  {
    name: 'عمر حسن',
    initials: 'عح',
    location: 'المنصورة',
    rating: 4,
    text: 'منتجات ممتازة بأسعار معقولة جداً. اللحاف التركي دافئ جداً وخامته راقية. أنصح الجميع بالتسوق من هنا.',
    date: 'منذ شهرين',
    color: 'bg-amber-600',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-crimson-600 font-bold text-sm bg-crimson-50 px-4 py-1.5 rounded-full border border-crimson-100 mb-4">
            آراء عملائنا
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            ماذا يقول عملاؤنا؟
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={20} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-600 font-bold text-lg">٤.٩ / ٥</span>
            <span className="text-gray-400 font-medium">· بناءً على +٥٠٠٠ تقييم</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <Quote size={40} className="text-gray-50 absolute -top-2 -left-2" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4 relative z-10">
                {[1,2,3,4,5].map(s => (
                  <Star
                    key={s}
                    size={14}
                    className={s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 font-medium line-clamp-4 relative z-10">
                "{review.text}"
              </p>

              {/* User — initials avatar, no photos */}
              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white font-black text-xs">{review.initials}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.location} · {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
