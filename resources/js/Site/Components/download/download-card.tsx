import { Badge } from "../ui/shared";

export type DownloadItem = {
  title: string;
  meta: string[];
  type: string;
  badge?: string;
};

export function DownloadCard({ item }: { item: DownloadItem }) {
  return <article className="download-card card-hover"><div className="download-icon">⬇</div><div className="download-content"><div className="download-badges"><Badge tone="slate">{item.type}</Badge>{item.badge && <Badge>{item.badge}</Badge>}</div><h3>{item.title}</h3><p>{item.meta.join(" • ")}</p></div><button>Download</button></article>;
}
