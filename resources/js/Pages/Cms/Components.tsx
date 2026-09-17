import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import { ChevronLeft, ChevronRight, Image, Plus, Save, Search, SlidersHorizontal, Trash2, Upload } from 'lucide-react';

type Field = { label: string; value?: string; type?: 'input' | 'textarea' | 'upload' | 'select' };
type Section = { title: string; description: string; fields: Field[] };

export const Input = ({ label, value = '', textarea = false }: { label: string; value?: string; textarea?: boolean }) => (
    <label className="block">
        <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        {textarea ? (
            <textarea rows={3} defaultValue={value} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900" />
        ) : (
            <input defaultValue={value} className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900" />
        )}
    </label>
);

export const UploadBox = ({ label }: { label: string }) => (
    <div>
        <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <div className="flex min-h-32 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-5 text-center dark:border-gray-700 dark:bg-gray-900">
            <div><Upload className="mx-auto mb-2 text-brand-500" /><p className="text-sm font-medium">Klik untuk upload</p><p className="mt-1 text-xs text-gray-500">PNG, JPG atau WEBP</p></div>
        </div>
    </div>
);

export const PageHeader = ({ title, description, action = 'Simpan Perubahan' }: { title: string; description: string; action?: string }) => (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-500">Website Content</p><h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1><p className="mt-1 text-sm text-gray-500">{description}</p></div>
        <button type="button" className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20"><Save size={17} />{action}</button>
    </div>
);

export const Card = ({ title, description, children, action }: { title: string; description?: string; children: React.ReactNode; action?: React.ReactNode }) => (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-700"><div><h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>{description && <p className="mt-1 text-xs text-gray-500">{description}</p>}</div>{action}</div>
        <div className="p-6">{children}</div>
    </section>
);

export function ContentFormPage({ title, description, sections }: { title: string; description: string; sections: Section[] }) {
    return <AppLayout title={title}><PageHeader title={title} description={description} /><div className="space-y-6">{sections.map(section => <Card key={section.title} title={section.title} description={section.description}><div className="grid gap-5 md:grid-cols-2">{section.fields.map(field => <div key={field.label} className={field.type === 'textarea' || field.type === 'upload' ? 'md:col-span-2' : ''}>{field.type === 'upload' ? <UploadBox label={field.label} /> : field.type === 'select' ? <label className="block"><span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</span><select className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm dark:border-gray-700 dark:bg-gray-900"><option>{field.value}</option></select></label> : <Input label={field.label} value={field.value} textarea={field.type === 'textarea'} />}</div>)}</div></Card>)}</div></AppLayout>;
}

export type TableColumn = { key: string; label: string };
export function DataTable({ columns, rows, pageSize = 10 }: { columns: TableColumn[]; rows: Record<string, React.ReactNode>[]; pageSize?: number }) {
    const [query, setQuery] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(pageSize);
    const filtered = rows.filter(row => Object.values(row).some(value => String(value).toLowerCase().includes(query.toLowerCase())));
    const pages = Math.max(1, Math.ceil(filtered.length / size));
    const currentPage = Math.min(page, pages);
    const visible = filtered.slice((currentPage - 1) * size, currentPage * size);
    const go = (next: number) => setPage(Math.max(1, Math.min(next, pages)));
    return <div>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search..." className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900" /></div>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300"><SlidersHorizontal size={16}/> Filters</button>
        </div>
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead><tr className="border-y border-gray-100 bg-gray-50 text-xs uppercase text-gray-500 dark:border-gray-700 dark:bg-gray-900/60">{columns.map(c => <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>)}<th className="px-4 py-3 text-right">Aksi</th></tr></thead><tbody>{visible.map((row, i) => <tr key={i} className="border-b border-gray-50 text-sm last:border-0 dark:border-gray-700/60">{columns.map(c => <td key={c.key} className="px-4 py-4">{row[c.key]}</td>)}<td className="px-4 py-4"><div className="flex justify-end gap-2"><button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium hover:border-brand-500 hover:text-brand-500 dark:border-gray-700">Edit</button><button className="rounded-lg border border-red-100 p-2 text-red-500 dark:border-red-900"><Trash2 size={15}/></button></div></td></tr>)}{visible.length === 0 && <tr><td colSpan={columns.length + 1} className="px-4 py-12 text-center text-sm text-gray-500">Tidak ada data ditemukan.</td></tr>}</tbody></table></div>
        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700"><div className="flex items-center gap-2">Showing <strong className="text-gray-800 dark:text-gray-200">{filtered.length ? (currentPage - 1) * size + 1 : 0}-{Math.min(currentPage * size, filtered.length)}</strong> of <strong className="text-gray-800 dark:text-gray-200">{filtered.length}</strong><select value={size} onChange={e => { setSize(Number(e.target.value)); setPage(1); }} className="ml-2 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-900"><option value={5}>5 / page</option><option value={10}>10 / page</option><option value={25}>25 / page</option></select></div><div className="flex items-center gap-1"><button onClick={() => go(currentPage - 1)} disabled={currentPage === 1} className="rounded-lg border border-gray-200 p-2 disabled:opacity-40 dark:border-gray-700"><ChevronLeft size={16}/></button>{Array.from({ length: pages }, (_, i) => i + 1).slice(0, 5).map(number => <button key={number} onClick={() => go(number)} className={`h-8 min-w-8 rounded-lg px-2 text-xs font-medium ${number === currentPage ? 'bg-brand-500 text-white' : 'border border-gray-200 dark:border-gray-700'}`}>{number}</button>)}<button onClick={() => go(currentPage + 1)} disabled={currentPage === pages} className="rounded-lg border border-gray-200 p-2 disabled:opacity-40 dark:border-gray-700"><ChevronRight size={16}/></button></div></div>
    </div>;
}

export function ListingPage({ title, description, columns, rows, button = 'Tambah Data' }: { title: string; description: string; columns: TableColumn[]; rows: Record<string, React.ReactNode>[]; button?: string }) {
    return <AppLayout title={title}><PageHeader title={title} description={description} action={button} /><Card title={`Daftar ${title}`} description="Data di bawah hanya contoh tampilan mockup."><DataTable columns={columns} rows={rows} /></Card></AppLayout>;
}

export const Status = ({ children = 'Published' }: { children?: React.ReactNode }) => <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-900/20">{children}</span>;
export const Thumb = ({ label }: { label: string }) => <div className="flex items-center gap-3"><div className="flex h-11 w-14 items-center justify-center rounded-lg bg-gray-100 text-gray-400 dark:bg-gray-700"><Image size={18}/></div><span className="font-medium text-gray-800 dark:text-gray-200">{label}</span></div>;
export const AddButton = ({ label = 'Tambah Item' }: { label?: string }) => <button className="flex items-center gap-1 rounded-lg border border-brand-200 px-3 py-2 text-xs font-semibold text-brand-500"><Plus size={14}/>{label}</button>;
