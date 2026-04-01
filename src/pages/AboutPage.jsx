import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { ContactLinks } from '../components/ContactLinks';
import 'react-vertical-timeline-component/style.min.css';

const coreValues = [
  {
    title: 'Decision-first',
    text: 'Start from the question the data is supposed to answer.',
  },
  {
    title: 'Trust-focused',
    text: 'Reliable outputs matter more than busy pipelines.',
  },
  {
    title: 'End-to-end',
    text: 'Think from raw data all the way to downstream use.',
  },
];

const timelineEntries = [
  {
    period: '2024 - Present',
    title: 'CS Graduate Student, Virginia Tech',
    body: (
      <>
        <p>
          After working in industry, I chose to pursue a master&apos;s at{' '}
          <strong>Virginia Tech</strong> to deepen my engineering foundation
          before my next role.
        </p>
        <p>
          I have used this time intentionally to build systems that reflect how
          I think about <strong>analytics engineering</strong>, including{' '}
          <strong>streaming</strong>, <strong>batching</strong>,{' '}
          <strong>data modeling</strong>, and{' '}
          <strong>data reliability</strong>. The short-video lakehouse project
          is the clearest example, where I designed{' '}
          <strong>end-to-end data pipelines</strong> and{' '}
          <strong>analytics-ready serving</strong> as a unified system.
        </p>
        <p>
          In parallel, I have prepared for technical interviews through{' '}
          <strong>competitive programming</strong>, achieving a{' '}
          <strong>LeetCode Contest rating of 1900+</strong> (top 3%).
        </p>
        <p>
          Graduating in <strong>May 2026</strong>, I am actively seeking{' '}
          <strong>Data Engineer roles</strong>.
        </p>
      </>
    ),
    status: 'present',
  },
  {
    period: '2023 - 2024',
    title: 'Freelance / Contract Data Engineer',
    body: (
      <>
        <p>
          During my military service, I engaged with industry
          professionals through coffee chats, which clarified
          my goal to pursue <strong>graduate school</strong> and work on{' '}
          <strong>larger-scale systems</strong>. At the same time, I took on
          freelance projects.
        </p>
        <p>
          I worked with a startup to build a <strong>RAG-based chatbot</strong>
          , including a file management system and end-to-end{' '}
          retrieval and embedding pipelines{' '}
          using <strong>Spark</strong> for industrial clients with fragmented technical documentation.
        </p>
        <p>
          Working directly with clients shifted my perspective from{' '}
          <strong>implementing requirements</strong> to{' '}
          <strong>defining them</strong>, and strengthened my commitment to{' '}
          deep technical work.
        </p>
      </>
    ),
    status: 'past',
  },
  {
    period: '2022 - 2023',
    title: 'Data Engineer, Merkle',
    body: (
      <>
        <p>
          This was the most formative stage of my experience, where I worked
          closely with engineering teams, directors, and clients.
        </p>
        <p>
          I owned the data pipeline for the L&apos;Oréal e-commerce
          recommendation system, delivering an end-to-end cross-cloud
          pipeline across <strong>AWS</strong> and <strong>Google Cloud</strong>{' '}
          to support model development and A/B testing for{' '}
          MLE and Data Analyst.
        </p>
        <p>
          By building data pipelines with <strong>AWS Glue</strong> and{' '}
          <strong>BigQuery</strong> and designing a{' '}
          <strong>medallion architecture</strong> with layered data models and{' '}
          <strong>star schemas</strong>, I reduced data scan volume by{' '}
          <strong>80%</strong> and improved query performance by{' '}
          <strong>90%</strong>.
        </p>
        <p>
          I later left the role to fulfill mandatory military
          service.
        </p>
      </>
    ),
    status: 'past',
  },
  {
    period: '2022',
    title: 'Data Engineer Intern, Merkle',
    body: (
      <>
        <p>
          Following an organizational shift, I worked closely
          with our Data Team Director on <strong>data-driven precision
          marketing</strong> projects for <strong>FMCG</strong> clients.
        </p>
        <p>
          I primarily worked on <strong>Google Cloud</strong>, supporting data
          preparation and automating model workflows using{' '}
          <strong>BigQuery</strong>, <strong>Cloud Functions</strong>,{' '}
          <strong>Pub/Sub</strong>, and <strong>Vertex AI Pipelines</strong>{' '}
          in <strong>Python</strong> and <strong>SQL</strong>.
        </p>
        <p>
          This experience confirmed my ability to deliver impact in a{' '}
          <strong>production environment</strong> and reinforced my decision to
          continue <strong>full-time in industry</strong>.
        </p>
      </>
    ),
    status: 'past',
  },
  {
    period: '2020 - 2022',
    title: 'Research Assistant, Soochow University',
    body: (
      <>
        <p>
          My starting point was in <strong>ML research</strong>. I collaborated
          with{' '}
          <a href="https://www.linkedin.com/in/camillehu/" target="_blank" rel="noreferrer">
            Prof. Hu
          </a>{' '}
          on a joint project with{' '}
          <a href="https://www.wpgholdings.com/" target="_blank" rel="noreferrer">
            WPG Holdings
          </a>
          , conducting experiments on recommendation system models.
        </p>
        <p>
          I built data processing pipelines using <strong>Python</strong>,{' '}
          <strong>Pandas</strong>, and <strong>MLflow</strong> to support over{' '}
          <strong>30 model experiments</strong>.
        </p>
        <p>
          This experience sparked my interest in using data to drive{' '}
          <strong>real business impact</strong> and led me to pursue a{' '}
          <strong>career in industry</strong>.
        </p>
      </>
    ),
    status: 'past',
  },
];

const timelineStyles = {
  contentStyle: {
    background: 'transparent',
    boxShadow: 'none',
    padding: '0 0 0 28px',
  },
  contentArrowStyle: {
    borderRight: '7px solid transparent',
  },
};

export function AboutPage() {
  return (
    <div className="page-layout">
      <section className="page-intro reveal about-page-intro">
        <p className="eyebrow">About</p>
        <h1>My Journey and Decisions.</h1>
        <p className="hero-text intro-width">
          The record of my journey, the decisions I made, and why I made them.
        </p>
      </section>

      <section className="about-page-timeline reveal">
        <VerticalTimeline
          animate={false}
          layout="1-column-left"
          lineColor="rgba(23, 20, 17, 0.12)"
          className="about-vertical-timeline"
        >
          {timelineEntries.map((entry) => (
            <VerticalTimelineElement
              key={entry.title}
              className={`about-vertical-element about-vertical-element-${entry.status}`}
              iconClassName="about-vertical-icon-shell"
              iconStyle={{
                background: entry.status === 'present' ? '#2ea85a' : '#ff6159',
              }}
              icon={<span className="about-vertical-icon-core" />}
              visible
              {...timelineStyles}
            >
              <p className="about-vertical-inline-date">{entry.period}</p>
              <h2>{entry.title}</h2>
              {entry.body ?? <p>{entry.text}</p>}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </section>

      <section className="about-core-values">
        <div className="section-heading reveal">
          <p className="eyebrow">Principles</p>
          <h2>My Dev Gold Rules</h2>
        </div>
        <div className="about-core-values-grid">
          {coreValues.map((item, index) => (
            <article
              key={item.title}
              className={`about-core-card reveal${
                index === 1 ? ' reveal-delay' : index === 2 ? ' reveal-delay-2' : ''
              }`}
            >
              <p className="signal-index">0{index + 1}</p>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <ContactLinks />
    </div>
  );
}
