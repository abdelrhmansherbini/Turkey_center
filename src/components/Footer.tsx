import { Phone, MapPin, Clock, Facebook, ExternalLink, Navigation } from 'lucide-react';

const WHATSAPP_NUMBER = '201001003061';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100063911057809';

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white" dir="rtl">

      {/* ── WhatsApp CTA strip ── */}
      <div className="bg-[#25D366]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white font-bold text-sm sm:text-base">
              تواصل معنا الآن عبر الواتساب للحصول على أفضل الأسعار والعروض
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-2.5 bg-white text-[#25D366] rounded-xl font-black text-sm hover:bg-green-50 transition-colors shadow"
            >
              <WhatsAppIcon size={16} />
              ابدأ المحادثة
            </a>
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* ── Brand column ── */}
            <div className="lg:col-span-4 text-right">
              <div className="flex items-center gap-3 justify-end mb-5">
                <div>
                  <p className="text-crimson-400 font-black text-2xl leading-tight">سنتر التركي</p>
                  <p className="text-gray-500 text-xs font-medium mt-0.5">للمفروشات التركية الفاخرة</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-crimson-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-crimson-900/40">
                  <span className="text-white font-black text-base">CTR</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                نوفر أجود المفروشات والبطاطين واللحفة التركية الأصيلة. التزامنا بالجودة والخدمة الممتازة جعلنا الخيار الأول لآلاف العملاء في زفتى والمحافظات المجاورة.
              </p>

              {/* Social buttons */}
              <div className="flex gap-3 justify-end">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors"
                >
                  <Facebook size={15} />
                  فيسبوك
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1fbe5a] text-white rounded-xl text-sm font-bold transition-colors"
                >
                  <WhatsAppIcon size={15} />
                  واتساب
                </a>
              </div>
            </div>

            {/* ── Quick links ── */}
            <div className="lg:col-span-2 text-right">
              <h4 className="font-black text-white mb-5 text-base border-b border-gray-800 pb-3">روابط سريعة</h4>
              <ul className="space-y-3">
                {[
                  { label: 'الرئيسية', href: '#' },
                  { label: 'المنتجات', href: '#products' },
                  { label: 'الأقسام', href: '#categories' },
                  { label: 'العروض', href: '#products' },
                  { label: 'تواصل معنا', href: `https://wa.me/${WHATSAPP_NUMBER}` },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-gray-400 hover:text-crimson-400 transition-colors text-sm font-medium flex items-center gap-2 justify-end group"
                    >
                      {label}
                      <span className="text-gray-700 group-hover:text-crimson-500 transition-colors text-base">›</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Categories ── */}
            <div className="lg:col-span-2 text-right">
              <h4 className="font-black text-white mb-5 text-base border-b border-gray-800 pb-3">أقسامنا</h4>
              <ul className="space-y-3">
                {['قسم المفروشات', 'قسم اللحفة', 'قسم البطاطين', 'السجاد التركي'].map((cat) => (
                  <li key={cat}>
                    <a
                      href="#categories"
                      className="text-gray-400 hover:text-crimson-400 transition-colors text-sm font-medium flex items-center gap-2 justify-end group"
                    >
                      {cat}
                      <span className="text-gray-700 group-hover:text-crimson-500 transition-colors text-base">›</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact info ── */}
            <div className="lg:col-span-4 text-right">
              <h4 className="font-black text-white mb-5 text-base border-b border-gray-800 pb-3">تواصل معنا</h4>

              <ul className="space-y-5">
                {/* Phone */}
                <li>
                  <a
                    href="tel:01001003061"
                    className="flex items-start gap-3 justify-end group"
                  >
                    <div className="text-right">
                      <p className="text-white font-bold text-base group-hover:text-crimson-400 transition-colors">
                        01001003061
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">هاتف وواتساب</p>
                    </div>
                    <div className="w-10 h-10 bg-crimson-600/20 border border-crimson-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={17} className="text-crimson-400" />
                    </div>
                  </a>
                </li>

                {/* Address */}
                <li className="flex items-start gap-3 justify-end">
                  <div className="text-right">
                    <p className="text-white font-bold text-sm leading-snug">
                      زفتى — شارع أبو الحسايب
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">أمام التأمينات الإجتماعية</p>
                  </div>
                  <div className="w-10 h-10 bg-crimson-600/20 border border-crimson-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={17} className="text-crimson-400" />
                  </div>
                </li>

                {/* Hours */}
                <li className="flex items-start gap-3 justify-end">
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">يومياً من ١٠ ص حتى ١٠ م</p>
                    <p className="text-gray-500 text-xs mt-0.5">جميع أيام الأسبوع</p>
                  </div>
                  <div className="w-10 h-10 bg-crimson-600/20 border border-crimson-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={17} className="text-crimson-400" />
                  </div>
                </li>

                {/* Facebook */}
                <li>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 justify-end group"
                  >
                    <div className="text-right">
                      <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors flex items-center gap-1 justify-end">
                        صفحتنا على فيسبوك
                        <ExternalLink size={12} className="opacity-60" />
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">تابعنا للعروض الحصرية</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Facebook size={17} className="text-blue-400" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Map placeholder ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h4 className="font-black text-white text-base mb-4 text-right">موقعنا على الخريطة</h4>
          <div className="relative rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 h-44 flex flex-col items-center justify-center gap-3">
            {/* Decorative grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mapgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapgrid)" />
            </svg>

            {/* Streets decoration */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 176" preserveAspectRatio="none">
              <line x1="0" y1="88" x2="400" y2="88" stroke="#DC143C" strokeWidth="2"/>
              <line x1="200" y1="0" x2="200" y2="176" stroke="#DC143C" strokeWidth="1.5"/>
              <line x1="0" y1="44" x2="400" y2="44" stroke="white" strokeWidth="0.8"/>
              <line x1="0" y1="132" x2="400" y2="132" stroke="white" strokeWidth="0.8"/>
              <line x1="100" y1="0" x2="100" y2="176" stroke="white" strokeWidth="0.8"/>
              <line x1="300" y1="0" x2="300" y2="176" stroke="white" strokeWidth="0.8"/>
            </svg>

            {/* Pin */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-crimson-600 rounded-full flex items-center justify-center shadow-2xl shadow-crimson-900/70 ring-4 ring-crimson-400/30">
                <Navigation size={22} className="text-white fill-white" />
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl px-5 py-2.5 text-center">
                <p className="text-white font-black text-sm">سنتر التركي للمفروشات</p>
                <p className="text-gray-400 text-xs mt-0.5">زفتى — شارع أبو الحسايب</p>
              </div>
            </div>

            {/* Open maps link */}
            <a
              href="https://maps.google.com/?q=زفتى+شارع+أبو+الحسايب"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors bg-gray-900/80 px-3 py-1.5 rounded-lg border border-gray-700"
            >
              <ExternalLink size={11} />
              فتح في خرائط جوجل
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs font-medium">
            © {new Date().getFullYear()} سنتر التركي للمفروشات — جميع الحقوق محفوظة
          </p>
          <p className="text-gray-600 text-xs font-medium">
            زفتى، شارع أبو الحسايب — أمام التأمينات الإجتماعية
          </p>
        </div>
      </div>
    </footer>
  );
}
