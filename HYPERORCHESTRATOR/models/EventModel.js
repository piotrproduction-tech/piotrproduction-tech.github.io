class EventModel {
    constructor({ type, payload, priority, timestamp }) {
        this.type = type;
        this.payload = payload;
        this.priority = priority;
        this.timestamp = timestamp || Date.now();
    }
}
module.exports = EventModel;
