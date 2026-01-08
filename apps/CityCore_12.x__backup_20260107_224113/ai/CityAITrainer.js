// CityCore_12.x/ai/CityAITrainer.js

export function createCityAITrainer({ app, recorder }) {
  const model = {
    patterns: {},
    transitions: {},
    aiPolicies: {}
  };

  function train() {
    const timeline = recorder.getTimeline();
    if (timeline.length < 3) return;

    for (let i = 1; i < timeline.length; i++) {
      const prev = timeline[i - 1];
      const curr = timeline[i];

      // --- 1. Wzorce przejĹ›Ä‡ miÄ™dzy districtami ---
      if (!model.transitions[prev.district]) {
        model.transitions[prev.district] = {};
      }
      model.transitions[prev.district][curr.district] =
        (model.transitions[prev.district][curr.district] || 0) + 1;

      // --- 2. Wzorce widokĂłw ---
      if (!model.patterns[curr.district]) {
        model.patterns[curr.district] = {};
      }
      model.patterns[curr.district][curr.view] =
        (model.patterns[curr.district][curr.view] || 0) + 1;

      // --- 3. Polityki AI ---
      if (curr.ai) {
        model.aiPolicies[curr.district] = curr.ai;
      }
    }
  }

  function injectPolicies() {
    for (const district of app.runtime.router.districts) {
      const policy = model.aiPolicies[district.id];
      if (policy && district.ai?.setPolicy) {
        district.ai.setPolicy(policy);
      }
    }
  }

  function getModel() {
    return model;
  }

  return {
    train,
    injectPolicies,
    getModel
  };
}

