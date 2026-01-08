export function init(engine) {
  console.log("đź’° CityEconomyEngine: initializingâ€¦");

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

  console.log("đź’° CityEconomyEngine: ready.");
}

