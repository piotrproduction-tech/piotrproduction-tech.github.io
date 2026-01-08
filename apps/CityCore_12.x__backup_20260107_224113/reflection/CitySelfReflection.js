// CityCore_12.x/reflection/CitySelfReflection.js

export function createCitySelfReflection({
  app,
  recorder,
  aiGovernance,
  ethicsEngine,
  anomalyDetector,
  spiritEngine
}) {
  const reflections = [];

  function analyzeLastDecision() {
    const timeline = recorder.getTimeline();
    if (timeline.length < 2) return null;

    const last = timeline[timeline.length - 1];
    const prev = timeline[timeline.length - 2];

    return {
      district: last.district,
      viewChange: last.view !== prev.view,
      snapshotChange: JSON.stringify(last.snapshot) !== JSON.stringify(prev.snapshot),
      ai: last.ai,
      workflow: last.workflows
    };
  }

  function reflect() {
    const analysis = analyzeLastDecision();
    if (!analysis) return;

    const governanceVerdict = aiGovernance.judge(analysis.district, analysis.ai || {});
    const ethicsVerdict = ethicsEngine.evaluate(analysis.district, analysis.ai || {});
    const anomalies = anomalyDetector.alerts.slice(-1)[0];
    const spirit = spiritEngine.getSpirit();

    const reflection = {
      at: Date.now(),
      analysis,
      governanceVerdict,
      ethicsVerdict,
      anomaly: anomalies || null,
      spiritSnapshot: spirit,
      insight: generateInsight(analysis, governanceVerdict, ethicsVerdict, spirit)
    };

    reflections.push(reflection);
  }

  function generateInsight(analysis, governance, ethics, spirit) {
    if (!analysis.ai) return "Miasto zastanawia siÄ™ nad ciszÄ… AI.";

    if (!governance.allowed) return "Miasto czuje, ĹĽe decyzja AI naruszyĹ‚a prawo.";

    if (ethics.moralScore < 0) return "Miasto odczuwa moralny dysonans.";

    if (spirit.mood === "disturbed") return "Duch miasta jest niespokojny po tej decyzji.";

    if (analysis.viewChange) return "Miasto zauwaĹĽa zmianÄ™ perspektywy.";

    return "Miasto akceptuje swojÄ… decyzjÄ™ i idzie dalej.";
  }

  setInterval(reflect, 5000);

  return {
    getReflections: () => reflections
  };
}

