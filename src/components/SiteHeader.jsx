import { NavLink, Link } from 'react-router-dom';
import { siteMeta } from '../data/portfolio';

const profileImageSrc = `${import.meta.env.BASE_URL}IMG_1598.JPG`;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <img src={profileImageSrc} alt="Michael Chen" />
        </span>
        <span className="brand-copy">
          <strong>{siteMeta.name}</strong>
          <span>{siteMeta.subtitle}</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          to="/projects"
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          to="/about"
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
