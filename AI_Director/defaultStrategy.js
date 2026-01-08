export class DefaultStrategy {
  selectSteps({ scenarios }) {
    const steps = [];
    scenarios.forEach(s => {
      if (Array.isArray(s.steps) && s.steps.length > 0) {
        steps.push(s.steps[0]);
      }
    });
    return steps;
  }
}
