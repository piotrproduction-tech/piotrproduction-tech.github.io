export class DirectorEngine {
  constructor({ profiles }) {
    this.profiles = profiles;
  }

  evaluate(profileId, insightPacket) {
    const profile = this.profiles.find(p => p.id === profileId);
    if (!profile) throw new Error("Director profile not found");

    const actions = [];

    for (const rule of profile.decisionMatrix) {
      try {
        if (rule.condition(insightPacket, profile)) {
          const action = rule.action(insightPacket, profile);

          action.priority =
            (action.priority || 3) *
            (profile.priorityWeights[action.weightKey] || 1);

          actions.push(action);
        }
      } catch (err) {
        console.error("Director rule error:", err);
      }
    }

    return actions.sort((a, b) => b.priority - a.priority);
  }
}