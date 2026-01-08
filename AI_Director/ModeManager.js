export class ModeManager {
  getMode(context) {
    if (context.isNewUser) return "onboarding";
    if (context.isInFestivalEvent) return "event";
    if (context.hasCrisis) return "crisis";
    if (context.isProgressing) return "progression";
    if (context.isSocialMoment) return "social";
    return "emotional";
  }
}
