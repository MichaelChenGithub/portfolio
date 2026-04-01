export function LakehouseDiagram() {
  return (
    <div className="lakehouse-diagram" aria-label="Lakehouse architecture flow">
      <div className="diagram-lane sources-lane">
        <span className="lane-label">Sources</span>
        <div className="diagram-row">
          <div className="diagram-node">App Events</div>
          <div className="diagram-merge">+</div>
          <div className="diagram-node">CDC Streams</div>
          <div className="diagram-arrow">→</div>
          <div className="diagram-node emphasis-node">Kafka</div>
        </div>
      </div>

      <div className="diagram-connector">↓</div>

      <div className="diagram-split">
        <div className="diagram-lane hot-lane">
          <span className="lane-label">Hot Path</span>
          <div className="diagram-row">
            <div className="diagram-node emphasis-node">Spark Streaming</div>
            <div className="diagram-arrow">→</div>
            <div className="diagram-node">Real-time Gold (Ops)</div>
          </div>
        </div>

        <div className="diagram-lane cold-lane">
          <span className="lane-label">Batch Path</span>
          <div className="diagram-batch-layout">
            <div className="diagram-row">
              <div className="diagram-node">Bronze</div>
              <div className="diagram-arrow">→</div>
              <div className="diagram-node">Silver</div>
              <div className="diagram-arrow">→</div>
              <div className="diagram-node">Gold (Business)</div>
            </div>
            <div className="diagram-tools">
              <span className="tools-label">Tools</span>
              <div className="diagram-row">
                <div className="diagram-node emphasis-node">Airflow</div>
                <div className="diagram-node emphasis-node">Spark</div>
                <div className="diagram-node emphasis-node">dbt</div>
                <div className="diagram-node emphasis-node">Iceberg</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="diagram-connector">↓</div>

      <div className="diagram-lane serving-lane">
        <span className="lane-label">Serving</span>
        <div className="diagram-row">
          <div className="diagram-node emphasis-node">Trino Semantic Layer</div>
          <div className="diagram-arrow">→</div>
          <div className="diagram-node">BI / Dashboard</div>
        </div>
      </div>
    </div>
  );
}
