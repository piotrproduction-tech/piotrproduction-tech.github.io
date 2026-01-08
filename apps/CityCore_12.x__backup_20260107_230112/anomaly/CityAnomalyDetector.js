// CityCore_12.x/anomaly/CityAnomalyDetector.js

export function createCityAnomalyDetector({ app, healthMonitor, autoHealing }) {
  const alerts = [];

  function detect() {
    const { level, status } = healthMonitor.getHealth();

    if (level === "HEALTHY") return;

    const alert = {
      at: Date.now(),
      level,
      status
    };

    alerts.push(alert);
    console.log("[ANOMALY]", level, status);

    if (level === "CRITICAL" && autoHealing) {
      console.log("[ANOMALY] Triggering auto-healing...");
      autoHealing.heal({
        source: "anomaly:critical",
        context: status
      });
    }
  }

  setInterval(detect, 500);

  return {
    alerts,
    detect
  };
}

