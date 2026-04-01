import { Link } from 'react-router-dom';
import { ContactLinks } from '../components/ContactLinks';
import { LakehousePreview } from '../components/LakehousePreview';
import { siteMeta, skillSet } from '../data/portfolio';

export function HomePage() {
  return (
    <div className="page-layout">
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">{siteMeta.heroEyebrow}</p>
          <h1>{siteMeta.name}</h1>
          <p className="hero-role-line">{siteMeta.role}</p>
          <p className="hero-text">{siteMeta.heroText}</p>
          <p className="hero-support">{siteMeta.heroSupport}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">
              View Projects
            </Link>
            <Link className="button button-secondary" to="/about">
              About Me
            </Link>
          </div>
        </div>

        <aside className="hero-side reveal reveal-delay">
          <div className="terminal-card">
            <div className="terminal-bar">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot amber"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">SKILL SET</span>
            </div>
            <ul className="terminal-list">
              {skillSet.map((skill) => (
                <li key={skill}>
                  <span className="status-dot"></span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="feature-section">
        <LakehousePreview />
      </section>

      <ContactLinks />
    </div>
  );
}
