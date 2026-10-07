"use client";

import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil Sekolah", href: "/profil" },
  { label: "Program", href: "/products" },
  { label: "Mading", href: "/mading" },
  { label: "Kontak", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const pathname = usePage().url;
  const siteSettings = (usePage().props as { siteSettings?: { site_name?: string; tagline?: string } }).siteSettings ?? {};
  const siteName = siteSettings.site_name || "Sekolah Example";
  const tagline = siteSettings.tagline || "Unggul, Berkarakter, Berprestasi";

  const toggleTheme = () => setDark((value) => {
    const next = !value;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("site-theme", next ? "dark" : "light");
    return next;
  });

  useEffect(() => document.documentElement.classList.toggle("dark", dark), [dark]);

  const isActive = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <header className="desktop-header">
        <div className="nav-container">
          <a className="brand" href="/" aria-label={siteName}><img src="/images/logo/logo-sekolah.png" alt={siteName} /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a className={isActive(item.href) ? "active" : ""} href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <button aria-label={dark ? "Gunakan mode terang" : "Gunakan mode gelap"} onClick={toggleTheme}>{dark ? <Sun size={20} /> : <Moon size={20} />}</button>
          </div>
        </div>
      </header>

      <header className="mobile-header">
        <a className="brand" href="/" aria-label={siteName}><img src="/images/logo/logo-sekolah.png" alt={siteName} /></a>
        <div className="mobile-header-actions"><button aria-label={dark ? "Gunakan mode terang" : "Gunakan mode gelap"} onClick={toggleTheme}>{dark ? <Sun size={20} /> : <Moon size={20} />}</button><button aria-label="Open menu" onClick={() => setMenuOpen(true)}>☰</button></div>
      </header>

      {menuOpen && <button className="menu-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-title">
          <div><strong>{siteName}</strong><span>{tagline}</span></div>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        </div>
        <nav>
          {navItems.map((item) => (
            <a className={isActive(item.href) ? "active" : ""} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
        </nav>
        <a className="support-button" href="/contact" onClick={() => setMenuOpen(false)}>Hubungi Sekolah</a>
      </aside>
    </>
  );
}
