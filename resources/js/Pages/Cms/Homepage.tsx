'use client';

import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { Card, DataTable, PageHeader, Status, Thumb } from './Components';

type Standard = { icon: string; title: string; description: string };
type Product = { name: string; description: string; image: string; badge: string | null; href: string };
type HomepageData = {
    hero: Record<string, string | null>;
    standards_section: { title: string; description: string };
    standards: Standard[];
    featured_section: { title: string; description: string; link_text: string; link_url: string };
    featured_products: Product[];
};

const inputClass = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900';

export default function Homepage({ homepage }: { homepage: HomepageData }) {
    const { data, setData, put, processing, recentlySuccessful, errors } = useForm(homepage);
    const [showForm, setShowForm] = useState(false);
    const updateHero = (key: string, value: string) => setData('hero', { ...data.hero, [key]: value });

    const productRows = data.featured_products.map((product) => ({
        name: <Thumb label={product.name} />,
        description: <span className="line-clamp-2 max-w-md text-gray-500">{product.description}</span>,
        badge: product.badge || '—',
        status: <Status>Published</Status>,
    }));

    return <AppLayout title="Beranda Website">
        <PageHeader title="Beranda Website" description="Atur konten halaman utama website sekolah." action="Simpan Perubahan" />
        <div className="space-y-6">
        {recentlySuccessful && <div className="rounded-xl bg-emerald-50 p-4 text-emerald-700">Konten homepage berhasil disimpan.</div>}
        {Object.keys(errors).length > 0 && <div className="rounded-xl bg-red-50 p-4 text-red-700">Periksa kembali data yang belum valid.</div>}

        <Card
            title="Pengaturan Beranda"
            description="Klik tombol untuk membuka atau menutup form pengaturan beranda."
            action={
                <button
                    type="button"
                    onClick={() => setShowForm((value) => !value)}
                    className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/20"
                >
                    {showForm ? 'Tutup Form' : 'Edit Beranda'}
                </button>
            }
        >
            {showForm ? (
                <form onSubmit={(e) => { e.preventDefault(); put('/cms/homepage'); }} className="space-y-6">
            <Section title="Hero Section">
                {Object.entries({ eyebrow:'Eyebrow / Label Kecil', title:'Judul Utama', description:'Deskripsi', primary_button_text:'Teks Tombol Utama', primary_button_url:'Link Tombol Utama', secondary_button_text:'Teks Tombol Sekunder', secondary_button_url:'Link Tombol Sekunder', background_image:'URL Background Image' }).map(([key,label]) => <Field key={key} label={label} value={String(data.hero[key] ?? '')} onChange={(v)=>updateHero(key,v)} textarea={key==='description'} />)}
            </Section>
            <Section title="Keunggulan Sekolah">
                <Field label="Judul Section" value={data.standards_section.title} onChange={(v)=>setData('standards_section',{...data.standards_section,title:v})}/>
                <Field label="Deskripsi Section" value={data.standards_section.description} onChange={(v)=>setData('standards_section',{...data.standards_section,description:v})} textarea/>
                {data.standards.map((item,index)=><div key={index} className="grid gap-3 rounded-xl border p-4 md:grid-cols-3"><Field label="Ikon" value={item.icon} onChange={(v)=>{const rows=[...data.standards];rows[index]={...item,icon:v};setData('standards',rows)}}/><Field label="Judul" value={item.title} onChange={(v)=>{const rows=[...data.standards];rows[index]={...item,title:v};setData('standards',rows)}}/><Field label="Deskripsi" value={item.description} onChange={(v)=>{const rows=[...data.standards];rows[index]={...item,description:v};setData('standards',rows)}}/></div>)}
            </Section>
            <Section title="Program Unggulan">
                {(['title','description','link_text','link_url'] as const).map(key=><Field key={key} label={{title:'Judul Section',description:'Deskripsi Section',link_text:'Teks Link',link_url:'Link Tujuan'}[key]} value={data.featured_section[key]} onChange={(v)=>setData('featured_section',{...data.featured_section,[key]:v})} textarea={key==='description'}/>)}
                {data.featured_products.map((item,index)=><div key={index} className="grid gap-3 rounded-xl border p-4 md:grid-cols-2"><Field label="Nama Program" value={item.name} onChange={(v)=>updateProduct(index,'name',v)}/><Field label="Label" value={item.badge ?? ''} onChange={(v)=>updateProduct(index,'badge',v)}/><Field label="Deskripsi" value={item.description} onChange={(v)=>updateProduct(index,'description',v)}/><Field label="URL Gambar" value={item.image} onChange={(v)=>updateProduct(index,'image',v)}/><Field label="Link Detail" value={item.href} onChange={(v)=>updateProduct(index,'href',v)}/></div>)}
            </Section>
                    <button type="submit" disabled={processing} className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
                </form>
            ) : (
                <div className="py-8 text-center text-sm text-gray-500">
                    Form disembunyikan. Klik <strong>Edit Beranda</strong> untuk mengubah konten.
                </div>
            )}
        </Card>

        <Card title="Program Unggulan" description="Daftar program unggulan yang tampil di beranda website.">
            <DataTable
                columns={[
                    { key: 'name', label: 'Nama Program' },
                    { key: 'description', label: 'Deskripsi' },
                    { key: 'badge', label: 'Label' },
                    { key: 'status', label: 'Status' },
                ]}
                rows={productRows}
            />
        </Card>
        </div>
    </AppLayout>;

    function updateProduct(index:number,key:keyof Product,value:string){const rows=[...data.featured_products];rows[index]={...rows[index],[key]:value};setData('featured_products',rows)}
}

function Section({title,children}:{title:string;children:React.ReactNode}){return <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-lg font-bold">{title}</h2>{children}</section>}
function Field({label,value,onChange,textarea=false}:{label:string;value:string;onChange:(value:string)=>void;textarea?:boolean}){return <label className="block space-y-2"><span className="text-sm font-medium">{label}</span>{textarea?<textarea className={inputClass} rows={3} value={value} onChange={e=>onChange(e.target.value)}/>:<input className={inputClass} value={value} onChange={e=>onChange(e.target.value)}/>}</label>}
