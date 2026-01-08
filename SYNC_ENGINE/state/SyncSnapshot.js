class SyncSnapshot {
    constructor(state) {
        this.snapshot = JSON.parse(JSON.stringify(state));
    }
}
module.exports = SyncSnapshot;
