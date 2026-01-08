/**
 * Marketplace Multi-Instance Sync Bridge 5.0
 * Synchronizuje wiele instancji świata Marketplace.
 */

export const MarketplaceMultiInstanceSyncBridge = {
  syncState(source, target) {
    target.state = JSON.parse(JSON.stringify(source.state));
    return { synced: true };
  },

  syncSnapshot(source, target) {
    target.snapshots = JSON.parse(JSON.stringify(source.snapshots));
    return { synced: true };
  },

  syncTick(source, target) {
    target.state.time = JSON.parse(JSON.stringify(source.state.time));
    return { synced: true };
  },

  syncAll(source, target) {
    return {
      state: this.syncState(source, target),
      snapshots: this.syncSnapshot(source, target),
      tick: this.syncTick(source, target)
    };
  }
};