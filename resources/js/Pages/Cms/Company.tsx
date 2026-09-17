import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { Card, PageHeader } from './Components';

const fc = 'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';
const tc = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';

export default function Company({ company = {} }: { company?: Record<string, string> }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        title: company.title ?? '',
        description: company.description ?? '',
        image: company.image ?? '',
        pill: company.pill ?? '',
        visi: company.visi ?? '',
        misi: company.misi ?? '',
    });

    return <AppLayout title="Profil Sekolah"><div className="space-y-6">
        <PageHeader title="Profil Sekolah" description="Kelola konten halaman profil sekolah pada frontend." action="" />
        <Card title="Form Profil Sekolah" action={<button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{showForm ? 'Tutup Form' : 'Edit Profil Sekolah'}</button>}>
            {recentlySuccessful && <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-emerald-700">Konten berhasil disimpan.</div>}
            {!showForm ? <p className="text-sm text-gray-500">Klik Edit Profil Sekolah untuk mengubah konten.</p> :
            <form onSubmit={e => { e.preventDefault(); put('/cms/company', { preserveScroll: true }); }} className="grid gap-5">
                <label><span className="mb-2 block text-sm font-medium">Judul</span><input className={fc} value={data.title} onChange={e => setData('title', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Deskripsi</span><textarea rows={3} className={tc} value={data.description} onChange={e => setData('description', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Pill Label</span><input className={fc} value={data.pill} onChange={e => setData('pill', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">URL Gambar</span><input className={fc} value={data.image} onChange={e => setData('image', e.target.value)} /></label>
                <div className="grid gap-5 md:grid-cols-2">
                    <label><span className="mb-2 block text-sm font-medium">Visi</span><textarea rows={4} className={tc} value={data.visi} onChange={e => setData('visi', e.target.value)} /></label>
                    <label><span className="mb-2 block text-sm font-medium">Misi</span><textarea rows={4} className={tc} value={data.misi} onChange={e => setData('misi', e.target.value)} /></label>
                </div>
                <div className="flex justify-end"><button disabled={processing} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan'}</button></div>
            </form>}
        </Card>
    </div></AppLayout>;
}
