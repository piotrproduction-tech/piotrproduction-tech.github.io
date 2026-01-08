export function init(engine) {
  console.log("đź¤– CityAIEngine: initializingâ€¦");

  engine.ai = {
    thoughts: [],
    think(input) {
      const t = { at: Date.now(), input };
      this.thoughts.push(t);
      return t;
    },
    get() {
      return this.thoughts;
    }
  };

  console.log("đź¤– CityAIEngine: ready.");
}

