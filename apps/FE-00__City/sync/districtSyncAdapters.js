import { citySync } from "./citySyncEngine";

// Registry of district adapters
export const districtSyncAdapters = {};

// Register adapter
export function registerDistrictAdapter(id, handler) {
  districtSyncAdapters[id] = handler;
}

// Dispatch events to districts
citySync.subscribe(event => {
  Object.values(districtSyncAdapters).forEach(handler => handler(event));
});