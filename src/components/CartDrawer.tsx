import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle, Phone, MapPin, User, MessageCircle } from 'lucide-react';
import type { CartItem } from '../lib/supabase';
import { supabase } from '../lib/supabase';

const STORE_WHATSAPP = '201001003061';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove, onClear }: CartDrawerProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = 'الرجاء إدخال الاسم';
    if (!form.phone.trim()) e.phone = 'الرجاء إدخال رقم الهاتف';
    else if (!/^0?1[0-2,5]\d{8}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'رقم هاتف غير صحيح';
    if (!form.address.trim()) e.address = 'الرجاء إدخال العنوان';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = async () => {
    if (!validate()) return;

    // Build the WhatsApp message
    const lines: string[] = [];
    lines.push('🛒 *طلب جديد من سنتر التركي*');
    lines.push('');
    lines.push(`👤 *اسم العميل:* ${form.name}`);
    lines.push(`📞 *رقم الهاتف:* ${form.phone}`);
    lines.push(`📍 *العنوان:* ${form.address}`);
    lines.push('');
    lines.push('📦 *الطلبات:*');
    items.forEach((item) => {
      lines.push(`• ${item.name} × ${item.qty} - ${(item.price * item.qty).toLocaleString('ar-EG')} ج.م`);
    });
    lines.push('');
    lines.push(`💰 *الإجمالي: ${total.toLocaleString('ar-EG')} ج.م*`);

    const message = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${message}`;

    // Save order to Supabase so admin can see it
    const orderItems = items.map((i) => ({
      product_id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
      image: i.image,
    }));

    await supabase.from('orders').insert({
      customer_name: form.name,
      customer_phone: form.phone,
      customer_address: form.address,
      items: orderItems,
      total,
      status: 'new',
    });

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show success, then reset
    setSuccess(true);
    onClear();
    setTimeout(() => {
      setSuccess(false);
      setShowPopup(false);
      setForm({ name: '', phone: '', address: '' });
      setErrors({});
      onClose();
    }, 2500);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-crimson-600 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-black text-lg">سلة المشتريات</h2>
            {itemCount > 0 && (
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success state */}
        {success ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">تم إرسال طلبك بنجاح!</h3>
            <p className="text-gray-500 text-sm">تم فتح واتساب لإرسال الطلب إلى المتجر</p>
          </div>
        ) : items.length === 0 ? (
          /* Empty cart */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <p className="text-lg font-bold text-gray-600 mb-1">سلتك فارغة</p>
            <p className="text-sm text-gray-400">أضف منتجات لتبدأ التسوق</p>
          </div>
        ) : (
          /* ── Cart items list ── */
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">{item.name}</h4>
                    <p className="text-crimson-600 font-black text-sm mb-2">
                      {item.price.toLocaleString('ar-EG')} ج.م
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-crimson-300 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="font-bold text-gray-900 text-sm w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-crimson-300 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="mr-auto w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 font-medium">الإجمالي</span>
                <span className="font-black text-crimson-600 text-2xl">
                  {total.toLocaleString('ar-EG')} <span className="text-base">ج.م</span>
                </span>
              </div>
              <button
                onClick={() => setShowPopup(true)}
                className="w-full py-4 bg-[#25D366] hover:bg-[#1fbe5a] text-white rounded-xl font-black text-base flex items-center justify-center gap-2.5 shadow-md shadow-green-200 transition-colors"
              >
                <WhatsAppIcon size={20} />
                إتمام الطلب عبر الواتساب
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Checkout popup modal ── */}
      {showPopup && !success && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Popup header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#25D366] text-white">
              <div className="flex items-center gap-2">
                <WhatsAppIcon size={20} />
                <h2 className="font-black text-lg">إتمام الطلب</h2>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Order summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">ملخص الطلب</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-gray-400 text-xs">{item.qty} × {item.price.toLocaleString('ar-EG')} ج.م</p>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">
                        {(item.price * item.qty).toLocaleString('ar-EG')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900">الإجمالي</span>
                  <span className="font-black text-crimson-600 text-lg">
                    {total.toLocaleString('ar-EG')} ج.م
                  </span>
                </div>
              </div>

              <p className="text-gray-500 text-sm text-center">
                أدخل بياناتك وسيتم إرسال الطلب مباشرة عبر واتساب إلى المتجر
              </p>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">الاسم بالكامل</label>
                <div className="relative">
                  <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                    placeholder="اكتب اسمك"
                    className={`w-full pr-10 pl-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.name ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-crimson-400 focus:ring-crimson-100'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">رقم الهاتف</label>
                <div className="relative">
                  <Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: undefined }); }}
                    placeholder="01xxxxxxxxx"
                    className={`w-full pr-10 pl-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-crimson-400 focus:ring-crimson-100'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">العنوان بالتفصيل</label>
                <div className="relative">
                  <MapPin size={16} className="absolute right-3 top-4 text-gray-400" />
                  <textarea
                    value={form.address}
                    onChange={(e) => { setForm({ ...form, address: e.target.value }); setErrors({ ...errors, address: undefined }); }}
                    placeholder="المحافظة، المدينة، الشارع، رقم المنزل"
                    rows={3}
                    className={`w-full pr-10 pl-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.address ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-crimson-400 focus:ring-crimson-100'
                    }`}
                  />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address}</p>}
              </div>

              {/* Confirm button */}
              <button
                onClick={handleConfirm}
                className="w-full py-4 bg-[#25D366] hover:bg-[#1fbe5a] text-white rounded-xl font-black text-base flex items-center justify-center gap-2.5 shadow-md shadow-green-200 transition-colors"
              >
                <WhatsAppIcon size={20} />
                تأكيد الطلب وإرسال عبر واتساب
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full py-2.5 text-gray-500 hover:text-gray-700 text-sm font-semibold transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
