import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '../PublicLayout';
import { ProductCard } from '../Components/product/product-card';
import type { Product } from '../Components/product/product-card';

type HomepageData = {
  hero: { eyebrow: string; title: string; description: string; primary_button_text: string; primary_button_url: string; secondary_button_text: string; secondary_button_url: string; background_image?: string | null };
  standards_section: { title: string; description: string };
  standards: { icon: string; title: string; description: string }[];
  featured_section: { title: string; description: string; link_text: string; link_url: string };
  featured_products: Product[];
};

export default function Home({ homepage }: { homepage: HomepageData }) {
  const c = homepage;
  return <PublicLayout title="Beranda">
    <section className="hero">
      <div className="hero-image" style={c.hero.background_image ? ({ '--hero-img': `url(${c.hero.background_image})` } as React.CSSProperties) : undefined} />
      <div className="container hero-content"><span className="eyebrow">{c.hero.eyebrow}</span><h1>{c.hero.title}</h1><p>{c.hero.description}</p><div className="hero-actions"><Link className="button primary" href={c.hero.primary_button_url}>{c.hero.primary_button_text} <span>→</span></Link><Link className="button secondary" href={c.hero.secondary_button_url}>{c.hero.secondary_button_text}</Link></div></div>
    </section>
    <section className="section container standards-section"><div className="section-heading"><h2>{c.standards_section.title}</h2><p>{c.standards_section.description}</p></div><div className="standards-grid">{c.standards.map(item => <article className="standard-card" key={item.title}><div className="standard-icon">{item.icon}</div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
    <section className="section products-section" id="products"><div className="container"><div className="products-heading"><div><h2>{c.featured_section.title}</h2><p>{c.featured_section.description}</p></div><Link href={c.featured_section.link_url}>{c.featured_section.link_text} →</Link></div><div className="products-grid">{c.featured_products.map(product => <ProductCard key={product.name} product={product} />)}</div></div></section>
  </PublicLayout>;
}
