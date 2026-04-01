import { SiteHeader } from './SiteHeader';

export function SiteLayout({ children }) {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
}
