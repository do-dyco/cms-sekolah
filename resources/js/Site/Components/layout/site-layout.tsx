import { Header } from "../layout/header";
import { Footer } from "../layout/footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
