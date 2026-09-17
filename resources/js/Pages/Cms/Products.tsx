import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { Card, DataTable, PageHeader, Status, Thumb } from './Components';

type Spec = { label: string; value: string };
type Resource = { label: string; url: string };
type Product = {
    id: number; name: string; slug: string; sku: string | null; category: string | null;
    badge: string | null; image: string | null; description: string | null; content: string | null;
    specs: Spec[] | null; thumbnails: string[] | null; resources: Resource[] | null;
    status: 'published' | 'draft'; sort_order: number;
};
type FormData = Omit<Product, 'id'>;

const emptyProduct: FormData = {
    name: '', slug: '', sku: '', category: '', badge: '', image: '', description: '', content: '',
    specs: [], thumbnails: [], resources: [], status: 'draft', sort_order: 0,
};

const fieldClass = 'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';
const textareaClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';

export default function Products({ products }: { products: Product[] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>(emptyProduct);

    const openCreate = () => { setEditingId(null); reset(); setShowForm(true); };
    const openEdit = (product: Product) => {
        setEditingId(product.id);
        setData({ ...product, specs: product.specs ?? [], thumbnails: product.thumbnails ?? [], resources: product.resources ?? [] });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const closeForm = () => { setShowForm(false); setEditingId(null); reset(); };
    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const options = { preserveScroll: true, onSuccess: closeForm };
        editingId ? put(`/cms/products/${editingId}`, options) : post('/cms/products', options);
    };
    const remove = (product: Product) => {
        if (confirm(`Hapus program "${product.name}"?`)) router.delete(`/cms/products/${product.id}`, { preserveScroll: true });
    };
    const updateSlugFromName = (name: string) => {
        setData('name', name);
        if (!editingId) setData('slug', name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    };
    const rows = products.map(product => ({
        name: <Thumb label={product.name} />,
        slug: product.slug,
        category: product.category || '—',
        badge: product.badge || '—',
        status: <Status>{product.status === 'published' ? 'Published' : 'Draft'}</Status>,
        actions: <div className="flex gap-2"><button onClick={() => openEdit(product)} className="rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-600">Edit</button><button onClick={() => remove(product)} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">Hapus</button></div>,
    }));

    return <AppLayout title="Program Unggulan"><div className="space-y-6">
        <PageHeader title="Program Unggulan" description="Kelola program akademik, ekstrakurikuler, dan kegiatan unggulan sekolah." action="" />
        <Card title="Form Program" description={showForm ? (editingId ? 'Edit program terpilih.' : 'Tambahkan program baru.') : 'Form hanya tampil saat tombol Tambah Program atau Edit diklik.'} action={<button onClick={showForm ? closeForm : openCreate} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{showForm ? 'Tutup Form' : 'Tambah Program'}</button>}>
            {!showForm ? <p className="text-sm text-gray-500">Pilih Tambah Program untuk membuat data baru, atau Edit pada tabel.</p> :
            <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
                <label><span className="mb-2 block text-sm font-medium">Nama Program *</span><input className={fieldClass} value={data.name} onChange={e => updateSlugFromName(e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Slug *</span><input className={fieldClass} value={data.slug} onChange={e => setData('slug', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Kode Program</span><input className={fieldClass} value={data.sku ?? ''} onChange={e => setData('sku', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Kategori</span><input className={fieldClass} value={data.category ?? ''} onChange={e => setData('category', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Label</span><input className={fieldClass} value={data.badge ?? ''} onChange={e => setData('badge', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">URL Gambar</span><input className={fieldClass} value={data.image ?? ''} onChange={e => setData('image', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Status *</span><select className={fieldClass} value={data.status} onChange={e => setData('status', e.target.value as FormData['status'])}><option value="published">Published</option><option value="draft">Draft</option></select></label>
                <label><span className="mb-2 block text-sm font-medium">Urutan *</span><input type="number" min="0" className={fieldClass} value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} /></label>
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Deskripsi</span><textarea rows={3} className={textareaClass} value={data.description ?? ''} onChange={e => setData('description', e.target.value)} /></label>
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Konten Detail</span><textarea rows={4} className={textareaClass} value={data.content ?? ''} onChange={e => setData('content', e.target.value)} /></label>
                {Object.keys(errors).length > 0 && <div className="md:col-span-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">Periksa kembali field wajib atau slug yang sudah digunakan.</div>}
                <div className="md:col-span-2 flex justify-end gap-3"><button type="button" onClick={closeForm} className="rounded-xl border px-5 py-3 text-sm font-semibold">Batal</button><button disabled={processing} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{processing ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Program'}</button></div>
            </form>}
        </Card>
        <Card title="Daftar Program Unggulan" description={`${products.length} program tersimpan`}><DataTable columns={[{key:'name',label:'Nama Program'},{key:'slug',label:'Slug'},{key:'category',label:'Kategori'},{key:'badge',label:'Label'},{key:'status',label:'Status'},{key:'actions',label:'Aksi'}]} rows={rows} pageSize={10} /></Card>
    </div></AppLayout>;
}
