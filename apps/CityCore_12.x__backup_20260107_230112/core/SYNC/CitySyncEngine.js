export function init(engine) {
  console.log(" CitySyncEngine: initializing");

  engine.sync = {
    lastSync: null,

    perform() {
      this.lastSync = Date.now();
      return this.lastSync;
    },

    getLastSync() {
      return this.lastSync;
    }
  };

  console.log(" CitySyncEngine: ready.");
}

