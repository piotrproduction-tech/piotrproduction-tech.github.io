// CityCore_12.x/ethics/CityEthicsEngine.js

export function createCityEthicsEngine({ app }) {
  const evaluations = [];

  // Moralny kompas miasta
  const ethics = {
    values: {
      userWellbeing: 0.4,
      cityStability: 0.3,
      fairness: 0.2,
      empathy: 0.1
    },
    forbiddenImpacts: ["harmUser", "destabilizeCity", "unfairTreatment"]
  };

  function evaluate(districtId, decision) {
    let score = 0;

    // 1. WpĹ‚yw na uĹĽytkownika
    score += (decision.impactOnUser || 0) * ethics.values.userWellbeing;

    // 2. WpĹ‚yw na stabilnoĹ›Ä‡ miasta
    score += (decision.impactOnCity || 0) * ethics.values.cityStability;

    // 3. SprawiedliwoĹ›Ä‡
    score += (decision.fairness || 0) * ethics.values.fairness;

    // 4. Empatia
    score += (decision.empathy || 0) * ethics.values.empathy;

    // 5. Zakazane skutki
    for (const forbidden of ethics.forbiddenImpacts) {
      if (decision.effects?.includes(forbidden)) {
        score -= 1.0;
      }
    }

    const result = {
      at: Date.now(),
      district: districtId,
      decision,
      moralScore: score
    };

    evaluations.push(result);
    return result;
  }

  function getEvaluations() {
    return evaluations;
  }

  function getEthics() {
    return ethics;
  }

  return {
    evaluate,
    getEvaluations,
    getEthics
  };
}

