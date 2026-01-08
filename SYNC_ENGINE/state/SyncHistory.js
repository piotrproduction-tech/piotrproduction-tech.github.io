class SyncHistory {
    constructor() {
        this.history = [];
    }

    add(entry) {
        this.history.push({ ...entry, timestamp: Date.now() });
    }
}
module.exports = SyncHistory;
