/**
 * Marketplace Randomness Engine 5.0
 * Globalny RNG dla całego świata Marketplace.
 * Zapewnia:
 *  - deterministyczne seedy
 *  - kontrolowaną losowość
 *  - spójność między silnikami
 */

export const MarketplaceRandomnessEngine = {
  seed: 123456789,

  setSeed(newSeed) {
    this.seed = newSeed;
    return { seed: this.seed };
  },

  random() {
    // Linear Congruential Generator (deterministyczny RNG)
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  },

  randomInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  },

  randomChoice(array) {
    if (!array.length) return null;
    return array[this.randomInt(0, array.length - 1)];
  },

  randomWeighted(weights) {
    const total = weights.reduce((a, b) => a + b.weight, 0);
    let r = this.random() * total;

    for (const w of weights) {
      if (r < w.weight) return w.value;
      r -= w.weight;
    }
    return null;
  }
};