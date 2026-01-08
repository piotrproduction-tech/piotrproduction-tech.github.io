/**
 * Marketplace Data Lake Bridge 5.0
 * Logowanie ticków, eventów, ekonomii, społeczności.
 */

export const MarketplaceDataLakeBridge = {
  logTick(logger, tick) {
    logger?.write?.({
      type: "tick",
      timestamp: tick.timestamp,
      timePhase: tick.timePhase,
      weather: tick.weather
    });
  },

  logEvent(logger, event) {
    logger?.write?.({
      type: "event",
      timestamp: event.timestamp,
      payload: event
    });
  },

  logEconomy(logger, state) {
    logger?.write?.({
      type: "economy",
      timestamp: Date.now(),
      economy: state.economy || null
    });
  },

  logStateSnapshot(logger, state) {
    logger?.write?.({
      type: "stateSnapshot",
      timestamp: Date.now(),
      state
    });
  }
};