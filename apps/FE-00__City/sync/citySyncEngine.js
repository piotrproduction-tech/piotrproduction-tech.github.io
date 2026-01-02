export const citySync = {
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  broadcast(event) {
    this.listeners.forEach(cb => cb(event));
  }
};