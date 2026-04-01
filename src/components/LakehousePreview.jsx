import { Link } from 'react-router-dom';
import { lakehouseProject } from '../data/portfolio';
import { LakehouseDiagram } from './LakehouseDiagram';

export function LakehousePreview({ showFlow = true }) {
  return (
    <article className="home-card lakehouse-card reveal">
      <div className="lakehouse-copy">
        <p className="eyebrow">Featured Project</p>
        <h2>{lakehouseProject.title}</h2>
        <p>{lakehouseProject.summary}</p>
        <ul className="feature-list">
          {lakehouseProject.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <Link className="text-link" to={`/projects/${lakehouseProject.slug}`}>
          See full project breakdown
        </Link>
      </div>
      {showFlow ? <LakehouseDiagram /> : null}
    </article>
  );
}
