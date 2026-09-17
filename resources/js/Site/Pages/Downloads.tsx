import React from 'react';
import { PublicLayout } from '../PublicLayout';
import { DownloadCard } from '../Components/download/download-card';
import { PageIntro } from '../Components/ui/shared';

type DownloadItem = {
  title: string; type: string | null; version: string | null; file_size: string | null;
  language: string | null; badge: string | null; category: string | null;
};

type CardItem = { title: string; type: string; version?: string; size?: string; language?: string; badge?: string; meta: string[] };

export default function Downloads({ downloads }: { downloads: DownloadItem[] }) {
  const items: CardItem[] = downloads.map((d) => ({
    title: d.title,
    type: d.type ?? "Dokumen",
    version: d.version ?? undefined,
    size: d.file_size ?? undefined,
    language: d.language ?? undefined,
    badge: d.badge ?? undefined,
    meta: [d.category, d.version, d.file_size, d.language].filter(Boolean) as string[],
  }));
  return <PublicLayout title="Dokumen Sekolah">
    <div className="section container">
      <PageIntro title="Dokumen Sekolah" description="Unduh kalender akademik, formulir, brosur, panduan, jadwal, dan dokumen informasi sekolah." />
      {items.length === 0 ? (
        <p style={{ textAlign: "center", padding: "3rem", color: "#888" }}>Belum ada dokumen.</p>
      ) : (
        <div className="downloads-grid">{items.map((item) => <DownloadCard key={item.title} item={item} />)}</div>
      )}
    </div>
  </PublicLayout>;
}
