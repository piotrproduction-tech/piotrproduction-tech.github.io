export class OnboardingStrategy {
  selectSteps({ scenarios }) {
    const steps = [];
    scenarios.forEach(s => {
      if (!Array.isArray(s.steps)) return;
      const firstStep = s.steps[0];
      if (firstStep) steps.push(firstStep);
    });
    return steps;
  }
}
