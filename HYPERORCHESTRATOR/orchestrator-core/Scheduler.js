class Scheduler {
    constructor({ tickHandlers = [], interval = 100 }) {
        this.tickHandlers = tickHandlers;
        this.interval = interval;
        this.timer = null;
    }

    start() {
        if (this.timer) return;
        this.timer = setInterval(() => {
            this.tickHandlers.forEach((fn) => fn());
        }, this.interval);
    }

    stop() {
        if (!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
    }
}
module.exports = Scheduler;
