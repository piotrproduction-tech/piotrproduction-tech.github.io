export function init(engine) {
  console.log(" CityEconomyEngine: initializing");

  engine.economy = {
    transactions: [],

    add(tx) {
      this.transactions.push({
        at: Date.now(),
        ...tx
      });
    },

    get() {
      return this.transactions;
    }
  };

  console.log(" CityEconomyEngine: ready.");
}

