class Heartbeat {
    constructor({ onBeat, interval = 1000 }) {
        this.onBeat = onBeat;
        this.interval = interval;
        this.timer = null;
    }

    start() {
        if (this.timer) return;
        this.timer = setInterval(() => {
            this.onBeat && this.onBeat(Date.now());
        }, this.interval);
    }

    stop() {
        if (!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
    }
}
module.exports = Heartbeat;
