import { Link } from "@inertiajs/react";
import { Badge } from "../ui/shared";

export type Product = {
  name: string;
  description: string;
  image: string;
  badge?: string;
  category?: string;
  href: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card card-hover">
      <div className="product-image">
        <div className="product-photo" role="img" aria-label={product.name} style={{ backgroundImage: `url(${product.image})` }} />
        {product.badge && <Badge>{product.badge}</Badge>}
      </div>
      <div className="product-body">
        {product.category && <span className="product-category">{product.category}</span>}
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <Link href={product.href}>Lihat Detail</Link>
      </div>
    </article>
  );
}
