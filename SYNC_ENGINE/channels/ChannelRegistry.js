class ChannelRegistry {
    constructor() {
        this.channels = new Map();
    }

    register(name, channel) {
        this.channels.set(name, channel);
    }

    get(name) {
        return this.channels.get(name);
    }
}
module.exports = ChannelRegistry;
