/**
 * CITY RESILIENCE ENGINES
 * Watchdog • Recovery • Snapshot • Anomaly Detection
 */

export const CitySnapshotEngine = {
  snapshots: [],
  takeSnapshot(city) {
    const snap = JSON.parse(JSON.stringify(city));
    this.snapshots.push({ timestamp: Date.now(), snap });
    return snap;
  },
  getLastSnapshot() {
    return this.snapshots[this.snapshots.length - 1]?.snap || null;
  }
};

export const CityAnomalyDetector = {
  detect(city) {
    const anomalies = [];

    if (!city.instances || typeof city.instances !== "object")
      anomalies.push("instances_missing");

    if (!city.shards || typeof city.shards !== "object")
      anomalies.push("shards_missing");

    if (!Array.isArray(city.globalEvents))
      anomalies.push("global_events_invalid");

    return anomalies;
  }
};

export const CityRecoveryEngine = {
  recover(city, snapshotEngine) {
    const last = snapshotEngine.getLastSnapshot();
    if (!last) return city;
    return JSON.parse(JSON.stringify(last));
  }
};

export const CityWatchdogEngine = {
  tick(city, snapshotEngine, anomalyDetector, recoveryEngine) {
    const anomalies = anomalyDetector.detect(city);

    if (anomalies.length > 0) {
      city = recoveryEngine.recover(city, snapshotEngine);
      city.recoveredFrom = anomalies;
    }

    snapshotEngine.takeSnapshot(city);
    return city;
  }
};