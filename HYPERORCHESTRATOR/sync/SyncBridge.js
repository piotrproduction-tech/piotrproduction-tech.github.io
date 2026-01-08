class SyncBridge {
    constructor({ protocol, syncPoints }) {
        this.protocol = protocol;
        this.syncPoints = syncPoints;
    }

    sendToCity(event) {
        const payload = this.protocol.encode(event);
    }

    sendToFestival(event) {
        const payload = this.protocol.encode(event);
    }
}
module.exports = SyncBridge;
