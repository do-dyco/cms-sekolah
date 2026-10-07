import React from 'react';
import { Head } from '@inertiajs/react';
import { Header } from './Components/layout/header';
import { Footer } from './Components/layout/footer';
import '../../css/site.css';

export function PublicLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return <><Head title={`${title} | MTS Tadibbul Ummah`} /><div className="site-shell"><Header /><main>{children}</main><Footer /></div></>;
}
