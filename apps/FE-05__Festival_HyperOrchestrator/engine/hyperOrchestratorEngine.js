import { DirectorAction } from "../models/directorAction.js";

export class HyperOrchestratorEngine {
  constructor({ directorEngine, uiAdapter, scenarioAdapter, notificationAdapter }) {
    this.directorEngine = directorEngine;
    this.uiAdapter = uiAdapter;
    this.scenarioAdapter = scenarioAdapter;
    this.notificationAdapter = notificationAdapter;
  }

  /**
   * Główna pętla:
   * - bierze DirectorInsightPacket (z GFAL-20)
   * - przepuszcza przez FE-02 (DirectorEngine)
   * - wykonuje akcje w UI / scenariuszach / powiadomieniach
   */
  orchestrate({ profileId, insightPacket }) {
    const rawActions = this.directorEngine.evaluate(profileId, insightPacket);

    const actions = rawActions.map(a => new DirectorAction(a));

    const now = Date.now();
    const validActions = actions.filter(a => {
      if (!a.ttl) return true;
      return now <= a.ttl;
    });

    // sort DESC po priorytecie
    validActions.sort((a, b) => b.priority - a.priority);

    validActions.forEach(action => {
      this.executeAction(action);
    });

    return validActions;
  }

  executeAction(action) {
    switch (action.type) {
      case "PROMOTE_FILM":
        this.uiAdapter?.promoteFilm?.(action.payload);
        break;

      case "PROMOTE_EVENT":
        this.uiAdapter?.promoteEvent?.(action.payload);
        break;

      case "SPOTLIGHT_DIRECTOR":
        this.uiAdapter?.spotlightDirector?.(action.payload);
        break;

      case "RESCUE_EVENT":
        this._handleRescueEvent(action.payload);
        break;

      case "DROP_OFF_ALERT":
        this._handleDropOffAlert(action.payload);
        break;

      case "ENGAGEMENT_RECOVERY":
        this._handleEngagementRecovery(action.payload);
        break;

      case "LANGUAGE_PUSH":
        this.uiAdapter?.setLanguagePreference?.(action.payload);
        break;

      case "RECOMMENDATION_TUNE":
        this.uiAdapter?.tuneRecommendations?.(action.payload);
        break;

      case "SOCIAL_BEAT":
      case "SOCIAL_TREND_PUSH":
        this.uiAdapter?.boostSocialFeed?.(action.payload);
        break;

      case "ACHIEVEMENT_SPOTLIGHT":
        this.uiAdapter?.showAchievementSpotlight?.(action.payload);
        break;

      case "FESTIVAL_BEAT":
      case "CURATOR_BEAT":
      case "HYPE_BEAT":
        this.scenarioAdapter?.triggerBeat?.(action.payload);
        break;

      case "DIRECTOR_NOTE":
        this.notificationAdapter?.sendDirectorNote?.(action.payload);
        break;

      case "DIRECTOR_STATE_UPDATE":
        this.uiAdapter?.updateDirectorState?.(action.payload);
        break;

      default:
        // nieznana akcja – na razie ignorujemy
        break;
    }
  }

  _handleRescueEvent(payload) {
    const strategy = payload.strategy || "highlight";

    if (strategy === "push_notification") {
      this.notificationAdapter?.sendEventRescueNotification?.(payload);
    }

    if (strategy === "highlight") {
      this.uiAdapter?.promoteEvent?.(payload);
    }

    if (strategy === "social_boost") {
      this.uiAdapter?.boostSocialFeed?.({
        intensity: "high",
        eventId: payload.eventId
      });
    }
  }

  _handleDropOffAlert(payload) {
    this.uiAdapter?.showDropOffWarning?.(payload);
  }

  _handleEngagementRecovery(payload) {
    const strategy = payload.strategy || "promote_trending";

    if (strategy === "promote_trending") {
      this.scenarioAdapter?.triggerBeat?.({
        beatType: "mid_peak",
        message: "Boosting trending content"
      });
    }

    if (strategy === "push_event") {
      this.notificationAdapter?.sendEngagementRecoveryNotification?.(payload);
    }

    if (strategy === "social_feed") {
      this.uiAdapter?.boostSocialFeed?.({ intensity: "medium" });
    }
  }
}