export function init(engine) {
  console.log("đź“ˇ CityBroadcastEngine: initializingâ€¦");

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

  console.log("đź“ˇ CityBroadcastEngine: ready.");
}

