export const supportingProjects = [
  {
    slug: 'book-recommendation-project',
    title: 'Book Recommendation Project',
    ui: {
      railLabel: 'On This Page',
    },
    heroSection: {
      eyebrow: 'Recommendation Case Study',
      kicker: 'Recommendation Design',
    },
    sections: {
      overview: {
        navLabel: 'Overview',
        eyebrow: 'Overview',
        title: 'What this recommendation project is trying to prove',
      },
      architecture: {
        navLabel: 'Approach',
        eyebrow: 'Approach',
        title: 'Features before ranking',
      },
      decisions: {
        navLabel: 'Decision Readout',
        eyebrow: 'Decision Readout',
        title: 'How to interpret the recommendation design',
      },
      next: {
        navLabel: 'Next Steps',
        eyebrow: 'What To Add Next',
        title: 'What would strengthen this recommendation case study',
        intro:
          'The strongest next additions are the ones that make feature ownership, ranking evaluation, and measurable impact more explicit.',
        cards: [
          {
            label: 'Ownership',
            title: 'What you personally owned',
            text: 'Add the pieces you drove end-to-end so the project reads as your recommendation work, not just a team outcome.',
          },
          {
            label: 'Scale',
            title: 'What constraints made it real',
            text: 'Add dataset size, candidate volume, latency targets, or offline-evaluation scope so the recommendation problem feels concrete.',
          },
          {
            label: 'Outcome',
            title: 'What changed because of it',
            text: 'Add ranking quality metrics, relevance improvements, or user-facing impact so the project shows measurable decision value.',
          },
          {
            label: 'Decision',
            title: 'Why this feature and ranking split mattered',
            text: 'Add the tradeoff behind your feature design and ranking choices so the architecture reads as intentional rather than generic.',
          },
        ],
      },
    },
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
  },
  {
    slug: 'streaming-reliability-study',
    title: 'Streaming Reliability Study',
    ui: {
      railLabel: 'On This Page',
    },
    heroSection: {
      eyebrow: 'Streaming Case Study',
      kicker: 'Reliability Lens',
    },
    sections: {
      overview: {
        navLabel: 'Overview',
        eyebrow: 'Overview',
        title: 'What this reliability study is really about',
      },
      architecture: {
        navLabel: 'Approach',
        eyebrow: 'Approach',
        title: 'Reliability under real conditions',
      },
      decisions: {
        navLabel: 'Decision Readout',
        eyebrow: 'Decision Readout',
        title: 'What the reliability work demonstrates',
      },
      next: {
        navLabel: 'Next Steps',
        eyebrow: 'What To Add Next',
        title: 'What would make the reliability story more defensible',
        intro:
          'The next improvements should make failure behavior easier to quantify, compare across scenarios, and defend with stronger runtime evidence.',
        cards: [
          {
            label: 'Ownership',
            title: 'What you designed directly',
            text: 'Add the verifiers, experiments, or failure analyses you personally built so the reliability work is clearly attributable.',
          },
          {
            label: 'Scale',
            title: 'What operational pressure looked like',
            text: 'Add arrival skew, lateness profiles, throughput assumptions, or SLA thresholds so the failure modes feel production-shaped.',
          },
          {
            label: 'Outcome',
            title: 'What the study changed',
            text: 'Add how the work improved confidence, reduced ambiguity, or changed watermark and observability decisions downstream.',
          },
          {
            label: 'Decision',
            title: 'Why the reliability lens mattered',
            text: 'Add the key correctness tradeoff you surfaced so the study reads as engineering judgment, not just testing activity.',
          },
        ],
      },
    },
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
  },
  {
    slug: 'prior-design-and-product-work',
    title: 'Prior Design and Product Work',
    ui: {
      railLabel: 'On This Page',
    },
    heroSection: {
      eyebrow: 'Supporting Case Study',
      kicker: 'Product and Systems Thinking',
    },
    sections: {
      overview: {
        navLabel: 'Overview',
        eyebrow: 'Overview',
        title: 'Why this background still matters',
      },
      architecture: {
        navLabel: 'Approach',
        eyebrow: 'Approach',
        title: 'Product sense as engineering context',
      },
      decisions: {
        navLabel: 'Decision Readout',
        eyebrow: 'Decision Readout',
        title: 'How this supporting work should be read',
      },
      next: {
        navLabel: 'Next Steps',
        eyebrow: 'What To Add Next',
        title: 'What would make this supporting work read more strongly',
        intro:
          'This section is most useful when it ties earlier product-facing work directly to later engineering judgment, communication, and stakeholder impact.',
        cards: [
          {
            label: 'Ownership',
            title: 'What you personally contributed',
            text: 'Add the decisions, artifacts, or cross-functional work you owned so the supporting experience has clear authorship.',
          },
          {
            label: 'Context',
            title: 'What made the work consequential',
            text: 'Add the business or user stakes so the product-facing experience reads as substantive, not generic background.',
          },
          {
            label: 'Transfer',
            title: 'How it shapes your engineering now',
            text: 'Add direct examples of how this background improved your later system design, communication, or prioritization.',
          },
          {
            label: 'Decision',
            title: 'Why it belongs in the portfolio',
            text: 'Add the connective logic that makes this supporting work strengthen your engineering story instead of distracting from it.',
          },
        ],
      },
    },
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
  },
];
