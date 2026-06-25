import { useState, useEffect } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { supabase, type Testimonial } from '../lib/supabase';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setReviews(data as Testimonial[]);
        setLoading(false);
      });
  }, []);

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
            <span className="text-gray-400 font-medium">· بناءً على آراء عملائنا</span>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-crimson-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
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
                <p className="text-gray-600 text-sm leading-relaxed mb-5 font-medium relative z-10">
                  "{review.text}"
                </p>

                {/* User — initials avatar, no photos */}
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-black text-xs">{review.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
