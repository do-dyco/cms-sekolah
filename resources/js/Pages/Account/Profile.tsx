import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { KeyRound, Mail, Save, ShieldCheck, UserRound } from 'lucide-react';
import AppLayout from '../../layouts/AppLayout';
import type { AppPageProps } from '../../types';

const inputClass = 'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900';

export default function Profile() {
    const { auth, flash } = usePage<AppPageProps>().props;
    const user = auth.user!;
    const profile = useForm({ name: user.name, email: user.email });
    const password = useForm({ current_password: '', password: '', password_confirmation: '' });

    const submitProfile = (event: React.FormEvent) => {
        event.preventDefault();
        profile.put('/account/profile', { preserveScroll: true });
    };
    const submitPassword = (event: React.FormEvent) => {
        event.preventDefault();
        password.put('/account/password', {
            preserveScroll: true,
            onSuccess: () => password.reset(),
        });
    };

    return <AppLayout title="My Profile">
        <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-wider text-brand-500">My Account</p><h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1><p className="mt-1 text-sm text-gray-500">Kelola informasi akun dan keamanan password Anda.</p></div>
        {flash?.success && <div className="mb-6 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">{flash.success}</div>}
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
            <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-800">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 text-3xl font-bold text-brand-500 dark:bg-brand-500/10">{user.name.slice(0, 2).toUpperCase()}</div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2><p className="mt-1 text-sm text-gray-500">{user.email}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">{user.roles.map(role => <span key={role} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold capitalize text-brand-600 dark:bg-brand-500/10">{role}</span>)}</div>
                <div className="mt-6 border-t border-gray-100 pt-5 text-left dark:border-gray-700"><div className="flex items-center gap-3 text-sm"><ShieldCheck size={18} className="text-success-500"/><span>Akun aktif dan terlindungi</span></div></div>
            </aside>
            <div className="space-y-6">
                <form onSubmit={submitProfile} className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
                    <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-700"><h2 className="font-semibold text-gray-900 dark:text-white">Informasi Profile</h2><p className="mt-1 text-xs text-gray-500">Perbarui nama dan alamat email akun.</p></div>
                    <div className="grid gap-5 p-6 md:grid-cols-2"><label><span className="mb-2 flex items-center gap-2 text-sm font-medium"><UserRound size={16}/>Nama Lengkap</span><input className={inputClass} value={profile.data.name} onChange={e => profile.setData('name', e.target.value)}/>{profile.errors.name && <p className="mt-1 text-xs text-error-500">{profile.errors.name}</p>}</label><label><span className="mb-2 flex items-center gap-2 text-sm font-medium"><Mail size={16}/>Email</span><input type="email" className={inputClass} value={profile.data.email} onChange={e => profile.setData('email', e.target.value)}/>{profile.errors.email && <p className="mt-1 text-xs text-error-500">{profile.errors.email}</p>}</label></div>
                    <div className="flex justify-end border-t border-gray-100 px-6 py-4 dark:border-gray-700"><button disabled={profile.processing} className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"><Save size={17}/>{profile.processing ? 'Menyimpan...' : 'Simpan Profile'}</button></div>
                </form>
                <form id="password" onSubmit={submitPassword} className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
                    <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-700"><h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white"><KeyRound size={18}/>Ganti Password</h2><p className="mt-1 text-xs text-gray-500">Gunakan minimal 8 karakter untuk password baru.</p></div>
                    <div className="grid gap-5 p-6"><label><span className="mb-2 block text-sm font-medium">Password Lama</span><input type="password" className={inputClass} value={password.data.current_password} onChange={e => password.setData('current_password', e.target.value)}/>{password.errors.current_password && <p className="mt-1 text-xs text-error-500">{password.errors.current_password}</p>}</label><div className="grid gap-5 md:grid-cols-2"><label><span className="mb-2 block text-sm font-medium">Password Baru</span><input type="password" className={inputClass} value={password.data.password} onChange={e => password.setData('password', e.target.value)}/>{password.errors.password && <p className="mt-1 text-xs text-error-500">{password.errors.password}</p>}</label><label><span className="mb-2 block text-sm font-medium">Konfirmasi Password Baru</span><input type="password" className={inputClass} value={password.data.password_confirmation} onChange={e => password.setData('password_confirmation', e.target.value)}/></label></div></div>
                    <div className="flex justify-end border-t border-gray-100 px-6 py-4 dark:border-gray-700"><button disabled={password.processing} className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-gray-900"><KeyRound size={17}/>{password.processing ? 'Memproses...' : 'Update Password'}</button></div>
                </form>
            </div>
        </div>
    </AppLayout>;
}
