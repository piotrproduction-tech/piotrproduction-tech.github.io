export function createCityPredictiveAI({ engine, healthMonitor }) {
  if (!engine) throw new Error("PredictiveAI requires engine");
  if (!healthMonitor) throw new Error("PredictiveAI requires healthMonitor");

  let lastPrediction = null;

  function predictLoad() {
    const { status } = healthMonitor.getHealth();

    return {
      tick: status.tick * 1.1,
      ai: status.ai * 1.2,
      memory: status.memory * 1.15,
      load: status.load * 1.25
    };
  }

  function predict() {
    lastPrediction = {
      at: Date.now(),
      load: predictLoad()
    };
    return lastPrediction;
  }

  return {
    predict,
    getLastPrediction() {
      return lastPrediction;
    }
  };
}

