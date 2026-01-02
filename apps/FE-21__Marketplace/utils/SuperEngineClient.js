// FE-21__Marketplace - utils/SuperEngineClient.js
// Klient odbierający eventy z City SuperEngine

class SuperEngineClient {
  constructor() {
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  emit(event) {
    this.listeners.forEach(cb => cb(event));
  }
}

export const superEngineClient = new SuperEngineClient();
