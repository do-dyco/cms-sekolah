import { Link } from "@inertiajs/react";

const groups = [
  { title: "Sekolah", links: [{ label: "Profil", href: "/profil" }, { label: "Visi", href: "/profil" }, { label: "Misi", href: "/profil" }] },
  { title: "Informasi", links: [{ label: "Program", href: "/products" }, { label: "Mading", href: "/mading" }, { label: "Dokumen", href: "/downloads" }] },
  { title: "Layanan", links: [{ label: "Informasi Sekolah", href: "/customer-service" }, { label: "Kontak", href: "/contact" }] },
];

export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <strong>Sekolah Example</strong>
          <p>Membangun generasi unggul, berkarakter, dan berprestasi.</p>
        </div>
        {groups.map((group) => (
          <div className="footer-links" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((item) => <Link href={item.href} key={item.label}>{item.label}</Link>)}
          </div>
        ))}
      </div>
      <div className="container copyright">
        <span>© 2026 Sekolah Example. Hak cipta dilindungi.</span>
        <span>↗</span>
      </div>
    </footer>
  );
}
