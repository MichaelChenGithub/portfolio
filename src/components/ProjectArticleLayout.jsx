import { useEffect, useMemo, useRef, useState } from 'react';
import { ContactLinks } from './ContactLinks';
import { LakehouseDiagram } from './LakehouseDiagram';

export function ProjectArticleLayout({ project }) {
  const heroSection = project.heroSection ?? {};
  const overviewSection = project.sections?.overview ?? {};
  const architectureSection = project.sections?.architecture ?? {};
  const decisionsSection = project.sections?.decisions ?? {};
  const nextSection = project.sections?.next ?? {};
  const ui = project.ui ?? {};
  const sectionRefs = useRef({});
  const articleSections = useMemo(() => {
    const sections = [
      { id: 'overview', label: overviewSection.navLabel },
      { id: 'architecture', label: architectureSection.navLabel },
    ];

    if (project.evidenceSection) {
      sections.push({
        id: 'evidence',
        label: project.evidenceSection.navLabel,
      });
    }

    sections.push(
      { id: 'decisions', label: decisionsSection.navLabel },
      { id: 'next', label: nextSection.navLabel },
    );

    return sections;
  }, [architectureSection.navLabel, decisionsSection.navLabel, nextSection.navLabel, overviewSection.navLabel, project.evidenceSection]);
  const sectionIds = useMemo(
    () => articleSections.map((section) => section.id),
    [articleSections],
  );
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'overview');

  useEffect(() => {
    if (!sectionIds.length) {
      return undefined;
    }

    setActiveSection(sectionIds[0]);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) {
          return;
        }

        const nextActiveId = visibleEntries[0].target.getAttribute('id');
        if (nextActiveId) {
          setActiveSection(nextActiveId);
        }
      },
      {
        root: null,
        rootMargin: '-118px 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sectionIds.forEach((sectionId) => {
      const sectionNode = sectionRefs.current[sectionId];
      if (sectionNode) {
        observer.observe(sectionNode);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const handleTocClick = (sectionId) => {
    const sectionNode = sectionRefs.current[sectionId];
    if (!sectionNode) {
      return;
    }

    const scrollOffset = 116;
    const targetTop =
      window.scrollY + sectionNode.getBoundingClientRect().top - scrollOffset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const setSectionRef = (sectionId) => (node) => {
    if (node) {
      sectionRefs.current[sectionId] = node;
    }
  };

  return (
    <div className="page-layout project-detail-page">
      <article className="project-article reveal">
        <header className="project-article-hero">
          <p className="eyebrow">{heroSection.eyebrow}</p>
          <p className="project-article-kicker">
            {heroSection.kicker}
          </p>
          <h1>{project.title}</h1>
          <p className="project-article-intro">{project.intro}</p>
          <dl className="project-article-facts">
            {project.detailCards.map((card) => (
              <div key={card.label} className="project-article-fact">
                <dt>{card.label}</dt>
                <dd>{card.text}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="project-article-body">
          <aside className="project-article-rail">
            <div className="project-article-rail-inner">
              <p className="project-article-rail-label">{ui.railLabel}</p>
              <ol className="project-article-toc">
                {articleSections.map((section) => (
                  <li
                    key={section.id}
                    className={activeSection === section.id ? 'is-active' : ''}
                  >
                    <button
                      type="button"
                      onClick={() => handleTocClick(section.id)}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ol>
              {project.meta ? (
                <p className="project-article-rail-note">{project.meta}</p>
              ) : null}
            </div>
          </aside>

          <div className="project-article-content">
            <section
              id="overview"
              ref={setSectionRef('overview')}
              className="project-article-section reveal"
            >
              <p className="eyebrow">{overviewSection.eyebrow}</p>
              <h2>{overviewSection.title}</h2>
              <p className="project-article-lede">{project.summary}</p>
              {project.overviewParagraphs?.length ? (
                <div className="project-article-paragraph-stack">
                  {project.overviewParagraphs.map((paragraph) => (
                    <p key={paragraph} className="project-article-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <ul className="project-article-list">
                  {project.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>

            <section
              id="architecture"
              ref={setSectionRef('architecture')}
              className="project-article-section reveal reveal-delay"
            >
              <p className="eyebrow">{architectureSection.eyebrow}</p>
              <h2>{architectureSection.title}</h2>
              <p className="project-article-copy">{project.flowSection?.text}</p>
              {project.architectureParagraphs?.length ? (
                <div className="project-article-paragraph-stack">
                  {project.architectureParagraphs.map((paragraph) => (
                    <p key={paragraph} className="project-article-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
              {project.flowSection?.showDiagram ? (
                <div className="project-article-figure-shell">
                  <LakehouseDiagram />
                </div>
              ) : null}
            </section>

            {project.evidenceSection ? (
              <section
                id="evidence"
                ref={setSectionRef('evidence')}
                className="project-article-section reveal reveal-delay-2"
              >
                <p className="eyebrow">{project.evidenceSection.eyebrow}</p>
                <h2>{project.evidenceSection.title}</h2>
                {project.evidenceSection.intro ? (
                  <p className="project-article-copy">
                    {project.evidenceSection.intro}
                  </p>
                ) : null}
                {project.evidenceSection.paragraphs?.length ? (
                  <div className="project-article-paragraph-stack">
                    {project.evidenceSection.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="project-article-copy">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                {project.evidenceSection.figure ? (
                  <figure className="project-article-figure">
                    <img
                      className={project.evidenceSection.figure.className}
                      src={project.evidenceSection.figure.src}
                      alt={project.evidenceSection.figure.alt}
                      loading="lazy"
                    />
                    <figcaption>{project.evidenceSection.figure.caption}</figcaption>
                  </figure>
                ) : null}
              </section>
            ) : null}

            <section
              id="decisions"
              ref={setSectionRef('decisions')}
              className="project-article-section reveal"
            >
              <p className="eyebrow">{decisionsSection.eyebrow}</p>
              <h2>{decisionsSection.title}</h2>
              {project.decisionParagraphs?.length ? (
                <div className="project-article-paragraph-stack">
                  {project.decisionParagraphs.map((paragraph) => (
                    <p key={paragraph} className="project-article-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="project-article-decision-grid">
                  {project.breakdownCards.map((card, index) => (
                    <article key={card.title} className="project-article-decision-card">
                      <p className="project-article-step">0{index + 1}</p>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section
              id="next"
              ref={setSectionRef('next')}
              className="project-article-section reveal"
            >
              <p className="eyebrow">{nextSection.eyebrow}</p>
              <h2>{nextSection.title}</h2>
              {nextSection.intro ? (
                <p className="project-article-copy">{nextSection.intro}</p>
              ) : null}
              {project.nextParagraphs?.length ? (
                <div className="project-article-paragraph-stack">
                  {project.nextParagraphs.map((paragraph) => (
                    <p key={paragraph} className="project-article-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="project-article-recruiter-grid">
                  {nextSection.cards.map((item) => (
                    <article key={item.title} className="project-article-recruiter-card">
                      <p className="project-article-label">{item.label}</p>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </article>
      <ContactLinks />
    </div>
  );
}
