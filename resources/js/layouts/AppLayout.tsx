import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Building2, ChevronDown, CircleHelp, Contact, Download,
    FileText, Globe2, Home, LayoutDashboard, LogOut, Menu, Moon,
    Package, Settings, ShieldCheck, Sun, Users, X,
    KeyRound, UserRound,
} from 'lucide-react';
import type { AppPageProps } from '../types';

const mainNav = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, permission: 'dashboard.view' },
    { label: 'Pengguna CMS', href: '/users', icon: Users, permission: 'users.view' },
    { label: 'Peran & Hak Akses', href: '/roles', icon: ShieldCheck, permission: 'roles.view' },
];

const cmsNav = [
    { label: 'Beranda Website', href: '/cms/homepage', icon: Home },
    { label: 'Program Unggulan', href: '/cms/products', icon: Package },
    { label: 'Dokumen Sekolah', href: '/cms/downloads', icon: Download },
    { label: 'Profil Sekolah', href: '/cms/company', icon: Building2 },
    { label: 'Informasi Sekolah', href: '/cms/customer-service', icon: CircleHelp },
    { label: 'Mading', href: '/cms/news', icon: FileText },
    { label: 'Kontak Sekolah', href: '/cms/contact', icon: Contact },
    { label: 'Pengaturan Website', href: '/cms/global-settings', icon: Settings },
];

export default function AppLayout({ children, title = 'Dashboard' }: { children: React.ReactNode; title?: string }) {
    const { auth } = usePage<AppPageProps>().props;
    const currentUrl = usePage().url;
    const [mobile, setMobile] = React.useState(false);
    const [userOpen, setUserOpen] = React.useState(false);
    const [dark, setDark] = React.useState(() => localStorage.getItem('theme') === 'dark');
    const userDropdownRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setUserOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    const can = (permission: string) => auth.user?.permissions.includes(permission) ?? false;
    const active = (href: string) => href === '/' ? currentUrl === '/' : currentUrl.startsWith(href);
    const linkClass = (href: string) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active(href) ? 'bg-brand-500 font-medium text-white shadow-md shadow-brand-500/20' : 'text-gray-600 hover:bg-brand-50 hover:text-brand-500 dark:text-gray-300 dark:hover:bg-gray-800'}`;

    return <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white/90">
        <Head title={title} />
        {mobile && <button className="fixed inset-0 z-40 bg-black/40 xl:hidden" onClick={() => setMobile(false)} aria-label="Close sidebar overlay" />}
        <aside className={`${mobile ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'} fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col border-r border-gray-100 bg-white transition dark:border-gray-800 dark:bg-gray-950`}>
            <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6 dark:border-gray-800">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-lg font-black text-white">S</div>
                    <div><div className="text-lg font-bold text-gray-900 dark:text-white">CMS Sekolah</div><div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Admin & Guru</div></div>
                </Link>
                <button className="xl:hidden" onClick={() => setMobile(false)}><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Administrasi</p>
                <nav className="space-y-1">
                    {mainNav.filter(n => can(n.permission)).map(({ label, href, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobile(false)} className={linkClass(href)}><Icon size={19} />{label}</Link>)}
                </nav>
                <p className="mb-3 mt-7 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Konten Website</p>
                <div className="flex items-center justify-between rounded-xl bg-brand-50 px-3 py-2.5 text-sm font-semibold text-brand-500 dark:bg-gray-800"><span className="flex items-center gap-3"><Globe2 size={19} />Halaman Website</span><ChevronDown size={16} className="rotate-180" /></div>
                <nav className="mt-2 space-y-1 border-l border-gray-200 pl-4 dark:border-gray-700">{cmsNav.filter(item => auth.user?.roles.includes('admin') || item.href === '/cms/news').map(({ label, href, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobile(false)} className={linkClass(href)}><Icon size={17} />{label}</Link>)}</nav>
            </div>
            <div className="border-t border-gray-100 p-4 dark:border-gray-800"><div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900"><p className="text-sm font-semibold">{auth.user?.name}</p><p className="truncate text-xs text-gray-500">{auth.user?.email}</p></div></div>
        </aside>
        <div className="xl:ml-[290px]">
            <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/90 px-4 backdrop-blur md:px-6 dark:border-gray-800 dark:bg-gray-900/90">
                <div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-gray-100 xl:hidden dark:hover:bg-gray-800" onClick={() => setMobile(true)}><Menu /></button><div className="hidden sm:block"><p className="text-sm font-semibold">CMS Sekolah</p><p className="text-xs text-gray-400">Kelola konten website sekolah</p></div></div>
                <div className="flex items-center gap-2">
                    <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDark(v => !v)}>{dark ? <Sun size={20} /> : <Moon size={20} />}</button>
                    <div className="relative" ref={userDropdownRef}>
                        <button onClick={() => setUserOpen(v => !v)} className="flex items-center gap-3 rounded-xl p-1.5 pr-2 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">{auth.user?.name.slice(0, 2).toUpperCase()}</div>
                            <div className="hidden text-left sm:block"><p className="max-w-36 truncate text-sm font-semibold">{auth.user?.name}</p><p className="max-w-36 truncate text-[11px] text-gray-400">{auth.user?.roles.join(', ')}</p></div>
                            <ChevronDown size={16} className={`hidden transition sm:block ${userOpen ? 'rotate-180' : ''}`}/>
                        </button>
                        {userOpen && <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-900/10 dark:border-gray-700 dark:bg-gray-800">
                            <div className="p-4"><p className="font-semibold text-gray-900 dark:text-white">{auth.user?.name}</p><p className="mt-1 truncate text-xs text-gray-500">{auth.user?.email}</p><div className="mt-2 flex gap-1">{auth.user?.roles.map(role => <span key={role} className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold capitalize text-brand-600 dark:bg-brand-500/10">{role}</span>)}</div></div>
                            <div className="border-t border-gray-100 p-2 dark:border-gray-700"><Link href="/account/profile" onClick={() => setUserOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-gray-50 dark:hover:bg-gray-700"><UserRound size={17} className="text-gray-400"/>Profil Saya</Link><Link href="/account/profile#password" onClick={() => setUserOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-gray-50 dark:hover:bg-gray-700"><KeyRound size={17} className="text-gray-400"/>Ganti Password</Link></div>
                            <div className="border-t border-gray-100 p-2 dark:border-gray-700"><button onClick={() => router.delete('/logout')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-error-600 transition hover:bg-error-50 dark:hover:bg-error-500/10"><LogOut size={17}/>Logout</button></div>
                        </div>}
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-[1536px] p-4 md:p-6">{children}</main>
        </div>
    </div>;
}
