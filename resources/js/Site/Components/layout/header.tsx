"use client";

import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil Sekolah", href: "/profil" },
  { label: "Program", href: "/products" },
  { label: "Mading", href: "/mading" },
  { label: "Dokumen", href: "/downloads" },
  { label: "Kontak", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePage().url;

  const isActive = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <header className="desktop-header">
        <div className="nav-container">
          <Link className="brand" href="/">Sekolah Example</Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link className={isActive(item.href) ? "active" : ""} href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </nav>
          <div className="nav-actions">
            <button aria-label="Search">⌕</button>
            <button aria-label="Language">◎</button>
            <button aria-label="Chat">◌</button>
          </div>
        </div>
      </header>

      <header className="mobile-header">
        <Link className="brand" href="/">Sekolah Example</Link>
        <button aria-label="Open menu" onClick={() => setMenuOpen(true)}>☰</button>
      </header>

      {menuOpen && <button className="menu-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-title">
          <div><strong>Sekolah Example</strong><span>Unggul, Berkarakter, Berprestasi</span></div>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        </div>
        <nav>
          {navItems.map((item) => (
            <Link className={isActive(item.href) ? "active" : ""} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
        </nav>
        <Link className="support-button" href="/contact" onClick={() => setMenuOpen(false)}>Hubungi Sekolah</Link>
      </aside>
    </>
  );
}
