export const siteMeta = {
  name: 'Michael Chen',
  subtitle: 'Data Engineering, Analytics, and Projects',
  role: 'DATA ENGINEER WITH 2+ YEARS IN PRODUCT & E-COMMERCE ANALYTICS',
  heroEyebrow: 'Actively Seeking New Grad / Entry Level Opportunities',
  heroText:
    'I build data platforms that turn data into reliable, analytics and ML-ready datasets.',
  heroSupport:
    'My work focuses on data modeling, transformations, and data quality, with hands-on experience in AWS and Google Cloud.',
};

export const skillSet = [
  'Python',
  'SQL',
  'Data Modeling',
  'Spark',
  'dbt',
  'Kafka',
  'Airflow',
  'Google Cloud',
  'AWS',
];

export const contactLinks = [
  {
    label: 'GitHub',
    sublabel: 'Code and repositories',
    href: 'https://github.com/MichaelChenGithub',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    sublabel: 'Experience and profile',
    href: 'https://www.linkedin.com/in/yongshenchen/',
    icon: 'linkedin',
  },
  {
    label: 'Resume',
    sublabel: 'Download PDF',
    href: '/Michael_DE.pdf',
    icon: 'resume',
  },
  {
    label: 'Medium',
    sublabel: 'Writing and notes',
    href: 'https://medium.com/@0429shen',
    icon: 'medium',
  },
];

export const lakehouseProject = {
  slug: 'short-video-hybrid-analytics-lakehouse',
  title: 'Short Video Hybrid Analytics Lakehouse',
  summary:
    'A contract-driven platform that turns raw short-video streams and CDC updates into governed realtime decisions and batch analytics outputs.',
  bullets: [],
  intro:
    'I built this project as a contract-driven data platform for short-video operations across realtime decisioning and batch analytics. The focus was not only speed, but creating governed, traceable, and consumer-ready outputs that downstream teams can trust without reverse-engineering logic.',
  proof: [
    'Deterministic generator and bounded-run artifacts make behavior reproducible across scenarios.',
    'Realtime signoff verifies freshness, latency proxy, contract validity, and operational health.',
    'Batch publish readiness is quality-gated through semantic checks and manifest contracts.',
  ],
  detailCards: [
    {
      label: 'Data Domain',
      text: 'Short-video content events, CDC updates, retention and engagement analytics, and sessionized behavior.',
    },
    {
      label: 'Core Stack',
      text: 'Kafka, Spark Structured Streaming, Spark batch, Airflow, dbt, Iceberg branches, and Trino semantic views.',
    },
    {
      label: 'Primary Signal',
      text: 'Deterministic, contract-backed, and operationally explainable data platform design.',
    },
  ],
  overviewParagraphs: [
    'On the realtime side, the platform classifies videos into BOOST, REVIEW, or RESCUE outcomes based on momentum and quality gates. On the batch side, it publishes daily retention, engagement, and sessionization outputs through semantic serving interfaces.',
    'The architecture intentionally separates ingestion, transformation, dimensional modeling, and serving contracts so each layer has a clear responsibility. That separation made the system easier to test, easier to reason about, and easier to defend as production-minded engineering work.',
    'The delivered path is generator to Kafka to Spark streaming and batch jobs to Iceberg tables to Trino semantic views, with signoff artifacts and quality gates proving publish readiness.',
  ],
  flowSection: {
    eyebrow: 'Flow',
    title: 'Architecture Overview',
    text: 'The project combines governed ingestion, a low-latency realtime path, and a contract-driven batch publishing path.',
    showDiagram: true,
  },
  architectureParagraphs: [
    'I used explicit Bronze, Silver, and Gold boundaries. Bronze retains immutable ingestion history and quarantine sinks, Silver holds conformed reusable assets, and Gold publishes serving-grade metrics for both realtime and daily analytics.',
    'Dimension strategy is split by workload: Type 1 current-state dimensions for low-latency realtime enrichment, and SCD Type 2 dimensions for historically correct batch attribution.',
    'Streaming compute runs as isolated jobs for content aggregation and CDC upsert, while batch dependencies and publish readiness are expressed in explicit sequence with quality gates before manifest publication.',
    'Semantic serving in Trino centralizes business logic so dashboards do not re-implement formulas, thresholds, and governance rules in ad hoc SQL.',
  ],
  evidenceParagraphs: [
    'Realtime runtime signoff passed on March 20, 2026, with verifier parseability, table readiness, contract validity, freshness, and latency proxy checks all green.',
    'The generator contract stores deterministic IDs, bounded-run configuration, scenario mixes, expected actions, and late-event profiles, enabling reproducible regression behavior.',
    'Batch quality evidence is defined through final contracts, orchestration publish rules, dbt semantic checks, and serving-layer test coverage.',
  ],
  breakdownCards: [
    {
      title: 'Medallion Boundaries',
      text: 'I kept Bronze, Silver, and Gold responsibilities narrow so replayability, conformance, and metric publication are testable as separate contracts.',
    },
    {
      title: 'Operational Safety',
      text: 'Invalid records are quarantined explicitly, and batch publish runs on isolated Iceberg branches with validation before promotion.',
    },
    {
      title: 'Workload-Specific Modeling',
      text: 'Realtime uses Type 1 dimensions for low-latency joins; batch uses SCD Type 2 for historical correctness and defensible analytics.',
    },
  ],
  decisionParagraphs: [
    'A single-table design would have obscured failures and mixed concerns. By separating layers, contracts and verifiers can evaluate each stage directly rather than inferring quality from final outputs.',
    'Quarantine-first handling for invalid payloads made quality failures observable without contaminating serving datasets, which improved both debugging and trust.',
    'Iceberg WAP-style branch workflows and dbt quality gates moved publish logic from hope-based execution to explicit validation and controlled promotion.',
    'Centralizing metric semantics in serving views reduced formula drift and kept BI consumers on governed interfaces with traceability fields intact.',
  ],
  nextParagraphs: [
    'Next, operationalize the decision preview into an execution queue with downstream consumers, execution state, and closed-loop feedback.',
    'Add T+1 reconciliation and release controls so freshness and quality states can automatically gate downstream release decisions.',
    'Expand observability around late-event and watermark behavior, then extend baseline logic beyond global thresholds into cohort-aware policies with explicit fallbacks.',
    'Capture cloud benchmark runtime artifacts with the same rigor used for realtime signoff to support scale claims with execution evidence.',
  ],
  nextSectionTitle: 'What would make this platform even more credible',
};

export const supportingProjects = [
  {
    slug: 'book-recommendation-project',
    title: 'Book Recommendation Project',
    summary:
      'A recommendation project focused on turning user behavior and book metadata into relevant, explainable suggestions.',
    bullets: [
      'Built user-item features from reading behavior, preferences, and book attributes',
      'Designed recommendation logic to improve relevance while keeping outputs interpretable',
      'Used the project to show applied ML thinking, data preparation, and ranking judgment',
    ],
    intro:
      'Built to show how I structure recommendation data, design ranking signals, and turn user behavior into useful book suggestions.',
    proof: [
      'Turned raw user-book interactions into features that support better ranking decisions',
      'Balanced recommendation quality with transparency so suggestions remain understandable',
      'Used the project to demonstrate practical machine learning and data modeling together',
    ],
    detailCards: [
      {
        label: 'Focus',
        text: 'Recommendation features, ranking logic, and user-item modeling.',
      },
      {
        label: 'Primary Signal',
        text: 'Ability to turn behavioral data into relevant, explainable recommendation outputs.',
      },
      {
        label: 'Best Use',
        text: 'Best used to show applied recommendation-system thinking, feature design, and ranking judgment.',
      },
    ],
    flowSection: {
      eyebrow: 'Approach',
      title: 'Features Before Ranking',
      text: 'This project focuses on shaping reliable user and book features before any recommendation or ranking logic is applied.',
      showDiagram: false,
    },
    breakdownCards: [
      {
        title: 'User-Item Signals',
        text: 'The project starts by modeling the interaction patterns that indicate affinity, such as reading history, preferences, and item similarity.',
      },
      {
        title: 'Ranking Readiness',
        text: 'Features are prepared so recommendation scores are consistent, comparable, and useful for downstream ranking decisions.',
      },
      {
        title: 'Why It Matters',
        text: 'The strongest signal here is the ability to connect data preparation, feature engineering, and recommendation quality in one coherent system.',
      },
    ],
    meta: 'Best used to prove recommendation-system and feature-engineering rigor.',
    nextSectionTitle: 'What would strengthen this recommendation case study',
  },
  {
    slug: 'streaming-reliability-study',
    title: 'Streaming Reliability Study',
    summary:
      'A narrower system built to showcase event-time semantics, lag, watermarks, observability, and operational failure modes.',
    bullets: [
      'Explored how late events, lag, and watermark choices affect downstream correctness',
      'Focused on observability and verification rather than only happy-path pipeline execution',
      'Used the project to reason about failure modes before they reach analytical consumers',
    ],
    intro:
      'Built to study how realtime pipelines behave under imperfect delivery conditions and operational pressure.',
    proof: [
      'Worked through event-time semantics, lag-prone delivery, and watermark tradeoffs',
      'Added scenario-aware thinking around verification, observability, and operational safety',
      'Used the project to show understanding of streaming reliability beyond surface-level tooling',
    ],
    detailCards: [
      {
        label: 'Focus',
        text: 'Event-time behavior, late data, watermarking, observability, and verifier design.',
      },
      {
        label: 'Primary Signal',
        text: 'Ability to reason about how realtime systems fail, not just how they work on ideal inputs.',
      },
      {
        label: 'Best Use',
        text: 'Best used to show that I understand operational correctness and failure modes in streaming data systems.',
      },
    ],
    flowSection: {
      eyebrow: 'Approach',
      title: 'Reliability Under Real Conditions',
      text: 'The goal here is to surface edge cases around lateness, ordering, and observability so the pipeline behavior is understandable under stress.',
      showDiagram: false,
    },
    breakdownCards: [
      {
        title: 'Late Data Handling',
        text: 'The project examines how late-arriving records should be interpreted, gated, or dropped depending on correctness guarantees.',
      },
      {
        title: 'Observability',
        text: 'Reliability is treated as something measurable, with explicit attention to what should be monitored and what failure signals matter.',
      },
      {
        title: 'Why It Matters',
        text: 'This project is useful because it proves I can think about realtime systems as operational systems, not just as code that runs.',
      },
    ],
    meta: 'Best used to prove you understand real-time constraints.',
    nextSectionTitle: 'What would make the reliability story more defensible',
  },
  {
    slug: 'prior-design-and-product-work',
    title: 'Prior Design and Product Work',
    summary:
      'Earlier work that sharpened product sense, communication, and systems thinking before I focused fully on data engineering.',
    bullets: [
      'Learned to frame ambiguous problems around users, context, and business outcomes',
      'Built stronger communication habits for presenting tradeoffs to non-engineering stakeholders',
      'Carried that product sense into how I now think about useful, decision-ready data systems',
    ],
    intro:
      'Included as supporting context to show how product sense and communication became part of my engineering approach.',
    proof: [
      'Built stronger instincts for ambiguity, user needs, and practical decision-making',
      'Learned how to explain systems and tradeoffs clearly to different stakeholders',
      'Turned earlier product-facing work into a lasting advantage in analytics and data engineering contexts',
    ],
    detailCards: [
      {
        label: 'Focus',
        text: 'Product thinking, communication, stakeholder empathy, and systems framing.',
      },
      {
        label: 'Primary Signal',
        text: 'This work explains why I naturally think about data systems from the perspective of the people who use them.',
      },
      {
        label: 'Best Use',
        text: 'Best used as supporting context for product sense and communication, not as the main technical proof point.',
      },
    ],
    flowSection: {
      eyebrow: 'Approach',
      title: 'Product Sense as Engineering Context',
      text: 'The value of this work is that it shapes how I define useful outputs, communicate tradeoffs, and keep technical work tied to real user needs.',
      showDiagram: false,
    },
    breakdownCards: [
      {
        title: 'Problem Framing',
        text: 'This stage taught me how to break down ambiguous requests and make the real user or business question visible early.',
      },
      {
        title: 'Communication',
        text: 'It also improved how I explain structure, tradeoffs, and outcomes to people who are not thinking in purely technical terms.',
      },
      {
        title: 'Why It Matters',
        text: 'That product-facing foundation still shapes how I design data systems today: not as isolated pipelines, but as tools that help people make decisions.',
      },
    ],
    meta: 'Best used as supporting context, not the main story.',
    nextSectionTitle: 'What would make this supporting work read more strongly',
  },
];

export const allProjects = [lakehouseProject, ...supportingProjects];

export const projectBySlug = Object.fromEntries(
  allProjects.map((project) => [project.slug, project]),
);
