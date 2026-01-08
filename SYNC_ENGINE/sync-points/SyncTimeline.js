class SyncTimeline {
    constructor() {
        this.timeline = [];
    }

    add(point) {
        this.timeline.push({ point, timestamp: Date.now() });
    }
}
module.exports = SyncTimeline;
