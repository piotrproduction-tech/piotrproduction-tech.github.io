class SyncProtocol {
    encode(event) {
        return JSON.stringify(event);
    }

    decode(raw) {
        return JSON.parse(raw);
    }
}
module.exports = SyncProtocol;
