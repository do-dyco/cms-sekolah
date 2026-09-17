import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '../PublicLayout';
import { SupportChannelCard } from '../Components/support/support-blocks';
import { PageIntro } from '../Components/ui/shared';

type ContactData = { phone?: string | null; email?: string | null } & Record<string, unknown>;

export default function Contact({ contact }: { contact: ContactData }) {
  const phone = String(contact.phone ?? "");
  const email = String(contact.email ?? "");
  return <PublicLayout title="Kontak Sekolah">
    <div className="section container">
      <PageIntro title="Kontak Sekolah" description="Hubungi kami melalui kanal berikut untuk informasi akademik, pendaftaran, dan layanan lainnya." />
      <div className="support-grid">
        {phone && <SupportChannelCard icon="☎" title="Telepon Sekolah" description="Hubungi sekolah pada jam operasional." action={<a href={`tel:${phone}`}>{phone}</a>} />}
        {email && <SupportChannelCard icon="✉" title="Email Sekolah" description="Kirim pertanyaan atau kebutuhan informasi melalui email." action={<a href={`mailto:${email}`}>{email}</a>} />}
        <SupportChannelCard icon="◌" title="Informasi Sekolah" description="Lihat kanal layanan informasi sekolah yang tersedia." action={<Link href="/customer-service">Buka Informasi Sekolah</Link>} />
      </div>
    </div>
  </PublicLayout>;
}
