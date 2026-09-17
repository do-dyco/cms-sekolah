import React from 'react';
import { PublicLayout } from '../PublicLayout';
import { ArticleCard } from '../Components/news/article-card';
import { PageIntro } from '../Components/ui/shared';
import type { Article } from '../Components/news/article-card';

export default function Mading({ articles }: { articles: Article[] }) {
  return <PublicLayout title="Mading Sekolah">
    <div className="section container">
      <PageIntro title="Mading Sekolah" description="Informasi, pengumuman, kegiatan, dan prestasi terbaru sekolah." />
      {articles.length === 0 ? (
        <p style={{ textAlign: "center", padding: "3rem", color: "#888" }}>Belum ada mading.</p>
      ) : (
        <div className="news-grid">
          {articles.map((article) => <ArticleCard key={article.title} article={article} />)}
        </div>
      )}
    </div>
  </PublicLayout>;
}
