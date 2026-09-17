import { Link } from "@inertiajs/react";
import type { ReactNode } from "react";

export function PageIntro({ title, description }: { title: string; description: string }) {
  return <section className="page-intro"><h1>{title}</h1><p>{description}</p></section>;
}

export function SectionHeading({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="shared-section-heading"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>;
}

export function Badge({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "slate" | "amber" | "green" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function AppButton({ children, href, variant = "primary" }: { children: ReactNode; href: string; variant?: "primary" | "secondary" | "ghost" }) {
  return <Link className={`app-button app-button-${variant}`} href={href}>{children}</Link>;
}

export function SearchInput({ placeholder }: { placeholder: string }) {
  return <label className="search-input"><span>⌕</span><input type="search" placeholder={placeholder} /></label>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={item.label}>{index > 0 && <b>›</b>}{item.href ? <Link href={item.href}>{item.label}</Link> : item.label}</span>)}</nav>;
}

export function Pagination() {
  return <nav className="pagination" aria-label="Pagination"><button disabled>‹</button>{[1, 2, 3].map((page) => <button className={page === 1 ? "active" : ""} key={page}>{page}</button>)}<span>…</span><button>14</button><button>›</button></nav>;
}

export function ImagePanel({ image, label, className = "" }: { image: string; label: string; className?: string }) {
  return <div className={`image-panel ${className}`} role="img" aria-label={label} style={{ backgroundImage: `url(${image})` }} />;
}
