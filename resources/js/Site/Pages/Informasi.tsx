import React from 'react';
import { PublicLayout } from '../PublicLayout';
import { SupportChannelCard } from '../Components/support/support-blocks';
import { PageIntro } from '../Components/ui/shared';

type InformasiData = { phone?: string | null; email?: string | null; whatsapp?: string | null; hero_title?: string | null; hero_description?: string | null };

export default function Informasi({ informasi }: { informasi: InformasiData }) {
  return <PublicLayout title="Informasi Sekolah">
    <div className="section container">
      <div className="support-hero">
        <div>
          <PageIntro title={informasi.hero_title || "Informasi Sekolah"} description={informasi.hero_description || "Tim sekolah siap membantu siswa dan orang tua melalui kanal berikut."} />
        </div>
      </div>
      <section className="support-grid-section">
        <div className="shared-section-heading centered"><div><h2>Hubungi Sekolah</h2><p>Tim sekolah siap membantu siswa dan orang tua melalui kanal berikut.</p></div></div>
        <div className="support-grid">
          {informasi.phone && <SupportChannelCard icon="☎" title="Telepon Sekolah" description="Hubungi sekolah pada jam operasional." action={<a href={`tel:${informasi.phone}`}>{informasi.phone}</a>} />}
          {informasi.email && <SupportChannelCard icon="✉" title="Email Sekolah" description="Kirim pertanyaan atau kebutuhan informasi melalui email." action={<a href={`mailto:${informasi.email}`}>{informasi.email}</a>} />}
          {informasi.whatsapp && <SupportChannelCard icon="◌" title="WhatsApp" description="Hubungi admin sekolah melalui WhatsApp." tone="whatsapp" action={<a href={`https://wa.me/${informasi.whatsapp}`}>Kirim Pesan</a>} />}
        </div>
      </section>
    </div>
  </PublicLayout>;
}
