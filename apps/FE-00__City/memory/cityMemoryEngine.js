export const cityMemory = {
  events: [],
  trends: {
    marketplace: 0,
    creator: 0,
    street: 0,
    festival: 0,
    community: 0,
    city: 0
  },
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  record(event) {
    this.events.push({
      type: event.type,
      payload: event.payload,
      timestamp: Date.now()
    });

    const prefix = event.type.split(".")[0];
    if (this.trends[prefix] !== undefined) {
      this.trends[prefix] += 1;
    }

    this.notify();
  }
};