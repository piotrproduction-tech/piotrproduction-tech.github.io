export function init(engine) {
  console.log("đź”„ CitySyncEngine: initializingâ€¦");

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

  console.log("đź”„ CitySyncEngine: ready.");
}

