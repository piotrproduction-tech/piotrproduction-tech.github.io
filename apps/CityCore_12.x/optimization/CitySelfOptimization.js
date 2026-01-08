// CityCore_12.x/optimization/CitySelfOptimization.js

export function createCitySelfOptimization({
  app,
  selfReflection,
  aiTrainer,
  aiEvolution,
  aiGovernance,
  ethicsEngine,
  spiritEngine
}) {
  const optimizations = [];

  function analyzeReflections() {
    const reflections = selfReflection.getReflections();
    if (reflections.length < 3) return null;

    const last = reflections.slice(-3);

    const issues = {
      governanceViolations: last.filter(r => !r.governanceVerdict.allowed).length,
      lowMoralScore: last.filter(r => r.ethicsVerdict.moralScore < 0).length,
      disturbedSpirit: last.filter(r => r.spiritSnapshot.mood === "disturbed").length,
      workflowProblems: last.filter(r => r.analysis.workflow?.slow).length
    };

    return issues;
  }

  function optimize() {
    const issues = analyzeReflections();
    if (!issues) return;

    const actions = [];

    // 1. Naruszenia prawa  zaostrzenie konstytucji
    if (issues.governanceViolations > 1) {
      aiGovernance.getConstitution().maxDecisionDepth = 3;
      actions.push("tightened_governance");
    }

    // 2. Moralny dysonans  zwikszenie wagi empatii
    if (issues.lowMoralScore > 1) {
      ethicsEngine.getEthics().values.empathy += 0.05;
      actions.push("increased_empathy_weight");
    }

    // 3. Niespokojny duch  zmiana archetypu
    if (issues.disturbedSpirit > 1) {
      spiritEngine.getSpirit().archetype = "guardian";
      actions.push("spirit_reset_to_guardian");
    }

    // 4. Powolne workflowy  ewolucja AI
    if (issues.workflowProblems > 1) {
      aiEvolution.evolve();
      actions.push("triggered_ai_evolution");
    }

    // 5. Oglna optymalizacja  trening AI
    aiTrainer.train();
    actions.push("trained_ai");

    const entry = {
      at: Date.now(),
      issues,
      actions
    };

    optimizations.push(entry);
    return entry;
  }

  setInterval(optimize, 7000);

  return {
    getOptimizations: () => optimizations
  };
}

