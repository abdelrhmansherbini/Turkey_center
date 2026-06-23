import { X, ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import type { CartItem } from '../App';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-crimson-600" />
            <h2 className="font-black text-gray-900 text-lg">سلة التسوق</h2>
            {items.length > 0 && (
              <span className="bg-crimson-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingCart size={32} className="text-gray-300" />
              </div>
              <div>
                <p className="font-bold text-gray-700 text-lg mb-1">السلة فارغة</p>
                <p className="text-gray-400 text-sm">أضف منتجات لبدء التسوق</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-crimson-600 text-white rounded-xl font-bold hover:bg-crimson-700 transition-colors text-sm"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug mb-1">{item.name}</p>
                  <p className="text-crimson-600 font-black text-sm">{(item.price * item.qty).toLocaleString('ar-EG')} ج.م</p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => item.qty > 1 ? onUpdateQty(item.id, item.qty - 1) : onRemove(item.id)}
                      className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-crimson-300 hover:text-crimson-600 transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-sm font-bold w-5 text-center text-gray-800">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-crimson-300 hover:text-crimson-600 transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-300 hover:text-red-500 transition-colors mr-auto"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">الإجمالي الفرعي</span>
              <span className="font-bold text-gray-900">{total.toLocaleString('ar-EG')} ج.م</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">الشحن</span>
              <span className="text-emerald-600 font-bold">{total >= 500 ? 'مجاني' : '50 ج.م'}</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="font-black text-gray-900 text-lg">الإجمالي</span>
              <span className="font-black text-crimson-600 text-xl">
                {(total + (total >= 500 ? 0 : 50)).toLocaleString('ar-EG')} ج.م
              </span>
            </div>

            <button className="w-full py-4 bg-crimson-600 text-white rounded-xl font-black text-lg hover:bg-crimson-700 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-crimson-200">
              إتمام الشراء
              <ArrowLeft size={18} className="rtl-flip" />
            </button>
            <button onClick={onClose} className="w-full py-3 text-gray-500 text-sm font-semibold hover:text-gray-700 transition-colors">
              متابعة التسوق
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
