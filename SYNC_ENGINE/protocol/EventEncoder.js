class EventEncoder {
    encode(event) {
        return {
            type: event.type,
            payload: event.payload,
            timestamp: Date.now()
        };
    }
}
module.exports = EventEncoder;
