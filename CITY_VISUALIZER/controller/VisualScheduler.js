class VisualScheduler {
    constructor() {
        this.queue = [];
    }

    schedule(event, priority) {
        this.queue.push({ event, priority });
        this.queue.sort((a, b) => b.priority - a.priority);
    }

    next() {
        return this.queue.shift();
    }
}
module.exports = VisualScheduler;
