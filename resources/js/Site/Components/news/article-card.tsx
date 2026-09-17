import { Link } from "@inertiajs/react";
import { Badge, ImagePanel } from "../ui/shared";

export type Article = {
  title: string;
  description: string;
  image?: string;
  category: string;
  date: string;
  href: string;
  featured?: boolean;
  promo?: boolean;
};

export function ArticleCard({ article }: { article: Article }) {
  if (article.promo) {
    return <article className="news-card news-card-promo"><div><span className="promo-icon">◉</span><h3>{article.title}</h3><p>{article.description}</p><button>Play Episode</button></div></article>;
  }

  return (
    <article className={`news-card ${article.featured ? "news-card-featured" : ""}`}>
      {article.image && <ImagePanel className={article.featured ? "news-photo-lg" : "news-photo"} image={article.image} label={article.title} />}
      <div className="news-content">
        <div className="news-meta"><span>{article.category}</span><time>{article.date}</time></div>
        {article.featured && <Badge>FEATURED</Badge>}
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <Link href={article.href}>{article.featured ? "Read Full Article" : "Read Article"}</Link>
      </div>
    </article>
  );
}
