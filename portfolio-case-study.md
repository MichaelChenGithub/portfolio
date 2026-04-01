# Portfolio Case Study: Real-time Transactional Data Lakehouse

## Overview

I built this project as a contract-driven data platform for short-video operations across both realtime decisioning and batch analytics. The core problem was not just moving data fast. It was creating a system that could turn raw event streams and CDC updates into governed, traceable, consumer-ready outputs without forcing downstream teams to reverse-engineer the logic themselves.

On the realtime side, the platform identifies three operational outcomes:

1. `BOOST` for high-momentum, high-quality videos.
2. `REVIEW` for high-momentum videos that fail quality gates.
3. `RESCUE` for high-quality new uploads that are under-exposed.

On the batch side, the platform publishes daily analytics outputs for retention, engagement, and sessionization. Those outputs are exposed through semantic serving interfaces and quality-gated before they are considered publish-ready.

The system is designed around a simple principle: raw ingestion, transformation logic, dimensional modeling, and serving contracts should be separated on purpose. That separation made the platform easier to reason about, easier to test, and easier to defend in a portfolio setting because every layer has a clear responsibility.

At a high level, the delivered data path is:

`generator -> Kafka -> Spark Structured Streaming / Spark batch -> Iceberg tables -> Trino semantic views -> signoff evidence and BI consumption`

The strongest part of the project is not that it computes metrics. It is that the platform is deterministic, contract-backed, and operationally explainable. I can point to the run configuration that generated source traffic, the contract that defines the table grain, the SQL that computes the metric, the verifier that checks the output, and the artifact that shows the run passed.

## Architecture

I structured the platform as a lakehouse with explicit medallion-style boundaries, separate dimension patterns for realtime versus historical analytics, and semantic serving layers for downstream reuse.

### Ingestion and Source Simulation

The platform ingests two main streams:

1. `content_events`
2. `cdc.content.videos`

Instead of using ad hoc fixtures, I treated source simulation as a governed interface. The bounded-run generator emits deterministic content events and CDC updates with fixed seeds, stable IDs, explicit scenario mixes, and expected actions. That matters because it turns system validation into a repeatable engineering workflow instead of a one-off demo.

The generator also models invalid payload bursts and late-arriving events. That gave me a way to test not only happy-path output correctness, but also quarantine behavior, watermark handling, and operational signoff gates.

### Bronze, Silver, and Gold

I used a Bronze -> Silver -> Gold design so each layer had a narrow purpose.

Bronze is the immutable ingestion and quarantine layer. It stores raw event history, raw CDC history, and invalid-record sinks. This gives the platform replayability, auditability, and a place to isolate bad data without contaminating downstream tables.

Silver is the conformance and reuse layer. In this project, Silver holds normalized event outputs and reusable sessionized activity assets such as `events_conformed` and `user_activity_sessions_30m`. I kept Silver separate so Gold tables do not need to mix cleanup logic, conformed semantics, and business-facing aggregation in the same step.

Gold is the serving-grade metric layer. For realtime, Gold includes the canonical one-minute fact table used for decision scoring. For batch, Gold includes retention, engagement, and sessionization outputs plus the publish manifest used to track readiness and timeliness.

This layering was important because the platform serves two very different workloads. Realtime scoring needs low-latency facts with stable formulas and predictable freshness. Batch analytics needs daily slices, dimensional history, and quality-gated publishing. The medallion design let me support both without collapsing them into one overloaded model.

### Dimension Strategy

I deliberately used two different dimension patterns.

For realtime joins, I used current-state dimensions. The realtime decision path needs the latest category, region, upload time, and status for low-latency enrichment. That is why `dim_videos` is maintained as a Type 1 snapshot.

For batch analytics, I used SCD Type 2 dimensions. Historical reporting should not be rewritten by later metadata changes, so batch attribution relies on `dim_users_scd2` and `dim_videos_scd2`. That makes retention, engagement, and sessionization outputs more defensible because historical slices remain tied to the correct historical version of the dimension row.

This split solved a common data engineering tension: the access pattern that is right for realtime enrichment is usually not the access pattern that is right for historical analytics.

### Streaming and Batch Compute

The realtime path runs as two separate Spark Structured Streaming jobs.

1. `spark_rt_content_events_aggregator`
2. `spark_rt_video_cdc_upsert`

I kept them isolated for failure containment and operational clarity. The content job writes raw events, invalid content rows, and one-minute aggregated metric facts. The CDC job writes the current snapshot dimension, valid CDC bronze history, and invalid CDC rows.

The batch path builds on top of the conformed and dimensional layers. The canonical dependency order is:

1. `lakehouse.silver.events_conformed`
2. `lakehouse.silver.user_activity_sessions_30m`
3. `lakehouse.gold.batch_retention_daily`
4. `lakehouse.gold.batch_engagement_daily`
5. `lakehouse.gold.batch_sessionization_daily`
6. dbt semantic quality gates
7. `lakehouse.gold.batch_publish_manifest`

That sequence makes the publish contract explicit rather than implicit. A dataset is not publish-ready just because SQL ran. It is publish-ready only when upstream jobs succeed, quality gates pass, and the manifest records a valid publish for the same `data_date`.

### Semantic Serving

I used Trino semantic views to expose stable consumer-facing interfaces.

For realtime, the semantic layer exposes:

1. `lakehouse.serving.v_rt_video_metrics_30m_1m`
2. `lakehouse.serving.v_rt_video_decision_context_30m_1m`

For batch, the semantic layer exposes serving views for retention, engagement, and sessionization.

This was a deliberate design choice. I did not want BI dashboards re-implementing rolling windows, quality thresholds, or business formulas inside dashboard SQL. By centralizing those semantics in serving views, I reduced duplication, made contract enforcement easier, and kept downstream queries thinner and safer.

## Evidence

I wanted the project to be provable, not just describable. The evidence in this repo falls into three categories: runtime signoff artifacts, deterministic generator artifacts, and contract/test coverage.

### Realtime Runtime Evidence

The clearest runtime proof is the signoff artifact at [signoff_summary.md](/Users/michael/Projects/Real-timeTransactionalDataLakehouse/artifacts/realtime_signoff/realtime_signoff_20260320T213820Z_baseline/signoff_summary.md). That run is dated March 20, 2026 and records a final status of `PASS`.

The signoff gates show that the realtime path satisfied the checks I care about most in a portfolio context:

1. all required verifier artifacts were parseable
2. upstream verifiers passed
3. key tables were present and run-scoped
4. the Gold contract was valid
5. invalid sinks had required fields populated
6. query health was active and exception-free
7. checkpoint directories grew during the run window
8. freshness SLA passed
9. latency proxy P95 stayed below threshold

The same artifact also includes concrete metrics from the run, including a realtime freshness age of roughly 78 seconds on the CDC side and a latency proxy P95 of 154,000 ms. That is important because it turns the architecture into an observed system with measured behavior instead of a static diagram.

### Deterministic Generator Evidence

The generator artifacts under `artifacts/generator_runs/` are the second major proof point. A bounded run stores its config, video registry, and expected actions as artifacts. That means I can trace a run from planned scenario mix to expected downstream decision outputs.

The generator contract locks several things down:

1. deterministic IDs
2. explicit run config
3. bounded duration
4. scenario matrix with expected actions
5. late-event ratios and watermark-oriented delivery profiles

That matters because it gives me a reproducible upstream interface for regression testing. If I change a contract or transformation and the decision outputs drift, I have a deterministic basis for investigating why.

### Batch and Quality Evidence

For batch analytics, the repo provides strong implementation and contract evidence even though it does not include the same volume of runtime artifact capture as the realtime signoff folder.

The batch side is backed by:

1. final contracts for retention, engagement, and sessionization
2. Airflow-oriented orchestration specs and publish-readiness rules
3. dbt semantic quality contracts
4. semantic serving SQL and test coverage
5. acceptance criteria for batch outputs and publish manifests

That is enough to show the batch platform was engineered deliberately: output grains are defined, data-quality gates are explicit, publish readiness is formalized, and historical dimensions are modeled for analytics use. What I do not claim here is completed cloud benchmark execution evidence, because those specific runtime artifacts are not present in `artifacts/`.

## Decision Readout

This chapter is the most data-engineering-specific part of the project. These were the architectural choices that mattered most.

### I used a Bronze -> Silver -> Gold design

I did not want one layer doing everything. Bronze keeps raw history and quarantine data immutable. Silver normalizes and stages reusable intermediate assets. Gold publishes business-facing facts and aggregates.

That separation gives me three benefits:

1. replayable source history without polluting serving tables
2. reusable conformed assets for multiple downstream jobs
3. cleaner Gold logic focused on business metrics rather than mixed ingestion and cleanup concerns

In practice, it made the platform much easier to verify because every contract had a clearer boundary.

### I kept invalid records in explicit quarantine tables

Bad data is part of real pipelines. I chose to retain invalid `content_events` and invalid CDC records in dedicated Bronze quarantine tables with source metadata, schema version, error code, and error reason.

That design improved the platform in three ways:

1. it made data quality failures observable instead of silent
2. it prevented broken records from poisoning downstream facts and dimensions
3. it created a direct surface for verifier checks and operational debugging

If a pipeline hides invalid data, the metrics may still look healthy while trust erodes underneath. I wanted the opposite behavior.

### I used separate dimension strategies for realtime and batch

I treated low-latency enrichment and historical analytics as different problems.

For realtime, I used a Type 1 current snapshot dimension because the serving path needs the latest metadata with minimal join complexity.

For batch, I used SCD Type 2 dimensions because analytics needs historical correctness. Category, region, or other descriptive changes should not rewrite the past. Historical retention, engagement, and sessionization outputs need to remain attributable to the right version of the dimension row.

This was one of the most important modeling decisions in the project because it prevented me from forcing one table design to serve two incompatible workloads.

### I used Iceberg WAP-style branch workflows for batch publish safety

The batch platform does not write straight to canonical state and hope for the best. I added run-scoped Iceberg branch lifecycle operations across governed Silver and Gold tables.

The pattern is:

1. create a run-scoped branch
2. execute Spark batch jobs against that branch through `spark.wap.branch`
3. run dbt quality gates against the branch
4. fast-forward `main` only after the branch passes validation
5. drop the run branch during cleanup

That gave the platform a much safer publish model. I could isolate a run, validate it before promotion, and keep the publish step explicit. It is a better pattern than treating production tables as the scratchpad for every batch run.

### I treated dbt data-quality checks as publish gates, not nice-to-have tests

The batch platform is only publish-ready if the quality gates pass for the same `data_date`. I encoded that contract directly instead of treating dbt as optional validation after the fact.

The quality layer checks things like:

1. grain uniqueness
2. required-field non-null conditions
3. day-domain restrictions for retention
4. segmentation governance for `new_vs_returning_user`
5. denominator-safe metric sanity

That decision improved downstream trust. Analysts and BI consumers should not need to guess whether a daily slice is valid. The pipeline should decide that before exposing the slice as publish-ready.

### I centralized consumer logic in semantic serving views

I used Trino semantic views because metric logic should live in governed interfaces, not get copied into every dashboard or analyst query.

This made the system easier to manage because:

1. formulas are defined once and reused
2. contract drift is easier to detect
3. BI queries stay focused on analysis instead of reconstruction
4. traceability fields like `rule_version` and thresholds stay attached to the decision context

The semantic layer was not just a convenience layer. It was part of the governance model.

### I made the generator deterministic and contract-backed

I wanted upstream test data to behave like a controlled interface, not a random event spray. The bounded-run generator uses seeded execution, deterministic IDs, explicit scenario targets, and stored expected actions.

That design paid off because it let me test the platform as a system. I could validate decision logic, invalid-data handling, CDC readiness timing, and late-event scenarios using reproducible runs rather than hand-curated examples.

## What To Add Next

The platform is already strong as a governed preview and analytics system, but the next meaningful additions are clear.

### Operationalize action execution

The current project delivers recommendation preview and decision context. The next step is to turn that into a fully operational action queue with downstream consumers, execution state, and feedback loops.

### Add T+1 reconciliation and release controls

The repo already defines reconciliation and SLO boundaries. The next step is operationalizing them so freshness and quality states can actively block or warn on release decisions instead of relying on manual review.

### Expand observability around late data and watermark behavior

The project already models late events and validates watermark-sensitive scenarios. The next improvement is first-class operational observability for dropped-by-watermark behavior and late-data impact so those conditions are visible outside acceptance runs.

### Extend baseline logic beyond global thresholds

The current decision baseline uses global `p90` and global `p40` thresholds. A stronger next version would add cohort-aware baselines with explicit fallback rules so decisions are more context-sensitive across category and region.

### Add cloud benchmark artifact capture

The current docs define an AWS baseline and benchmark targets, but the repo does not include the final runtime artifact set to prove those scale claims. The next portfolio-strengthening step is capturing those benchmark runs with the same rigor already used for realtime signoff.
