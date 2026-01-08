/**
 * Marketplace Sandbox Engine 5.0
 * Tryb piaskownicy dla świata Marketplace:
 *  - izolowane instancje świata
 *  - snapshoty i rewinding
 *  - klonowanie instancji
 *  - resetowanie instancji
 *  - symulacje bez wpływu na świat główny
 */

export const MarketplaceSandboxEngine = {
  instances: {},

  createInstance(id, initialState = {}) {
    this.instances[id] = {
      id,
      state: JSON.parse(JSON.stringify(initialState)),
      snapshots: []
    };
    return { created: true, id };
  },

  cloneInstance(sourceId, targetId) {
    if (!this.instances[sourceId]) return { error: "Source not found" };
    this.instances[targetId] = JSON.parse(JSON.stringify(this.instances[sourceId]));
    this.instances[targetId].id = targetId;
    return { cloned: true, from: sourceId, to: targetId };
  },

  resetInstance(id) {
    if (!this.instances[id]) return { error: "Instance not found" };
    this.instances[id].state = {};
    this.instances[id].snapshots = [];
    return { reset: true, id };
  },

  snapshot(id) {
    if (!this.instances[id]) return { error: "Instance not found" };
    const snap = {
      timestamp: Date.now(),
      state: JSON.parse(JSON.stringify(this.instances[id].state))
    };
    this.instances[id].snapshots.push(snap);
    return { snapshot: true, id, timestamp: snap.timestamp };
  },

  restore(id, timestamp) {
    if (!this.instances[id]) return { error: "Instance not found" };
    const snap = this.instances[id].snapshots.find(s => s.timestamp === timestamp);
    if (!snap) return { error: "Snapshot not found" };
    this.instances[id].state = JSON.parse(JSON.stringify(snap.state));
    return { restored: true, id, timestamp };
  },

  getInstanceState(id) {
    return this.instances[id] || null;
  }
};