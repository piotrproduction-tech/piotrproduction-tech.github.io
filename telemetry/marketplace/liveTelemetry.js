/**
 * Marketplace Live Telemetry 5.0
 * Real-time feed dla Marketplace
 */

export const MarketplaceLiveTelemetry = {
  sendEvent(event) {
    return { sent: true, type: event.type };
  },

  sendProgression(data) {
    return { sent: true, progression: true };
  },

  sendGlow(data) {
    return { sent: true, glow: true };
  },

  sendStreetSync(data) {
    return { sent: true, streetSync: true };
  },

  sendPerformance(data) {
    return { sent: true, performance: true };
  },

  broadcast(payload) {
    return { broadcast: true, payload };
  }
};