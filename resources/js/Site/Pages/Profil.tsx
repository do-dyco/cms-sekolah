import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '../PublicLayout';
import { SplitHero, Timeline } from '../Components/company/company-blocks';

type ProfilData = { title: string; description: string; image: string; pill: string; visi?: string; misi?: string };

const timeline = [
  { year: "1998", title: "Pendirian", description: "Sekolah Example didirikan dengan visi mencetak generasi unggul dan berkarakter." },
  { year: "2010", title: "Akreditasi A", description: "Sekolah meraih akreditasi A dan mulai mengembangkan program ekstrakurikuler unggulan." },
  { year: "2024", title: "Era Digital", description: "Integrasi teknologi pembelajaran digital dan platform informasi sekolah untuk seluruh siswa dan orang tua." },
];

export default function Profil({ profil }: { profil: ProfilData }) {
  const data = { title: "Profil Sekolah", description: "", image: "", pill: "", ...profil };
  return <PublicLayout title="Profil Sekolah">
    <div className="section container">
      <SplitHero title={data.title} description={data.description} image={data.image} pill={data.pill} />
      <section className="company-purpose">
        <div className="shared-section-heading centered">
          <div><h2>Visi & Misi</h2><p>Komitmen kami dalam membangun generasi unggul dan berkarakter.</p></div>
        </div>
        <div className="company-purpose-grid">
          <article className="purpose-card"><div className="purpose-icon">◔</div><h3>Visi</h3><p>{data.visi || "Menjadi sekolah unggul yang berprestasi dan berkarakter."}</p></article>
          <article className="purpose-card dark"><div className="purpose-icon">↗</div><h3>Misi</h3><p>{data.misi || "Mendidik siswa dengan kurikulum berkualitas, lingkungan belajar yang aman, dan dukungan tenaga pendidik profesional."}</p></article>
        </div>
      </section>
      <section className="company-timeline-section">
        <div className="shared-section-heading"><div><h2>Sejarah Sekolah</h2></div></div>
        <Timeline items={timeline} />
      </section>
    </div>
  </PublicLayout>;
}
