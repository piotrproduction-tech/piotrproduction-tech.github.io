// FE-21__Marketplace - state/liveEventBus.js
// Event Bus dla FE-21 (Marketplace, Creator, Street)

import { superEngineClient } from "../utils/SuperEngineClient";

let state = {
  lastEvent: null,
  street: {
    events: [],
    seller: null,
    creator: null
  },
  creator: {
    progress: null,
    timeline: []
  }
};

const listeners = [];

export function subscribeLive(callback) {
  listeners.push(callback);
}

function notify() {
  listeners.forEach(cb => cb(state));
}

// Obsługa eventów z City SuperEngine
superEngineClient.subscribe(event => {
  state.lastEvent = event;

  // Marketplace Street
  if (event.type.startsWith("marketplace.")) {
    state.street.events.push(event);
  }

  // Creator Pathway
  if (event.type.startsWith("creator.")) {
    state.creator.timeline.push({
      title: event.type,
      description: JSON.stringify(event.payload),
      date: new Date().toISOString()
    });

    if (event.type === "creator.progress.updated") {
      state.creator.progress = event.payload.progress;
    }
  }

  notify();
});

export function getLiveState() {
  return state;
}
