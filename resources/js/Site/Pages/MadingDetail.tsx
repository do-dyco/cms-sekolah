import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '../PublicLayout';
import { Badge, Breadcrumbs, ImagePanel } from '../Components/ui/shared';

type MadingDetail = {
  title: string; slug: string; excerpt: string | null; content: string | null;
  image: string | null; category: string | null; published_at: string | null;
};

export default function MadingDetail({ mading }: { mading: MadingDetail | null }) {
  if (!mading) {
    return <PublicLayout title="Mading Tidak Ditemukan">
      <div className="section container narrow-page" style={{ textAlign: "center", padding: "4rem" }}>
        <h1>Mading Tidak Ditemukan</h1>
        <Link className="button primary" href="/mading">Kembali ke Mading</Link>
      </div>
    </PublicLayout>;
  }
  return <PublicLayout title={mading.title}>
    <div className="section container narrow-page">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Mading", href: "/mading" }, { label: mading.title }]} />
      {mading.category && <span className="badge">{mading.category}</span>}
      <h1>{mading.title}</h1>
      {mading.published_at && <p className="meta">{mading.published_at}</p>}
      {mading.image && <ImagePanel className="article-hero" image={mading.image} label={mading.title} />}
      {mading.excerpt && <p className="lead">{mading.excerpt}</p>}
      {mading.content && <div className="article-content"><p>{mading.content}</p></div>}
    </div>
  </PublicLayout>;
}
