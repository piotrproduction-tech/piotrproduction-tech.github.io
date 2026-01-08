export function init(engine) {
  console.log(" CityBroadcastEngine: initializing");

  engine.broadcast = {
    messages: [],

    send(msg) {
      this.messages.push({
        at: Date.now(),
        msg
      });
    },

    get() {
      return this.messages;
    }
  };

  console.log(" CityBroadcastEngine: ready.");
}

