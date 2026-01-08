class SyncState {
    constructor() {
        this.lastSync = null;
    }

    update(info) {
        this.lastSync = { ...info, timestamp: Date.now() };
    }
}
module.exports = SyncState;
