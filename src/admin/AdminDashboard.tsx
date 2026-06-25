import { useState, useEffect } from 'react';
import { Lock, LogOut, Package, ShoppingBag, MessageSquare, LayoutDashboard, Plus, Edit3, Trash2, X, Check, Loader2, Phone, MapPin, Clock, Star } from 'lucide-react';
import { supabase, type Product, type Testimonial, type Order } from '../lib/supabase';
import ProductManager from './ProductManager';
import OrdersManager from './OrdersManager';
import TestimonialsManager from './TestimonialsManager';

const ADMIN_PASSWORD = 'turki-admin-2025';

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'testimonials'>('products');
  const [stats, setStats] = useState({ products: 0, orders: 0, testimonials: 0, newOrders: 0 });

  useEffect(() => {
    if (sessionStorage.getItem('admin_authed') === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('testimonials').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ]).then(([p, o, t, no]) => {
      setStats({
        products: p.count ?? 0,
        orders: o.count ?? 0,
        testimonials: t.count ?? 0,
        newOrders: no.count ?? 0,
      });
    });
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', 'true');
      setAuthed(true);
      setError('');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed');
    setAuthed(false);
    setPassword('');
  };

  // ── Login screen ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-crimson-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-crimson-900/40">
              <Lock size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-white mb-1">لوحة تحكم سنتر التركي</h1>
            <p className="text-gray-500 text-sm">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
          </div>

          <form onSubmit={handleLogin} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <label className="block text-sm font-bold text-gray-300 mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              placeholder="••••••••••"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-crimson-500 focus:ring-2 focus:ring-crimson-900 transition-all"
            />
            {error && <p className="text-red-400 text-sm mt-2 font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-crimson-600 hover:bg-crimson-700 text-white rounded-xl font-black text-sm transition-colors"
            >
              دخول
            </button>
            <a href="/" className="block text-center mt-3 text-gray-500 hover:text-gray-300 text-xs font-medium transition-colors">
              العودة للمتجر
            </a>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  const tabs = [
    { id: 'products' as const, label: 'المنتجات', icon: Package, count: stats.products },
    { id: 'orders' as const, label: 'الطلبات', icon: ShoppingBag, count: stats.orders, badge: stats.newOrders },
    { id: 'testimonials' as const, label: 'آراء العملاء', icon: MessageSquare, count: stats.testimonials },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* ── Top bar ── */}
      <header className="bg-gray-950 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-crimson-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="font-black text-lg leading-tight">لوحة تحكم سنتر التركي</h1>
              <p className="text-gray-500 text-xs">إدارة المنتجات والطلبات والآراء</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-bold transition-colors"
            >
              عرض المتجر
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-crimson-600 hover:bg-crimson-700 rounded-xl text-sm font-bold transition-colors"
            >
              <LogOut size={16} />
              خروج
            </button>
          </div>
        </div>
      </header>

      {/* ── Stats cards ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="إجمالي المنتجات" value={stats.products} icon={Package} color="bg-blue-500" />
          <StatCard label="إجمالي الطلبات" value={stats.orders} icon={ShoppingBag} color="bg-crimson-600" />
          <StatCard label="طلبات جديدة" value={stats.newOrders} icon={Clock} color="bg-amber-500" />
          <StatCard label="آراء العملاء" value={stats.testimonials} icon={MessageSquare} color="bg-emerald-500" />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-crimson-600 text-crimson-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
              {tab.badge ? (
                <span className="bg-crimson-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {tab.badge} جديد
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'orders' && <OrdersManager />}
        {activeTab === 'testimonials' && <TestimonialsManager />}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      <p className="text-3xl font-black text-gray-900">{value.toLocaleString('ar-EG')}</p>
      <p className="text-gray-400 text-sm font-medium mt-1">{label}</p>
    </div>
  );
}
