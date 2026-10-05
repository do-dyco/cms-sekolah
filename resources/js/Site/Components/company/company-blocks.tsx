import { ImagePanel } from "../ui/shared";

export function SplitHero({ title, description, image, pill }: { title: string; description: string; image: string; pill: string }) {
  return <section className="split-hero"><div className="split-copy"><h1>{title}</h1><p>{description}</p></div><div className="split-media"><ImagePanel image={image} label={title} /><span>{pill}</span></div></section>;
}

export function Timeline({ items }: { items: { year: string; title: string; description: string }[] }) {
  return <div className="timeline">{items.map((item) => <article className="timeline-item" key={item.year}><div className="timeline-dot" /><div className="timeline-year"><span>{item.year}</span><h3>{item.title}</h3></div><div className="timeline-copy"><p>{item.description}</p></div></article>)}</div>;
}
