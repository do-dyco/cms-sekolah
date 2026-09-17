import type { ReactNode } from "react";

export function SupportChannelCard({ icon, title, description, action, tone = "default" }: { icon: string; title: string; description: string; action: ReactNode; tone?: "default" | "whatsapp" }) {
  return <article className={`support-card ${tone === "whatsapp" ? "support-card-whatsapp" : ""}`}><div className="support-icon">{icon}</div><h3>{title}</h3><p>{description}</p><div>{action}</div></article>;
}

export function ProcessSteps({ items }: { items: { step: string; title: string; description: string; icon: string }[] }) {
  return <div className="process-grid">{items.map((item) => <article className="process-card" key={item.step}><div className="process-icon">{item.icon}</div><span>{item.step}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>;
}
