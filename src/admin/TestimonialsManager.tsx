import { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Loader2, Save, Star } from 'lucide-react';
import { supabase, type Testimonial } from '../lib/supabase';

const emptyForm = {
  name: '',
  location: '',
  rating: 5,
  text: '',
  initials: '',
  color: 'bg-crimson-600',
};

const colors = [
  { label: 'أحمر', value: 'bg-crimson-600' },
  { label: 'أزرق', value: 'bg-blue-600' },
  { label: 'أخضر', value: 'bg-emerald-600' },
  { label: 'برتقالي', value: 'bg-amber-600' },
  { label: 'بنفسجي', value: 'bg-purple-600' },
];

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!error && data) setTestimonials(data as Testimonial[]);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({ name: t.name, location: t.location, rating: t.rating, text: t.text, initials: t.initials, color: t.color });
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
    const payload = { ...form };
    if (editingId) {
      await supabase.from('testimonials').update(payload).eq('id', editingId);
    } else {
      await supabase.from('testimonials').insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الرأي؟')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    load();
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white rounded-xl text-sm font-bold transition-colors"
        >
          <Plus size={16} />
          إضافة رأي
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-crimson-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-black text-xs">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(t)} className="w-7 h-7 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center transition-colors">
                    <Edit3 size={12} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="w-7 h-7 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={12} className={s <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">"{t.text}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-black text-lg text-gray-900">
                {editingId ? 'تعديل رأي' : 'إضافة رأي جديد'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">الاسم</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">الموقع</label>
                  <input type="text" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="الغربية - زفتى"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">الأحرف الأولى</label>
                  <input type="text" maxLength={3} value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} placeholder="ع١"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">التقييم</label>
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all">
                    {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} نجوم</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">لون الصورة الرمزية</label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setForm({ ...form, color: c.value })}
                      className={`w-8 h-8 rounded-full ${c.value} ${form.color === c.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''} transition-all`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">نص الرأي</label>
                <textarea required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-crimson-400 transition-all resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 bg-crimson-600 hover:bg-crimson-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {editingId ? 'حفظ' : 'إضافة'}
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
