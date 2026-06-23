import { ArrowLeft, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

function useCountdown(target: Date) {
  const getTime = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { h: 0, m: 0, s: 0 };
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(getTime);
  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(t);
  });
  return time;
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-black text-2xl md:text-3xl border border-white/30 shadow-inner">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-white/70 text-xs font-medium mt-1">{label}</span>
    </div>
  );
}

export default function PromoSection() {
  const target = new Date(Date.now() + 1000 * 60 * 60 * 47 + 1000 * 60 * 23);
  const { h, m, s } = useCountdown(target);

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-crimson-700 via-crimson-600 to-rose-700">
      {/* Background decoratives */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30">
              <Clock size={14} />
              عرض محدود الوقت
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              خصم حتى <br />
              <span className="text-yellow-300">٤٠٪ على كل شيء!</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              استغل عرض نهاية الموسم واحصل على أرقى المفروشات التركية بأقل الأسعار. العرض محدود!
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-crimson-700 rounded-xl font-black text-lg hover:bg-yellow-50 transition-all shadow-xl group"
            >
              تسوق الآن
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform rtl-flip" />
            </a>
          </div>

          {/* Countdown */}
          <div className="flex flex-col items-center lg:items-end">
            <p className="text-white/70 font-semibold mb-6 text-lg">ينتهي العرض خلال:</p>
            <div className="flex gap-4">
              <Digit value={h} label="ساعة" />
              <div className="text-white/70 text-3xl font-black self-center pb-5">:</div>
              <Digit value={m} label="دقيقة" />
              <div className="text-white/70 text-3xl font-black self-center pb-5">:</div>
              <Digit value={s} label="ثانية" />
            </div>
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-right">
              <p className="text-white/60 text-sm font-medium mb-1">كوبون الخصم</p>
              <div className="flex items-center gap-3 justify-end">
                <span className="text-yellow-300 font-black text-2xl tracking-widest">TURKI40</span>
                <button
                  onClick={() => navigator.clipboard?.writeText('TURKI40')}
                  className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg font-bold transition-colors"
                >
                  نسخ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
