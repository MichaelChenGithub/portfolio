const withBase = (path) => `${import.meta.env.BASE_URL}${path}`;

export const lakehouseProject = {
  slug: 'short-video-hybrid-analytics-lakehouse',
  title: 'Short Video Hybrid Analytics Lakehouse',
  ui: {
    railLabel: 'On This Page',
  },
  heroSection: {
    eyebrow: 'Technical Case Study',
    kicker: 'Hybrid Data Platform',
  },
  sections: {
    overview: {
      navLabel: 'Overview',
      eyebrow: 'Overview',
      title: 'What the platform delivers',
    },
    architecture: {
      navLabel: 'Architecture',
      eyebrow: 'Architecture',
      title: 'How the system is structured',
    },
    decisions: {
      navLabel: 'Decision Readout',
      eyebrow: 'Decision Readout',
      title: 'Why these architecture choices hold up',
    },
    next: {
      navLabel: 'Next Steps',
      eyebrow: 'What To Add Next',
      title: 'What would make the platform more operational',
      intro:
        'The next layer of work is not about adding random features. It is about turning the current governed preview into a more operational, closed-loop platform.',
    },
  },
  summary:
    'A contract-driven lakehouse that turns raw short-video streams and CDC updates into governed realtime decisions, publish-ready batch analytics, and defensible serving interfaces.',
  bullets: [
    'Deterministic generator runs make end-to-end behavior reproducible.',
    'Realtime signoff proves freshness, latency proxy, and contract health.',
    'Batch publishing is quality-gated before promotion to canonical state.',
  ],
  intro:
    'I built this project as a contract-driven data platform for short-video operations across both realtime decisioning and batch analytics. The core problem was not just moving data quickly. It was turning raw event streams and CDC updates into governed, traceable, consumer-ready outputs without forcing downstream teams to reconstruct the logic themselves.',
  proof: [
    'Deterministic bounded-run generator artifacts store scenario mix, expected actions, and run configuration for repeatable validation.',
    'March 20, 2026 realtime signoff passed freshness, latency proxy, contract validity, verifier parseability, and operational health checks.',
    'Batch outputs are governed by semantic checks, publish manifests, and branch-based promotion rules rather than trust-based execution.',
  ],
  detailCards: [
    {
      label: 'Data Domain',
      text: 'Short-video content events, CDC updates, retention, engagement, and sessionized user behavior.',
    },
    {
      label: 'Core Stack',
      text: 'Kafka, Spark Structured Streaming, Spark batch, Iceberg, Airflow, dbt, and Trino semantic views.',
    },
    {
      label: 'Primary Signal',
      text: 'A deterministic, contract-backed, operationally explainable lakehouse with clear serving boundaries.',
    },
  ],
  overviewParagraphs: [
    'On the realtime side, the platform identifies three operational outcomes: BOOST for high-momentum, high-quality videos, REVIEW for high-momentum videos that fail quality gates, and RESCUE for strong new uploads that are under-exposed. On the batch side, it publishes daily retention, engagement, and sessionization outputs through governed semantic interfaces.',
    'The system is designed around deliberate separation: raw ingestion, transformation logic, dimensional modeling, and serving contracts each have a clear responsibility. That made the platform easier to reason about, easier to test, and easier to defend because each layer can be explained and verified on its own terms.',
    'The delivered path is generator to Kafka to Spark Structured Streaming and Spark batch to Iceberg tables to Trino semantic views, with signoff evidence and quality gates proving whether a run is actually ready for downstream use.',
    'The strongest part of the project is not that it computes metrics. It is that the platform is deterministic, contract-backed, and operationally explainable: I can trace a run from source configuration to table contract to serving logic to verifier output.',
  ],
  flowSection: {
    eyebrow: 'Flow',
    title: 'Architecture Overview',
    text: 'The platform combines governed ingestion, a low-latency realtime path, and a batch publishing path that only promotes validated outputs.',
    showDiagram: true,
  },
  architectureParagraphs: [
    'I used Bronze, Silver, and Gold boundaries with narrow responsibilities. Bronze is the immutable ingestion and quarantine layer for raw event history and invalid records, Silver is the conformance layer for reusable normalized assets, and Gold is the serving-grade layer for realtime facts and daily analytics outputs.',
    'Source simulation is treated as a governed interface rather than throwaway fixtures. The bounded-run generator emits deterministic IDs, explicit scenario mixes, invalid payload bursts, and late-arriving events so the system can be validated repeatedly instead of demoed once.',
    'Dimension strategy is split by workload on purpose. Realtime joins use a Type 1 current-state `dim_videos` snapshot for low-latency enrichment, while batch analytics uses SCD Type 2 dimensions so historical retention, engagement, and sessionization remain attributable to the correct historical row version.',
    'Streaming compute runs as two isolated Spark Structured Streaming jobs: one for content-event aggregation and one for CDC upsert. Batch compute follows an explicit dependency order from conformed events to sessions to daily outputs to dbt semantic gates to the publish manifest, so publish readiness is formalized rather than assumed.',
    'Semantic serving in Trino centralizes business logic in governed views so dashboards and analysts do not have to rebuild rolling windows, thresholds, and rule logic in ad hoc SQL.',
  ],
  evidenceSection: {
    navLabel: 'Evidence',
    eyebrow: 'Execution Evidence',
    title: 'Airflow DAG Run Snapshot',
    intro:
      'A successful `batch_publish_daily` run shows branch creation, model builds, semantic quality checks, and publish evidence tasks in one governed flow.',
    paragraphs: [
      'The clearest runtime proof is the realtime signoff artifact dated March 20, 2026, which records a final PASS. That run verifies parseable artifacts, table readiness, Gold contract validity, invalid-sink completeness, query health, checkpoint growth, freshness SLA, and latency proxy thresholds.',
      'The same signoff records observed system behavior rather than just design intent. The run captures a realtime freshness age of roughly 78 seconds on the CDC side and a latency proxy P95 of 154,000 ms, which turns the architecture into an observed system with measured behavior.',
      'The generator artifacts under `artifacts/generator_runs/` provide the second proof point. Each bounded run stores configuration, deterministic IDs, expected actions, scenario mixes, and late-event profiles so downstream behavior can be traced back to a reproducible source contract.',
      'Batch quality evidence is defined through final output contracts, orchestration publish rules, dbt semantic checks, serving SQL, and acceptance coverage. The claim here is deliberate engineering and governed publish readiness, not unsubstantiated scale benchmarking.',
    ],
    figure: {
      className: 'lakehouse-evidence-image',
      src: withBase('airflow-batch-publish-dag.png'),
      alt: 'Airflow graph view for batch_publish_daily DAG run with successful tasks',
      caption:
        'The DAG run confirms orchestration, quality checks, and publish signaling inside a single production-style batch flow.',
    },
  },
  breakdownCards: [
    {
      title: 'Medallion Boundaries',
      text: 'Bronze, Silver, and Gold each keep a narrow responsibility so replayability, conformance, and publish-ready metrics stay verifiable as separate contracts.',
    },
    {
      title: 'Operational Safety',
      text: 'Invalid records are quarantined explicitly, and batch publish runs on isolated Iceberg branches with validation before promotion.',
    },
    {
      title: 'Workload-Specific Modeling',
      text: 'Realtime uses Type 1 dimensions for low-latency joins, while batch uses SCD Type 2 for historical correctness and defensible analytics.',
    },
  ],
  decisionParagraphs: [
    'I used a Bronze to Silver to Gold design because one layer should not be responsible for ingestion history, cleanup, reusable conformance logic, and business-facing publication at the same time. Clear boundaries make every contract easier to test and every failure easier to locate.',
    'Invalid records are retained in explicit Bronze quarantine tables with source metadata, schema version, error code, and error reason. That makes quality failures observable, prevents bad records from contaminating facts and dimensions, and gives verifiers a direct operational surface to inspect.',
    'I deliberately used separate dimension strategies for different access patterns. Realtime enrichment needs the latest metadata with low join complexity, while historical analytics needs SCD Type 2 attribution so later metadata changes do not rewrite the past.',
    'Batch publish safety is handled with Iceberg WAP-style branch workflows: create a run-scoped branch, execute jobs against that branch, run dbt quality gates there, fast-forward canonical state only after validation passes, and clean up the branch afterward.',
    'dbt data-quality checks are treated as publish gates rather than nice-to-have tests. A daily slice is publish-ready only when the grain, required fields, domain rules, segmentation logic, and denominator-safe sanity checks all pass for the same data date.',
    'I centralized consumer logic in Trino semantic views because downstream teams should query governed interfaces, not rebuild formulas and thresholds in dashboard SQL. That keeps formulas defined once, reduces drift, and preserves traceability fields with the decision context.',
    'The deterministic generator is part of the architecture, not a demo convenience. Seeded execution, explicit scenario targets, and stored expected actions let the platform be regression-tested as a system instead of relying on hand-curated examples.',
  ],
  nextParagraphs: [
    'Operationalize the current recommendation preview into a real action queue with downstream consumers, execution state, and closed-loop feedback on what happened after a BOOST, REVIEW, or RESCUE recommendation.',
    'Add T+1 reconciliation and release controls so freshness, quality, and reconciliation status can actively gate release decisions instead of relying on manual interpretation of artifacts.',
    'Expand observability around late-event and watermark behavior, then extend baseline logic beyond global thresholds into cohort-aware policies with explicit fallback behavior.',
    'Capture cloud runtime benchmark artifacts with the same rigor already used for realtime signoff so future scale claims are supported by execution evidence rather than architecture diagrams alone.',
  ],
};
