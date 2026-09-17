import React from 'react';
import { PublicLayout } from '../PublicLayout';
import { ProductCard } from '../Components/product/product-card';
import { PageIntro } from '../Components/ui/shared';
import type { Product } from '../Components/product/product-card';

export default function Products({ products }: { products: Product[] }) {
  return <PublicLayout title="Program Sekolah">
    <div className="section container">
      <PageIntro title="Program Sekolah" description="Kenali program unggulan, kegiatan, dan fasilitas yang tersedia di sekolah." />
      {products.length === 0 ? (
        <p style={{ textAlign: "center", padding: "3rem", color: "#888" }}>Belum ada program.</p>
      ) : (
        <div className="products-grid products-page-grid">
          {products.map((product) => <ProductCard key={product.name} product={product} />)}
        </div>
      )}
    </div>
  </PublicLayout>;
}
