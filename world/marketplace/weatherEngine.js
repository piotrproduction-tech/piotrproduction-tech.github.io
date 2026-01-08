/**
 * Marketplace Weather Engine 5.0
 * Pogoda wpływa na:
 *  - eventy
 *  - ruch uliczny
 *  - glow
 *  - ekonomię
 *  - nastroje społeczności
 */

export const MarketplaceWeatherEngine = {
  generateWeather() {
    const types = ["sunny", "rain", "storm", "fog", "cloudy", "snow"];
    return types[Math.floor(Math.random() * types.length)];
  },

  applyWeatherModifiers(state, weather) {
    const modifiers = {
      sunny: { activityBoost: 0.2, eventBoost: 0.1 },
      rain: { activityBoost: -0.2, eventBoost: -0.1 },
      storm: { activityBoost: -0.4, eventBoost: -0.3 },
      fog: { activityBoost: -0.1, eventBoost: 0 },
      cloudy: { activityBoost: 0, eventBoost: 0 },
      snow: { activityBoost: -0.3, eventBoost: -0.2 }
    };

    return {
      ...state,
      weather,
      modifiers: {
        ...state.modifiers,
        weather: modifiers[weather] || {}
      }
    };
  },

  tick(state) {
    const weather = this.generateWeather();
    return this.applyWeatherModifiers(state, weather);
  }
};