// CityCore_12.x/ai/CityAIEvolution.js

export function createCityAIEvolution({ app, aiTrainer }) {
  const history = [];

  function mutatePolicy(policy) {
    const clone = JSON.parse(JSON.stringify(policy));
    for (const key in clone) {
      if (typeof clone[key] === "number") {
        const factor = 1 + (Math.random() - 0.5) * 0.2; // 10%
        clone[key] *= factor;
      }
    }
    return clone;
  }

  function evaluatePolicy(policy) {
    // Placeholder: im mniejsza suma wartoci, tym lepiej
    let score = 0;
    for (const key in policy) {
      if (typeof policy[key] === "number") score += Math.abs(policy[key]);
    }
    return -score;
  }

  function evolve() {
    const model = aiTrainer.getModel();
    const { aiPolicies } = model;

    for (const district of app.runtime.router.districts) {
      const basePolicy = aiPolicies[district.id];
      if (!basePolicy || !district.ai?.setPolicy) continue;

      const population = [basePolicy];
      for (let i = 0; i < 4; i++) {
        population.push(mutatePolicy(basePolicy));
      }

      const scored = population.map(p => ({
        policy: p,
        score: evaluatePolicy(p)
      }));

      scored.sort((a, b) => b.score - a.score);
      const best = scored[0];

      district.ai.setPolicy(best.policy);

      history.push({
        at: Date.now(),
        district: district.id,
        bestScore: best.score
      });

      console.log("[AI EVOLUTION] District:", district.id, "score:", best.score);
    }
  }

  function getHistory() {
    return history;
  }

  return {
    evolve,
    getHistory
  };
}

