import { Star, Heart, ShoppingCart, Plus } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [wished, setWished] = useState(false);

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `مرحباً سنتر التركي، أود الاستفسار عن منتج: ${product.name}`
    );
    window.open(`https://wa.me/201001003061?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
      {/* ── Image ── */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 right-3 ${product.badge_color} text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow`}>
            {product.badge}
          </div>
        )}

        {/* Discount pill */}
        {discount > 0 && (
          <div className="absolute top-3 left-10 bg-white text-crimson-600 text-xs font-black px-2 py-1 rounded-lg border border-crimson-100 shadow-sm">
            -{discount}٪
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="المفضلة"
        >
          <Heart
            size={14}
            className={wished ? 'fill-crimson-600 text-crimson-600' : 'text-gray-400'}
          />
        </button>

        {/* Out of stock overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-1.5 rounded-lg font-black text-sm">نفذت الكمية</span>
          </div>
        )}

        {/* Hover overlay — quick add to cart */}
        {product.in_stock && (
          <div className="product-overlay absolute inset-0 bg-black/30 flex items-end p-3">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Plus size={15} />
              أضف للسلة
            </button>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category label */}
        <p className="text-crimson-500 text-xs font-bold mb-1 tracking-wide">{product.category}</p>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-sm md:text-[0.95rem] line-clamp-2 leading-snug mb-2 flex-1">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={11}
                className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">({product.reviews})</span>
        </div>

        {/* Color swatches */}
        <div className="flex gap-1.5 mb-4">
          {product.colors.slice(0, 5).map((color, i) => (
            <button
              key={i}
              className="w-4 h-4 rounded-full border-2 border-white ring-1 ring-gray-200 hover:ring-crimson-400 hover:scale-125 transition-all"
              style={{ backgroundColor: color }}
              aria-label={`لون ${i + 1}`}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-xs text-gray-400 self-center font-medium">+{product.colors.length - 5}</span>
          )}
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between mb-3">
          <div className="flex flex-col items-end">
            <span className="text-crimson-600 font-black text-xl leading-none">
              {product.price.toLocaleString('ar-EG')}
              <span className="text-sm font-bold mr-1">ج.م</span>
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-gray-400 text-xs line-through font-medium mt-0.5">
                {product.original_price.toLocaleString('ar-EG')} ج.م
              </span>
            )}
          </div>
          <span className="text-gray-400 text-xs font-medium">{product.sizes.length} مقاسات</span>
        </div>

        {/* ── Action buttons ── */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.in_stock}
            className="flex-1 py-3 bg-crimson-600 hover:bg-crimson-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-crimson-200 transition-all duration-200"
          >
            <ShoppingCart size={15} />
            أضف للسلة
          </button>
          <button
            onClick={handleWhatsApp}
            className="px-3 py-3 bg-[#25D366] hover:bg-[#1fbe5a] active:scale-95 text-white rounded-xl font-bold text-sm flex items-center justify-center shadow-md shadow-green-200 transition-all"
            aria-label="اطلب عبر الواتساب"
          >
            <WhatsAppIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
