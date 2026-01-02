export const cityMapGlow = {};
// Glow logic for FE‑21 Marketplace
cityMapGlow["FE-21"] = {
  active: false,
  intensity: 0,
  lastEvent: null,
  trigger(event) {
    this.active = true;
    this.intensity = 1;
    this.lastEvent = event;

    // fade out after 3 seconds
    setTimeout(() => {
      this.intensity = 0;
      this.active = false;
    }, 3000);
  }
};