class MacroRecorder {
    constructor() {
        this.recording = false;
        this.events = [];
    }

    start() {
        this.recording = true;
        this.events = [];
    }

    stop() {
        this.recording = false;
    }

    record(event) {
        if (!this.recording) return;
        this.events.push(event);
    }

    replay(callback) {
        this.events.forEach((e) => callback(e));
    }
}
module.exports = MacroRecorder;
