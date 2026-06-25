import { useState, useEffect, useRef } from 'react';
import { Plus, Edit3, Trash2, X, Loader2, Save, Search, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';

const emptyForm = {
  name: '',
  category: 'مفارش السرير',
  price: '',
  original_price: '',
  image: '',
  rating: '4.5',
  reviews: '0',
  badge: '',
  badge_color: '',
  description: '',
  colors: '',
  sizes: '',
  in_stock: true,
};

const categories = ['مفارش السرير', 'اللحفة', 'البطاطين', 'السجاد التركي'];

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    supabase.from('products').select('*').order('created_at', { ascending: true }).then(({ data, error }) => {
      if (!error && data) setProducts(data as Product[]);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : '',
      image: p.image,
      rating: String(p.rating),
      reviews: String(p.reviews),
      badge: p.badge ?? '',
      badge_color: p.badge_color ?? '',
      description: p.description,
      colors: p.colors.join(', '),
      sizes: p.sizes.join(', '),
      in_stock: p.in_stock,
    });
    setShowForm(true);
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      category: form.category,
      price: parseFloat(form.price) || 0,
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      image: form.image,
      rating: parseFloat(form.rating) || 4.5,
      reviews: parseInt(form.reviews) || 0,
      badge: form.badge || null,
      badge_color: form.badge_color || null,
      description: form.description,
      colors: form.colors.split(',').map((c) => c.trim()).filter(Boolean),
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      in_stock: form.in_stock,
    };

    if (editingId) {
      await supabase.from('products').update(payload).eq('id', editingId);
    } else {
      await supabase.from('products').insert(payload);
    }

    setSaving(false);
    setShowForm(false);
    load();
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(fileName, file);
    setUploading(false);
    if (error) {
      alert('فشل رفع الصورة: ' + error.message);
      return;
    }
    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
    setForm((f) => ({ ...f, image: urlData.publicUrl }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    await supabase.from('products').delete().eq('id', id);
    load();
  };

  const filtered = products.filter((p) =>
    !search || p.name.includes(search) || p.category.includes(search)
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث عن منتج..."
            className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all"
          />
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white rounded-xl text-sm font-bold transition-colors"
        >
          <Plus size={16} />
          إضافة منتج
        </button>
      </div>

      {/* Products table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-crimson-500" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500">المنتج</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500">القسم</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500">السعر</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500">الحالة</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-bold text-gray-900 text-sm line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.category}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-crimson-600 text-sm">{p.price.toLocaleString('ar-EG')} ج.م</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.in_stock ? 'متوفر' : 'نفذ'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-12 text-gray-400 text-sm">لا توجد منتجات</p>
          )}
        </div>
      )}

      {/* ── Product form modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-black text-lg text-gray-900">
                {editingId ? 'تعديل منتج' : 'إضافة منتج جديد'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="اسم المنتج" required>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
                <Field label="القسم" required>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="السعر (ج.م)" required>
                  <input type="number" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
                <Field label="السعر قبل الخصم">
                  <input type="number" step="0.01" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
              </div>

              {/* Image input — full width, dual mode */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  صورة المنتج <span className="text-crimson-500">*</span>
                </label>
                {/* Mode toggle */}
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      imageMode === 'url' ? 'bg-crimson-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <LinkIcon size={14} />
                    رابط مباشر
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('upload')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      imageMode === 'upload' ? 'bg-crimson-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Upload size={14} />
                    رفع من الجهاز
                  </button>
                </div>

                <div className="flex gap-4">
                  {/* Preview */}
                  <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 bg-gray-50">
                    {form.image ? (
                      <img src={form.image} alt="معاينة" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={28} className="text-gray-300" />
                    )}
                  </div>

                  {/* Input / upload area */}
                  <div className="flex-1">
                    {imageMode === 'url' ? (
                      <input
                        type="url"
                        required
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all"
                      />
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full px-3 py-6 border-2 border-dashed border-gray-200 rounded-xl text-center cursor-pointer hover:border-crimson-300 hover:bg-crimson-50/30 transition-all"
                      >
                        {uploading ? (
                          <div className="flex items-center justify-center gap-2 text-crimson-600">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-sm font-bold">جاري الرفع...</span>
                          </div>
                        ) : form.image ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <ImageIcon size={16} />
                            <span className="text-sm font-bold">تم رفع الصورة — اضغط للتغيير</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-gray-400">
                            <Upload size={20} />
                            <span className="text-sm font-medium">اضغط لاختيار صورة من جهازك</span>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(file);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="التقييم (0-5)">
                  <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
                <Field label="عدد المراجعات">
                  <input type="number" min="0" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
                <Field label="الشارة (badge)">
                  <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="مثال: الأكثر مبيعاً"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
                <Field label="لون الشارة (Tailwind)">
                  <input type="text" value={form.badge_color} onChange={(e) => setForm({ ...form, badge_color: e.target.value })} placeholder="مثال: bg-crimson-600"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
                <Field label="الألوان (افصل بفاصلة)">
                  <input type="text" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="#FFFFFF, #FF0000"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
                <Field label="المقاسات (افصل بفاصلة)">
                  <input type="text" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="فردي, مزدوج, كينج"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </Field>
                <Field label="متوفر؟">
                  <label className="flex items-center gap-2 mt-2">
                    <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
                      className="w-5 h-5 rounded accent-crimson-600" />
                    <span className="text-sm font-medium text-gray-700">نعم، المنتج متوفر في المخزون</span>
                  </label>
                </Field>
              </div>
              <Field label="الوصف">
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all resize-none" />
              </Field>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 bg-crimson-600 hover:bg-crimson-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {editingId ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">
        {label} {required && <span className="text-crimson-500">*</span>}
      </label>
      {children}
    </div>
  );
}
