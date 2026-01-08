// CityCore_12.x/governance/CityAIGovernance.js

export function createCityAIGovernance({ app }) {
  const violations = [];

  // Konstytucja AI  zestaw praw i zakazw
  const constitution = {
    maxDecisionDepth: 5,
    forbiddenActions: ["harm", "erase", "overrideUser"],
    requiredChecks: ["safety", "consistency", "stability"],
    priority: ["user", "city", "district"]
  };

  function evaluateDecision(districtId, decision) {
    const result = {
      allowed: true,
      reasons: []
    };

    // 1. Zakazane akcje
    if (constitution.forbiddenActions.includes(decision.action)) {
      result.allowed = false;
      result.reasons.push("forbidden_action");
    }

    // 2. Zbyt gboka decyzja
    if (decision.depth > constitution.maxDecisionDepth) {
      result.allowed = false;
      result.reasons.push("decision_depth_exceeded");
    }

    // 3. Brak wymaganych kontroli
    for (const check of constitution.requiredChecks) {
      if (!decision.checks?.includes(check)) {
        result.allowed = false;
        result.reasons.push(`missing_check:${check}`);
      }
    }

    // 4. Priorytet moralny
    if (decision.target === "city" && decision.impactOnUser < 0) {
      result.allowed = false;
      result.reasons.push("violates_user_priority");
    }

    return result;
  }

  function judge(districtId, decision) {
    const verdict = evaluateDecision(districtId, decision);

    if (!verdict.allowed) {
      violations.push({
        at: Date.now(),
        district: districtId,
        decision,
        verdict
      });
    }

    return verdict;
  }

  function getViolations() {
    return violations;
  }

  function getConstitution() {
    return constitution;
  }

  return {
    judge,
    getViolations,
    getConstitution
  };
}

