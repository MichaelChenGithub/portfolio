import { lakehouseProject } from '../data/portfolio';
import { LakehouseDiagram } from '../components/LakehouseDiagram';

export function LakehouseProjectPage() {
const runtimeChecks = [
  'all required verifier artifacts were parseable',
  'upstream verifiers passed',
  'key tables were present and run-scoped',
  'the Gold contract was valid',
  'invalid sinks had required fields populated',
  'query health was active and exception-free',
  'checkpoint directories grew during the run window',
  'freshness SLA passed',
  'latency proxy P95 stayed below threshold',
];

const dependencyOrder = [
  'lakehouse.silver.events_conformed',
  'lakehouse.silver.user_activity_sessions_30m',
  'lakehouse.gold.batch_retention_daily',
  'lakehouse.gold.batch_engagement_daily',
  'lakehouse.gold.batch_sessionization_daily',
  'dbt semantic quality gates',
  'lakehouse.gold.batch_publish_manifest',
];

const nextSteps = [
  'Operationalize action execution with a downstream action queue, execution state, and feedback loops.',
  'Add T+1 reconciliation and release controls so freshness and quality states can actively block or warn on release decisions.',
  'Expand observability around dropped-by-watermark behavior and late-data impact outside acceptance runs.',
  'Extend baseline logic beyond global thresholds into cohort-aware baselines with explicit fallback rules.',
  'Capture cloud benchmark runtime artifacts with the same rigor already used for realtime signoff.',
];

function FactList() {
  return (
    <aside className="lakehouse-showcase-facts">
      <p className="detail-label">At a glance</p>
      <dl className="lakehouse-facts-list">
        {lakehouseProject.detailCards.map((card) => (
          <div key={card.label} className="lakehouse-fact">
            <dt>{card.label}</dt>
            <dd>{card.text}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function LakehouseProjectPage() {
  return (
    <article className="lakehouse-showcase lakehouse-blog reveal">
      <header className="lakehouse-showcase-hero lakehouse-blog-hero">
        <div className="lakehouse-showcase-intro lakehouse-blog-intro">
          <p className="eyebrow">Technical Blog</p>
          <h1>{lakehouseProject.title}</h1>
          <p className="lakehouse-showcase-dek">
            I built this project as a contract-driven data platform for short-video
            operations across both realtime decisioning and batch analytics. The
            core problem was not just moving data fast. It was creating a system
            that could turn raw event streams and CDC updates into governed,
            traceable, consumer-ready outputs without forcing downstream teams to
            reverse-engineer the logic themselves.
          </p>
        </div>

        <FactList />
      </header>

      <section className="lakehouse-showcase-section">
        <div className="lakehouse-blog-chapter">
          <p className="eyebrow">Overview</p>
          <h2>Why I built it this way</h2>
          <div className="lakehouse-showcase-prose">
            <p>
              On the realtime side, the platform identifies three operational
              outcomes: <strong>BOOST</strong> for high-momentum, high-quality
              videos, <strong>REVIEW</strong> for high-momentum videos that fail
              quality gates, and <strong>RESCUE</strong> for high-quality new
              uploads that are under-exposed. On the batch side, the platform
              publishes daily analytics outputs for retention, engagement, and
              sessionization. Those outputs are exposed through semantic serving
              interfaces and quality-gated before they are considered
              publish-ready.
            </p>
            <p>
              The system is designed around a simple principle: raw ingestion,
              transformation logic, dimensional modeling, and serving contracts
              should be separated on purpose. That separation made the platform
              easier to reason about, easier to test, and easier to defend
              because every layer has a clear responsibility.
            </p>
            <p>
              At a high level, the delivered data path is
              <span className="lakehouse-inline-path">
                {' '}
                generator to Kafka to Spark Structured Streaming and Spark batch
                to Iceberg tables to Trino semantic views to signoff evidence and
                BI consumption
              </span>
              . The strongest part of the project is not that it computes
              metrics. It is that the platform is deterministic, contract-backed,
              and operationally explainable.
            </p>
          </div>
        </div>
      </section>

      <section className="lakehouse-showcase-section">
        <div className="lakehouse-blog-chapter">
          <p className="eyebrow">Architecture</p>
          <h2>How the system is structured</h2>
          <div className="lakehouse-showcase-prose">
            <p>
              I structured the platform as a lakehouse with explicit
              medallion-style boundaries, separate dimension patterns for
              realtime versus historical analytics, and semantic serving layers
              for downstream reuse. That split was necessary because the system
              serves two different workloads with different correctness
              requirements.
            </p>
          </div>
        </div>

        <div className="lakehouse-showcase-diagram">
          <LakehouseDiagram />
        </div>

        <div className="lakehouse-blog-body">
          <section className="lakehouse-blog-block">
            <h3>Ingestion and source simulation</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                The platform ingests two main streams: <code>content_events</code>{' '}
                and <code>cdc.content.videos</code>. Instead of using ad hoc
                fixtures, I treated source simulation as a governed interface.
                The bounded-run generator emits deterministic content events and
                CDC updates with fixed seeds, stable IDs, explicit scenario
                mixes, and expected actions.
              </p>
              <p>
                That matters because it turns system validation into a repeatable
                engineering workflow instead of a one-off demo. The generator
                also models invalid payload bursts and late-arriving events. That
                gave me a way to test not only happy-path output correctness, but
                also quarantine behavior, watermark handling, and operational
                signoff gates.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>Bronze, Silver, and Gold</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                I used a Bronze to Silver to Gold design so each layer had a
                narrow purpose. Bronze is the immutable ingestion and quarantine
                layer. It stores raw event history, raw CDC history, and
                invalid-record sinks. Silver is the conformance and reuse layer.
                In this project, Silver holds normalized event outputs and
                reusable sessionized activity assets such as{' '}
                <code>events_conformed</code> and{' '}
                <code>user_activity_sessions_30m</code>. Gold is the
                serving-grade metric layer for both realtime and batch outputs.
              </p>
              <p>
                This layering was important because realtime scoring needs
                low-latency facts with stable formulas and predictable freshness,
                while batch analytics needs daily slices, dimensional history,
                and quality-gated publishing. The medallion design let me
                support both without collapsing them into one overloaded model.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>Dimension strategy</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                I deliberately used two different dimension patterns. For
                realtime joins, I used current-state dimensions because the
                serving path needs the latest category, region, upload time, and
                status for low-latency enrichment. That is why{' '}
                <code>dim_videos</code> is maintained as a Type 1 snapshot.
              </p>
              <p>
                For batch analytics, I used SCD Type 2 dimensions. Historical
                reporting should not be rewritten by later metadata changes, so
                batch attribution relies on <code>dim_users_scd2</code> and{' '}
                <code>dim_videos_scd2</code>. This split solved a common data
                engineering tension: the access pattern that is right for
                realtime enrichment is usually not the access pattern that is
                right for historical analytics.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>Streaming and batch compute</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                The realtime path runs as two separate Spark Structured Streaming
                jobs: <code>spark_rt_content_events_aggregator</code> and{' '}
                <code>spark_rt_video_cdc_upsert</code>. I kept them isolated for
                failure containment and operational clarity. The content job
                writes raw events, invalid content rows, and one-minute
                aggregated metric facts. The CDC job writes the current snapshot
                dimension, valid CDC bronze history, and invalid CDC rows.
              </p>
              <p>
                The batch path builds on top of the conformed and dimensional
                layers. Its canonical dependency order is explicit:
              </p>
            </div>
            <ol className="lakehouse-showcase-sequence">
              {dependencyOrder.map((item) => (
                <li key={item}>
                  <code>{item}</code>
                </li>
              ))}
            </ol>
            <div className="lakehouse-showcase-prose">
              <p>
                That sequence makes the publish contract explicit rather than
                implicit. A dataset is not publish-ready just because SQL ran. It
                is publish-ready only when upstream jobs succeed, quality gates
                pass, and the manifest records a valid publish for the same{' '}
                <code>data_date</code>.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>Semantic serving</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                I used Trino semantic views to expose stable consumer-facing
                interfaces. For realtime, the semantic layer exposes{' '}
                <code>lakehouse.serving.v_rt_video_metrics_30m_1m</code> and{' '}
                <code>lakehouse.serving.v_rt_video_decision_context_30m_1m</code>.
                For batch, the semantic layer exposes serving views for
                retention, engagement, and sessionization.
              </p>
              <p>
                This was a deliberate design choice. I did not want BI dashboards
                re-implementing rolling windows, quality thresholds, or business
                formulas inside dashboard SQL. By centralizing those semantics in
                serving views, I reduced duplication, made contract enforcement
                easier, and kept downstream queries thinner and safer.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="lakehouse-showcase-section">
        <div className="lakehouse-blog-chapter">
          <p className="eyebrow">Evidence</p>
          <h2>What makes the project provable</h2>
          <div className="lakehouse-showcase-prose">
            <p>
              I wanted the project to be provable, not just describable. The
              evidence in the repo falls into three categories: runtime signoff
              artifacts, deterministic generator artifacts, and contract and test
              coverage.
            </p>
          </div>
        </div>

        <div className="lakehouse-blog-body">
          <section className="lakehouse-blog-block">
            <h3>Realtime runtime evidence</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                The clearest runtime proof is the signoff artifact from March 20,
                2026, which records a final status of <code>PASS</code>. That run
                turns the architecture into an observed system with measured
                behavior instead of a static diagram.
              </p>
              <p>The signoff gates show that the realtime path satisfied the checks I care about most:</p>
            </div>
            <ol className="lakehouse-showcase-sequence">
              {runtimeChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <div className="lakehouse-showcase-prose">
              <p>
                The same artifact includes concrete metrics from the run,
                including a realtime freshness age of roughly 78 seconds on the
                CDC side and a latency proxy P95 of 154,000 ms. That is important
                because it shows the project as an operating system, not just a
                modeled architecture.
              </p>
            </div>
          </section>

          <figure className="lakehouse-showcase-figure">
            <img
              className="lakehouse-evidence-image"
              src="/airflow-batch-publish-dag.png"
              alt="Airflow graph view for batch_publish_daily DAG run with successful tasks"
              loading="lazy"
            />
            <figcaption>
              A successful <code>batch_publish_daily</code> run showing branch
              creation, medallion model builds, quality gates, and publish
              signaling in one production flow.
            </figcaption>
          </figure>

          <section className="lakehouse-blog-block">
            <h3>Deterministic generator evidence</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                The generator artifacts under <code>artifacts/generator_runs/</code>{' '}
                are the second major proof point. A bounded run stores its config,
                video registry, and expected actions as artifacts. That means I
                can trace a run from planned scenario mix to expected downstream
                decision outputs.
              </p>
              <p>
                The generator contract locks several things down: deterministic
                IDs, explicit run config, bounded duration, scenario matrix with
                expected actions, and late-event ratios with watermark-oriented
                delivery profiles. That matters because it gives me a reproducible
                upstream interface for regression testing.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>Batch and quality evidence</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                For batch analytics, the repo provides strong implementation and
                contract evidence even though it does not include the same volume
                of runtime artifact capture as the realtime signoff folder. The
                batch side is backed by final contracts for retention,
                engagement, and sessionization, Airflow-oriented orchestration
                specs and publish-readiness rules, dbt semantic quality
                contracts, semantic serving SQL, and test coverage.
              </p>
              <p>
                That is enough to show the batch platform was engineered
                deliberately: output grains are defined, data-quality gates are
                explicit, publish readiness is formalized, and historical
                dimensions are modeled for analytics use. What I do not claim
                here is completed cloud benchmark execution evidence, because
                those specific runtime artifacts are not present in the repo.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="lakehouse-showcase-section">
        <div className="lakehouse-blog-chapter">
          <p className="eyebrow">Decision Readout</p>
          <h2>The choices that mattered most</h2>
        </div>

        <div className="lakehouse-blog-body">
          <section className="lakehouse-blog-block">
            <h3>I used a Bronze to Silver to Gold design</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                I did not want one layer doing everything. Bronze keeps raw
                history and quarantine data immutable. Silver normalizes and
                stages reusable intermediate assets. Gold publishes
                business-facing facts and aggregates. That separation gave me
                replayable source history without polluting serving tables,
                reusable conformed assets for multiple downstream jobs, and
                cleaner Gold logic focused on business metrics rather than mixed
                ingestion and cleanup concerns.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>I kept invalid records in explicit quarantine tables</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                Bad data is part of real pipelines. I chose to retain invalid{' '}
                <code>content_events</code> and invalid CDC records in dedicated
                Bronze quarantine tables with source metadata, schema version,
                error code, and error reason. That made data quality failures
                observable instead of silent, prevented broken records from
                poisoning downstream facts and dimensions, and created a direct
                surface for verifier checks and operational debugging.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>I used separate dimension strategies for realtime and batch</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                I treated low-latency enrichment and historical analytics as
                different problems. For realtime, I used a Type 1 current
                snapshot dimension because the serving path needs the latest
                metadata with minimal join complexity. For batch, I used SCD Type
                2 dimensions because analytics needs historical correctness.
                Category, region, and other descriptive changes should not
                rewrite the past.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>I used Iceberg WAP-style branch workflows for batch publish safety</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                The batch platform does not write straight to canonical state and
                hope for the best. I added run-scoped Iceberg branch lifecycle
                operations across governed Silver and Gold tables. The pattern is
                simple: create a run-scoped branch, execute Spark batch jobs
                against that branch through <code>spark.wap.branch</code>, run
                dbt quality gates against the branch, fast-forward{' '}
                <code>main</code> only after the branch passes validation, and
                drop the run branch during cleanup.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>I treated dbt data-quality checks as publish gates</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                The batch platform is only publish-ready if the quality gates
                pass for the same <code>data_date</code>. I encoded that contract
                directly instead of treating dbt as optional validation after the
                fact. The quality layer checks grain uniqueness, required-field
                non-null conditions, day-domain restrictions for retention,
                segmentation governance for <code>new_vs_returning_user</code>,
                and denominator-safe metric sanity.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>I centralized consumer logic in semantic serving views</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                I used Trino semantic views because metric logic should live in
                governed interfaces, not get copied into every dashboard or
                analyst query. This made the system easier to manage because
                formulas are defined once and reused, contract drift is easier to
                detect, BI queries stay focused on analysis instead of
                reconstruction, and traceability fields like{' '}
                <code>rule_version</code> and thresholds stay attached to the
                decision context.
              </p>
            </div>
          </section>

          <section className="lakehouse-blog-block">
            <h3>I made the generator deterministic and contract-backed</h3>
            <div className="lakehouse-showcase-prose">
              <p>
                I wanted upstream test data to behave like a controlled
                interface, not a random event spray. The bounded-run generator
                uses seeded execution, deterministic IDs, explicit scenario
                targets, and stored expected actions. That design paid off
                because it let me test the platform as a system instead of
                validating it with hand-curated examples.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="lakehouse-showcase-section">
        <div className="lakehouse-blog-chapter">
          <p className="eyebrow">What To Add Next</p>
          <h2>Where I would take it from here</h2>
          <div className="lakehouse-showcase-prose">
            <p>
              The platform is already strong as a governed preview and analytics
              system, but the next meaningful additions are clear. The remaining
              work is mostly about operationalizing what is already present and
              extending the same rigor into execution control, reconciliation,
              observability, and benchmark evidence.
            </p>
          </div>
        </div>

        <ol className="lakehouse-showcase-sequence">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
