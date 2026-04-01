import { ContactLinks } from '../components/ContactLinks';
import { LakehousePreview } from '../components/LakehousePreview';

export function ProjectsPage() {
  return (
    <div className="page-layout">
      <section className="page-intro reveal">
        <p className="eyebrow">Projects</p>
        <h1>My Selected Projects.</h1>
        <p className="hero-text intro-width">
          The projects I built and how I apply data engineering principles.
        </p>
      </section>

      <section id="featured-project" className="feature-section">
        <LakehousePreview />
      </section>

      <ContactLinks />
    </div>
  );
}
