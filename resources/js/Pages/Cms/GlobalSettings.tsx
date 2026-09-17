import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { Card, PageHeader } from './Components';

const fc = 'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900';

export default function GlobalSettings({ global = {} }: { global?: Record<string, string> }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        site_name: global.site_name ?? '',
        tagline: global.tagline ?? '',
        footer_text: global.footer_text ?? '',
    });

    return <AppLayout title="Global Settings"><div className="space-y-6">
        <PageHeader title="Global Settings" description="Pengaturan global website." action="" />
        <Card title="Form Global Settings" action={<button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{showForm ? 'Tutup Form' : 'Edit Settings'}</button>}>
            {recentlySuccessful && <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-emerald-700">Konten berhasil disimpan.</div>}
            {!showForm ? <p className="text-sm text-gray-500">Klik Edit Settings untuk mengubah.</p> :
            <form onSubmit={e => { e.preventDefault(); put('/cms/global-settings', { preserveScroll: true }); }} className="grid gap-5">
                <label><span className="mb-2 block text-sm font-medium">Nama Situs</span><input className={fc} value={data.site_name} onChange={e => setData('site_name', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Tagline</span><input className={fc} value={data.tagline} onChange={e => setData('tagline', e.target.value)} /></label>
                <label><span className="mb-2 block text-sm font-medium">Footer Text</span><input className={fc} value={data.footer_text} onChange={e => setData('footer_text', e.target.value)} /></label>
                <div className="flex justify-end"><button disabled={processing} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan'}</button></div>
            </form>}
        </Card>
    </div></AppLayout>;
}
