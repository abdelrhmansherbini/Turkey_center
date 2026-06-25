import { useState, useEffect } from 'react';
import { Loader2, Phone, MapPin, ShoppingBag, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase, type Order } from '../lib/supabase';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  new: { label: 'جديد', color: 'bg-amber-100 text-amber-700', icon: Clock },
  contacted: { label: 'تم التواصل', color: 'bg-blue-100 text-blue-700', icon: Phone },
  completed: { label: 'مكتمل', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-700', icon: XCircle },
};

const statusOptions = ['new', 'contacted', 'completed', 'cancelled'];

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const load = () => {
    setLoading(true);
    supabase.from('orders').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!error && data) setOrders(data as Order[]);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    load();
  };

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            filter === 'all' ? 'bg-crimson-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-crimson-300'
          }`}
        >
          الكل ({orders.length})
        </button>
        {statusOptions.map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          const cfg = statusConfig[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === s ? 'bg-crimson-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-crimson-300'
              }`}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-crimson-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <ShoppingBag size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-bold">لا توجد طلبات</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const cfg = statusConfig[order.status] ?? statusConfig.new;
            const isOpen = expanded === order.id;
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Order header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : order.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-right"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${cfg.color} rounded-xl flex items-center justify-center`}>
                      <cfg.icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{order.customer_name}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(order.created_at).toLocaleDateString('ar-EG')} · {order.items.length} منتج
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-crimson-600 text-sm">
                      {order.total.toLocaleString('ar-EG')} ج.م
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </button>

                {/* Expanded details */}
                {isOpen && (
                  <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50">
                    {/* Customer info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-gray-100">
                        <Phone size={16} className="text-crimson-500" />
                        <div>
                          <p className="text-xs text-gray-400">الهاتف</p>
                          <a href={`tel:${order.customer_phone}`} className="font-bold text-gray-900 text-sm hover:text-crimson-600 transition-colors">
                            {order.customer_phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 bg-white rounded-xl p-3 border border-gray-100">
                        <MapPin size={16} className="text-crimson-500 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400">العنوان</p>
                          <p className="font-bold text-gray-900 text-sm">{order.customer_address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="bg-white rounded-xl p-3 border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 mb-2">المنتجات</p>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                              <p className="text-gray-400 text-xs">{item.qty} × {item.price.toLocaleString('ar-EG')} ج.م</p>
                            </div>
                            <span className="font-bold text-gray-900 text-sm">
                              {(item.qty * item.price).toLocaleString('ar-EG')} ج.م
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
                        <span className="font-bold text-gray-900">الإجمالي</span>
                        <span className="font-black text-crimson-600">{order.total.toLocaleString('ar-EG')} ج.م</span>
                      </div>
                    </div>

                    {/* Status changer */}
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-2">تغيير الحالة</p>
                      <div className="flex gap-2 flex-wrap">
                        {statusOptions.map((s) => {
                          const sc = statusConfig[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(order.id, s)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                order.status === s
                                  ? 'bg-crimson-600 text-white'
                                  : 'bg-white border border-gray-200 text-gray-600 hover:border-crimson-300'
                              }`}
                            >
                              {sc.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
