import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Loader2, CheckCircle, Phone, MapPin, User } from 'lucide-react';
import type { CartItem } from '../lib/supabase';
import { supabase } from '../lib/supabase';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove, onClear }: CartDrawerProps) {
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    setSubmitting(true);

    const orderItems = items.map((i) => ({
      product_id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
      image: i.image,
    }));

    const { error } = await supabase.from('orders').insert({
      customer_name: form.name,
      customer_phone: form.phone,
      customer_address: form.address,
      items: orderItems,
      total,
      status: 'new',
    });

    setSubmitting(false);

    if (error) {
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      return;
    }

    setSuccess(true);
    onClear();
    setTimeout(() => {
      setSuccess(false);
      setCheckoutMode(false);
      setForm({ name: '', phone: '', address: '' });
      onClose();
    }, 3000);
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
            <h2 className="font-black text-lg">
              {checkoutMode ? 'إتمام الطلب' : 'سلة المشتريات'}
            </h2>
            {itemCount > 0 && !checkoutMode && (
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setCheckoutMode(false);
              onClose();
            }}
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
            <p className="text-gray-500 text-sm">سنتواصل معك قريباً لتأكيد الطلب وتفاصيل التوصيل</p>
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
        ) : checkoutMode ? (
          /* ── Checkout form ── */
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Order summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-2">
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

              {/* Customer info */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">الاسم بالكامل</label>
                <div className="relative">
                  <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="اكتب اسمك"
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 focus:ring-2 focus:ring-crimson-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">رقم الهاتف</label>
                <div className="relative">
                  <Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="01xxxxxxxxx"
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 focus:ring-2 focus:ring-crimson-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">العنوان بالكامل</label>
                <div className="relative">
                  <MapPin size={16} className="absolute right-3 top-4 text-gray-400" />
                  <textarea
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="المحافظة، المدينة، الشارع، رقم المنزل"
                    rows={3}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 focus:ring-2 focus:ring-crimson-100 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="p-5 border-t border-gray-100">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-crimson-600 hover:bg-crimson-700 disabled:opacity-50 text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-md transition-all"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    تأكيد الطلب · {total.toLocaleString('ar-EG')} ج.م
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setCheckoutMode(false)}
                className="w-full py-2.5 mt-2 text-gray-500 hover:text-gray-700 text-sm font-semibold transition-colors"
              >
                العودة للسلة
              </button>
            </div>
          </form>
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
                onClick={() => setCheckoutMode(true)}
                className="w-full py-4 bg-crimson-600 hover:bg-crimson-700 text-white rounded-xl font-black text-base shadow-md transition-colors"
              >
                إتمام الطلب
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
