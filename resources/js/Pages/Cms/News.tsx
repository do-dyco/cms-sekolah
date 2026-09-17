import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { Card, DataTable, PageHeader, Status, Thumb } from './Components';

type Article = {
    id: number; title: string; slug: string; category: string | null;
    excerpt: string | null; content: string | null; image: string | null;
    published_at: string | null; is_featured: boolean; is_promo: boolean;
    status: 'published' | 'draft'; sort_order: number;
};
type FormData = Omit<Article, 'id'>;

const emptyArticle: FormData = {
    title: '', slug: '', category: '', excerpt: '', content: '', image: '',
    published_at: '', is_featured: false, is_promo: false, status: 'draft', sort_order: 0,
};

const fieldClass = 'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';
const textareaClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';

export default function News({ articles }: { articles: Article[] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>(emptyArticle);

    const openCreate = () => { setEditingId(null); reset(); setShowForm(true); };
    const openEdit = (a: Article) => {
        setEditingId(a.id);
        setData({ ...a });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const closeForm = () => { setShowForm(false); setEditingId(null); reset(); };
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const opts = { preserveScroll: true, onSuccess: closeForm };
        editingId ? put(`/cms/news/${editingId}`, opts) : post('/cms/news', opts);
    };
    const remove = (a: Article) => { if (confirm(`Hapus mading "${a.title}"?`)) router.delete(`/cms/news/${a.id}`, { preserveScroll: true }); };
    const updateSlug = (title: string) => { setData('title', title); if (!editingId) setData('slug', title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$g/, '')); };

    const rows = articles.map(a => ({
        title: <Thumb label={a.title} />,
        slug: a.slug,
        category: a.category || '—',
        date: a.published_at || '—',
        status: <Status>{a.status === 'published' ? 'Published' : 'Draft'}</Status>,
        actions: <div className="flex gap-2"><button onClick={() => openEdit(a)} className="rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-600">Edit</button><button onClick={() => remove(a)} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">Hapus</button></div>,
    }));

    return <AppLayout title="Mading"><div className="space-y-6">
        <PageHeader title="Mading" description="Kelola pengumuman, kegiatan, prestasi, dan informasi sekolah." action="" />
        <Card title="Form Mading" description={showForm ? (editingId ? 'Edit mading.' : 'Tambah mading baru.') : 'Form tampil saat tombol diklik.'} action={<button onClick={showForm ? closeForm : openCreate} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{showForm ? 'Tutup Form' : 'Tambah Mading'}</button>}>
            {!showForm ? <p className="text-sm text-gray-500">Pilih Tambah Mading untuk membuat baru, atau Edit pada tabel.</p> :
            <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Judul *</span><input className={fieldClass} value={data.title} onChange={e => updateSlug(e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Slug *</span><input className={fieldClass} value={data.slug} onChange={e => setData('slug', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Kategori</span><input className={fieldClass} value={data.category ?? ''} onChange={e => setData('category', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Tanggal Publish</span><input type="date" className={fieldClass} value={data.published_at ?? ''} onChange={e => setData('published_at', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Status *</span><select className={fieldClass} value={data.status} onChange={e => setData('status', e.target.value as FormData['status'])}><option value="published">Published</option><option value="draft">Draft</option></select></label>
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">URL Gambar</span><input className={fieldClass} value={data.image ?? ''} onChange={e => setData('image', e.target.value)} /></label>
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Ringkasan</span><textarea rows={2} className={textareaClass} value={data.excerpt ?? ''} onChange={e => setData('excerpt', e.target.value)} /></label>
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Isi Mading</span><textarea rows={5} className={textareaClass} value={data.content ?? ''} onChange={e => setData('content', e.target.value)} /></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} /> <span className="text-sm">Mading Pilihan</span></label>
                <label><span className="mb-2 block text-sm font-medium">Urutan *</span><input type="number" min="0" className={fieldClass} value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} /></label>
                {Object.keys(errors).length > 0 && <div className="md:col-span-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">Periksa kembali field wajib atau slug yang sudah digunakan.</div>}
                <div className="md:col-span-2 flex justify-end gap-3"><button type="button" onClick={closeForm} className="rounded-xl border px-5 py-3 text-sm font-semibold">Batal</button><button disabled={processing} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{processing ? 'Menyimpan...' : editingId ? 'Simpan' : 'Tambah'}</button></div>
            </form>}
        </Card>
        <Card title="Daftar Mading" description={`${articles.length} mading tersimpan`}><DataTable columns={[{key:'title',label:'Judul'},{key:'slug',label:'Slug'},{key:'category',label:'Kategori'},{key:'date',label:'Tanggal'},{key:'status',label:'Status'},{key:'actions',label:'Aksi'}]} rows={rows} pageSize={10} /></Card>
    </div></AppLayout>;
}
