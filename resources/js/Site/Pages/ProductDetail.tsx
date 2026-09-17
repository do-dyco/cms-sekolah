import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '../PublicLayout';
import { Badge, Breadcrumbs, ImagePanel } from '../Components/ui/shared';
import { ProductCard } from '../Components/product/product-card';
import type { Product } from '../Components/product/product-card';

type ProgramDetail = {
  slug: string; name: string; sku: string | null; category: string | null;
  badge: string | null; image: string | null; description: string | null;
  content: string | null; specs: { label: string; value: string }[] | null;
  thumbnails: string[] | null; resources: { label: string; url: string }[] | null;
};

export default function ProductDetail({ program, related }: { program: ProgramDetail | null; related: Product[] }) {
  if (!program) {
    return <PublicLayout title="Program Tidak Ditemukan">
      <div className="section container narrow-page" style={{ textAlign: "center", padding: "4rem" }}>
        <h1>Program Tidak Ditemukan</h1>
        <Link className="button primary" href="/products">Kembali ke Program</Link>
      </div>
    </PublicLayout>;
  }
  const specs = program.specs ?? [];
  const resources = program.resources ?? [];
  const title = program.name;
  return <PublicLayout title={title}>
    <div className="section container product-detail-page">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Program", href: "/products" }, { label: title }]} />
      <div className="product-detail-top">
        <div className="product-gallery">
          <ImagePanel className="product-main-photo" image={program.image ?? ""} label={title} />
          {program.thumbnails && program.thumbnails.length > 0 && (
            <div className="product-thumbs">
              {program.thumbnails.map((thumb) => <div className="product-thumb" key={thumb} style={{ backgroundImage: `url(${thumb})` }} />)}
            </div>
          )}
        </div>
        <div className="product-summary">
          <div className="product-summary-badges">
            {program.badge && <Badge>{program.badge}</Badge>}
            {program.category && <Badge tone="slate">{program.category}</Badge>}
          </div>
          <h1>{title}</h1>
          {program.sku && <span className="sku">Kode: {program.sku}</span>}
          <p>{program.description}</p>
          {specs.length > 0 && (
            <div className="spec-highlight-grid">
              {specs.slice(0, 4).map((spec) => <div key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>)}
            </div>
          )}
          {resources.length > 0 && (
            <div className="product-summary-actions">
              {resources.slice(0, 2).map((resource) => <Link className="app-button app-button-secondary" href={resource.url || "#"} key={resource.label}>{resource.label}</Link>)}
            </div>
          )}
        </div>
      </div>
      {program.content && (
        <div className="product-detail-body">
          <h2>Informasi Program</h2>
          <p>{program.content}</p>
        </div>
      )}
      {resources.length > 0 && (
        <div className="product-detail-body">
          <h2>Dokumen Terkait</h2>
          <ul>{resources.map((resource) => <li key={resource.label}>{resource.label}</li>)}</ul>
        </div>
      )}
      {related.length > 0 && (
        <div className="product-related">
          <h2>Program Terkait</h2>
          <div className="products-grid products-page-grid">
            {related.map((item) => <ProductCard key={item.name} product={item} />)}
          </div>
        </div>
      )}
    </div>
  </PublicLayout>;
}
