export const cityBroadcast = {
  queue: [],
  listeners: [],
  active: null,

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.active));
  },

  push(message) {
    this.queue.push(message);
    this.processQueue();
  },

  processQueue() {
    if (this.active) return;

    this.active = this.queue.shift();
    this.notify();

    // auto-clear after 4 seconds
    setTimeout(() => {
      this.active = null;
      this.notify();
      if (this.queue.length > 0) this.processQueue();
    }, 4000);
  }
};