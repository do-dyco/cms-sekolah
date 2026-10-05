import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { Card, PageHeader } from './Components';

const fc = 'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';

export default function Contact({ contact = {} }: { contact?: Record<string, string> }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        phone: contact.phone ?? '',
        email: contact.email ?? '',
    });

    return <AppLayout title="Contact"><div className="space-y-6">
        <PageHeader title="Contact" description="Kelola informasi kontak pada website." action="" />
        <Card title="Form Contact" action={<button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{showForm ? 'Tutup Form' : 'Edit Contact'}</button>}>
            {recentlySuccessful && <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-emerald-700">Konten berhasil disimpan.</div>}
            {!showForm ? <p className="text-sm text-gray-500">Klik Edit Contact untuk mengubah.</p> :
            <form onSubmit={e => { e.preventDefault(); put('/cms/contact', { preserveScroll: true }); }} className="grid gap-5 md:grid-cols-2">
                <label><span className="mb-2 block text-sm font-medium">Telepon</span><input className={fc} value={data.phone} onChange={e => setData('phone', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Email</span><input className={fc} value={data.email} onChange={e => setData('email', e.target.value)} /></label>
                <div className="md:col-span-2 flex justify-end"><button disabled={processing} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan'}</button></div>
            </form>}
        </Card>
        <Card title="Informasi Kontak Aktif" description="Data kontak yang tampil pada halaman Kontak Sekolah di website publik."><div className="grid gap-4 md:grid-cols-2"><div><p className="text-xs text-gray-500">Telepon</p><p className="font-semibold">{contact.phone || 'Belum diisi'}</p></div><div><p className="text-xs text-gray-500">Email</p><p className="font-semibold">{contact.email || 'Belum diisi'}</p></div></div></Card>
    </div></AppLayout>;
}
