import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ContactLinks } from '../components/ContactLinks';
import { LakehouseDiagram } from '../components/LakehouseDiagram';
import { projectBySlug } from '../data/portfolio';

const airflowDagImageSrc = `${import.meta.env.BASE_URL}airflow-batch-publish-dag.png`;

const recruiterPrompts = [
  {
    label: 'Ownership',
    title: 'What you personally owned',
    text: 'Add the parts you drove yourself end-to-end so recruiters can separate team scope from your direct contribution.',
  },
  {
    label: 'Scale',
    title: 'What constraints made it real',
    text: 'Add data volume, latency expectations, user count, or system complexity so the project feels production-minded rather than academic.',
  },
  {
    label: 'Outcome',
    title: 'What changed because of it',
    text: 'Add measurable results, quality improvements, faster analysis, or reliability gains so the work reads as impact, not activity.',
  },
  {
    label: 'Decision',
    title: 'Why your design choices mattered',
    text: 'Add the key tradeoff you made and why that choice was correct for the problem, timeline, or downstream consumer.',
  },
];

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? projectBySlug[slug] : null;
  const isLakehouseProject = slug === 'short-video-hybrid-analytics-lakehouse';
  const sectionRefs = useRef({});
  const articleSections = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture', label: 'Architecture' },
      ...(isLakehouseProject ? [{ id: 'evidence', label: 'Evidence' }] : []),
      { id: 'decisions', label: 'Decision Readout' },
      { id: 'next', label: 'What To Add Next' },
    ],
    [isLakehouseProject],
  );
  const sectionIds = useMemo(() => articleSections.map((section) => section.id), [articleSections]);
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'overview');

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

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
    const targetTop = window.scrollY + sectionNode.getBoundingClientRect().top - scrollOffset;
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
          <p className="eyebrow">Technical Case Study</p>
          <p className="project-article-kicker">{project.flowSection?.eyebrow ?? 'Project Focus'}</p>
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
              <p className="project-article-rail-label">On This Page</p>
              <ol className="project-article-toc">
                {articleSections.map((section) => (
                  <li key={section.id} className={activeSection === section.id ? 'is-active' : ''}>
                    <button type="button" onClick={() => handleTocClick(section.id)}>
                      {section.label}
                    </button>
                  </li>
                ))}
              </ol>
              {project.meta ? <p className="project-article-rail-note">{project.meta}</p> : null}
            </div>
          </aside>

          <div className="project-article-content">
            <section id="overview" ref={setSectionRef('overview')} className="project-article-section reveal">
              <p className="eyebrow">Overview</p>
              <h2>The headline version</h2>
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
              <p className="eyebrow">{project.flowSection?.eyebrow ?? 'Approach'}</p>
              <h2>{project.flowSection?.title ?? 'Project Focus'}</h2>
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

            {isLakehouseProject ? (
              <section
                id="evidence"
                ref={setSectionRef('evidence')}
                className="project-article-section reveal reveal-delay-2"
              >
                <p className="eyebrow">Execution Evidence</p>
                <h2>Airflow DAG Run Snapshot</h2>
                <p className="project-article-copy">
                  Successful `batch_publish_daily` run with branch creation, model builds,
                  semantic quality checks, and publish evidence tasks.
                </p>
                {project.evidenceParagraphs?.length ? (
                  <div className="project-article-paragraph-stack">
                    {project.evidenceParagraphs.map((paragraph) => (
                      <p key={paragraph} className="project-article-copy">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                <figure className="project-article-figure">
                  <img
                    className="lakehouse-evidence-image"
                    src={airflowDagImageSrc}
                    alt="Airflow graph view for batch_publish_daily DAG run with successful tasks"
                    loading="lazy"
                  />
                  <figcaption>
                    DAG execution confirms orchestration, quality checks, and publish signaling in one production flow.
                  </figcaption>
                </figure>
              </section>
            ) : null}

            <section id="decisions" ref={setSectionRef('decisions')} className="project-article-section reveal">
              <p className="eyebrow">Decision Readout</p>
              <h2>How the system should be interpreted</h2>
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

            <section id="next" ref={setSectionRef('next')} className="project-article-section reveal">
              <p className="eyebrow">What To Add Next</p>
              <h2>{project.nextSectionTitle ?? 'The missing details recruiters actually look for'}</h2>
              <p className="project-article-copy">
                These are the details that usually decide whether a project reads as resume decoration or as
                credible engineering work.
              </p>
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
                  {recruiterPrompts.map((item) => (
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
