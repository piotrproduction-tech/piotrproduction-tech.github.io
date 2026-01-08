export class StrategyEngine {
  constructor({ strategies }) {
    this.strategies = strategies;
  }

  getStrategyForMode(mode) {
    return this.strategies[mode] || this.strategies.default;
  }
}
