import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { Card, DataTable, PageHeader, Status } from './Components';

type Download = {
    id: number; title: string; type: string | null; category: string | null;
    version: string | null; file_url: string | null; file_size: string | null;
    language: string | null; badge: string | null; status: 'published' | 'draft'; sort_order: number;
};
type FormData = Omit<Download, 'id'>;

const empty: FormData = { title: '', type: '', category: '', version: '', file_url: '', file_size: '', language: '', badge: '', status: 'draft', sort_order: 0 };
const fc = 'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';

export default function Downloads({ downloads }: { downloads: Download[] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>(empty);

    const openCreate = () => { setEditingId(null); reset(); setShowForm(true); };
    const openEdit = (d: Download) => { setEditingId(d.id); setData({ ...d }); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const closeForm = () => { setShowForm(false); setEditingId(null); reset(); };
    const submit = (e: React.FormEvent) => { e.preventDefault(); const opts = { preserveScroll: true, onSuccess: closeForm }; editingId ? put(`/cms/downloads/${editingId}`, opts) : post('/cms/downloads', opts); };
    const remove = (d: Download) => { if (confirm(`Hapus "${d.title}"?`)) router.delete(`/cms/downloads/${d.id}`, { preserveScroll: true }); };

    const rows = downloads.map(d => ({
        title: d.title, type: d.type || '—', category: d.category || '—',
        version: d.version || '—', size: d.file_size || '—',
        status: <Status>{d.status === 'published' ? 'Published' : 'Draft'}</Status>,
        actions: <div className="flex gap-2"><button onClick={() => openEdit(d)} className="rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-600">Edit</button><button onClick={() => remove(d)} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">Hapus</button></div>,
    }));

    return <AppLayout title="Downloads"><div className="space-y-6">
        <PageHeader title="Downloads" description="Kelola file download yang tersedia di Download Center." action="" />
        <Card title="Form Download" description={showForm ? (editingId ? 'Edit item.' : 'Tambah item baru.') : 'Form tampil saat tombol diklik.'} action={<button onClick={showForm ? closeForm : openCreate} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{showForm ? 'Tutup Form' : 'Tambah Item'}</button>}>
            {!showForm ? <p className="text-sm text-gray-500">Pilih Tambah Item atau Edit pada tabel.</p> :
            <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Judul *</span><input className={fc} value={data.title} onChange={e => setData('title', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Tipe (Driver/Manual/Datasheet/Software)</span><input className={fc} value={data.type ?? ''} onChange={e => setData('type', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Kategori</span><input className={fc} value={data.category ?? ''} onChange={e => setData('category', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Versi</span><input className={fc} value={data.version ?? ''} onChange={e => setData('version', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Ukuran File</span><input className={fc} value={data.file_size ?? ''} onChange={e => setData('file_size', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Bahasa</span><input className={fc} value={data.language ?? ''} onChange={e => setData('language', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Badge</span><input className={fc} value={data.badge ?? ''} onChange={e => setData('badge', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">URL File</span><input className={fc} value={data.file_url ?? ''} onChange={e => setData('file_url', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Status *</span><select className={fc} value={data.status} onChange={e => setData('status', e.target.value as FormData['status'])}><option value="published">Published</option><option value="draft">Draft</option></select></label>
                <label><span className="mb-2 block text-sm font-medium">Urutan *</span><input type="number" min="0" className={fc} value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} /></label>
                {Object.keys(errors).length > 0 && <div className="md:col-span-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">Periksa field wajib.</div>}
                <div className="md:col-span-2 flex justify-end gap-3"><button type="button" onClick={closeForm} className="rounded-xl border px-5 py-3 text-sm font-semibold">Batal</button><button disabled={processing} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{processing ? 'Menyimpan...' : editingId ? 'Simpan' : 'Tambah'}</button></div>
            </form>}
        </Card>
        <Card title="Daftar Download" description={`${downloads.length} item tersimpan`}><DataTable columns={[{key:'title',label:'Judul'},{key:'type',label:'Tipe'},{key:'category',label:'Kategori'},{key:'version',label:'Versi'},{key:'size',label:'Ukuran'},{key:'status',label:'Status'},{key:'actions',label:'Aksi'}]} rows={rows} pageSize={10} /></Card>
    </div></AppLayout>;
}
