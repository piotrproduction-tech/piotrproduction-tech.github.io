class EventDecoder {
    decode(raw) {
        return JSON.parse(raw);
    }
}
module.exports = EventDecoder;
