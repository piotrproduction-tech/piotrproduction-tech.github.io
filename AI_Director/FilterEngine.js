export class FilterEngine {
  constructor({ cooldownStore, availabilityChecker, compatibilityChecker }) {
    this.cooldownStore = cooldownStore;
    this.availabilityChecker = availabilityChecker;
    this.compatibilityChecker = compatibilityChecker;
  }

  filter(steps, context) {
    return steps.filter(step => {
      if (!this.availabilityChecker.isAvailable(step, context)) return false;
      if (!this.compatibilityChecker.isCompatible(step, context)) return false;
      if (this.cooldownStore.isOnCooldown(step, context)) return false;
      return true;
    });
  }
}
