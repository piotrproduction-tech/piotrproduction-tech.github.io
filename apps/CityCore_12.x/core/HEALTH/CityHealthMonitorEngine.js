export function init(engine) {
  console.log(" CityHealthMonitorEngine: initializing");

  engine.healthMonitor = {
    tick: 0,
    ai: 0,
    memory: 0,
    load: 0,

    update(values = {}) {
      this.tick = values.tick ?? this.tick;
      this.ai = values.ai ?? this.ai;
      this.memory = values.memory ?? this.memory;
      this.load = values.load ?? this.load;
    },

    getHealth() {
      return {
        status: {
          tick: this.tick,
          ai: this.ai,
          memory: this.memory,
          load: this.load
        }
      };
    }
  };

  console.log(" CityHealthMonitorEngine: ready.");
}

