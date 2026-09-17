import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { Card, PageHeader } from './Components';

const fc = 'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';
const tc = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';

export default function CustomerService({ customer_service = {} }: { customer_service?: Record<string, string> }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        phone: customer_service.phone ?? '',
        email: customer_service.email ?? '',
        whatsapp: customer_service.whatsapp ?? '',
        hero_title: customer_service.hero_title ?? '',
        hero_description: customer_service.hero_description ?? '',
    });

    return <AppLayout title="Customer Service"><div className="space-y-6">
        <PageHeader title="Customer Service" description="Kelola informasi customer service pada website." action="" />
        <Card title="Form Customer Service" action={<button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{showForm ? 'Tutup Form' : 'Edit CS'}</button>}>
            {recentlySuccessful && <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-emerald-700">Konten berhasil disimpan.</div>}
            {!showForm ? <p className="text-sm text-gray-500">Klik Edit CS untuk mengubah.</p> :
            <form onSubmit={e => { e.preventDefault(); put('/cms/customer-service', { preserveScroll: true }); }} className="grid gap-5 md:grid-cols-2">
                <label><span className="mb-2 block text-sm font-medium">Telepon</span><input className={fc} value={data.phone} onChange={e => setData('phone', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Email</span><input className={fc} value={data.email} onChange={e => setData('email', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">WhatsApp</span><input className={fc} value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} /></label>
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Hero Title</span><input className={fc} value={data.hero_title} onChange={e => setData('hero_title', e.target.value)} /></label>
                <label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Hero Description</span><textarea rows={2} className={tc} value={data.hero_description} onChange={e => setData('hero_description', e.target.value)} /></label>
                <div className="md:col-span-2 flex justify-end"><button disabled={processing} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan'}</button></div>
            </form>}
        </Card>
    </div></AppLayout>;
}
