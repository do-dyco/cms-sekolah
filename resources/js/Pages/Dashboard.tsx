import { Link, usePage } from '@inertiajs/react';
import { Download, FileText, GraduationCap, Home, Settings, Users } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import type { AppPageProps } from '../types';
import { card, PageHeader } from './MockUI';

type Stats = {
  programs: number;
  publishedPrograms: number;
  mading: number;
  publishedMading: number;
  documents: number;
  users: number;
};

const shortcuts = [
  { label: 'Atur Beranda', description: 'Ubah hero, keunggulan, dan program unggulan.', href: '/cms/homepage', icon: Home, adminOnly: true },
  { label: 'Kelola Program Unggulan', description: 'Tambah atau perbarui program sekolah.', href: '/cms/products', icon: GraduationCap, adminOnly: true },
  { label: 'Kelola Mading', description: 'Tulis pengumuman, kegiatan, dan prestasi.', href: '/cms/news', icon: FileText, adminOnly: false },
  { label: 'Pengaturan Website', description: 'Kelola identitas dan pengaturan umum website.', href: '/cms/global-settings', icon: Settings, adminOnly: true },
];

export default function Dashboard({ stats }: { stats: Stats }) {
  const { auth } = usePage<AppPageProps>().props;
  const isAdmin = auth.user?.roles.includes('admin') ?? false;
  const metrics = [
    { label: 'Program Unggulan', value: stats.programs, detail: `${stats.publishedPrograms} dipublikasikan`, icon: GraduationCap },
    { label: 'Mading Sekolah', value: stats.mading, detail: `${stats.publishedMading} dipublikasikan`, icon: FileText },
    { label: 'Dokumen Sekolah', value: stats.documents, detail: 'file tersimpan', icon: Download },
    { label: 'Pengguna CMS', value: stats.users, detail: 'admin dan guru', icon: Users },
  ];

  return <AppLayout title="Dashboard CMS Sekolah">
    <PageHeader title="Dashboard CMS Sekolah" subtitle="Ringkasan konten dan akses cepat untuk mengelola website sekolah." />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ label, value, detail, icon: Icon }) => <section key={label} className={`${card} p-5`}>
        <span className="inline-flex rounded-xl bg-brand-50 p-2.5 text-brand-600 dark:bg-brand-500/10"><Icon size={21} /></span>
        <p className="mt-5 text-sm text-gray-500">{label}</p>
        <strong className="mt-1 block text-2xl text-gray-900 dark:text-white">{value}</strong>
        <p className="mt-1 text-xs text-gray-400">{detail}</p>
      </section>)}
    </div>
    <section className={`${card} mt-6 p-5`}>
      <div><h2 className="font-semibold">Akses Cepat</h2><p className="mt-1 text-xs text-gray-500">Pilih bagian website yang ingin dikelola.</p></div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {shortcuts.filter(item => isAdmin || !item.adminOnly).map(({ label, description, href, icon: Icon }) => <Link key={href} href={href} className="flex items-start gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-brand-200 hover:bg-brand-50/50 dark:border-gray-700 dark:hover:bg-gray-800">
          <span className="rounded-lg bg-brand-50 p-2 text-brand-600 dark:bg-brand-500/10"><Icon size={19} /></span>
          <span><strong className="block text-sm">{label}</strong><span className="mt-1 block text-xs text-gray-500">{description}</span></span>
        </Link>)}
      </div>
    </section>
  </AppLayout>;
}