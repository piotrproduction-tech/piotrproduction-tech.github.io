// ---------------------------------------------
// 1. IMPORTY
// ---------------------------------------------

// GFAL-20 (insighty)
import { DirectorInsightsEngine } from "../GFAL-20__Festival_AI_Director_Insights_Layer/engine/directorInsightsEngine.js";

// FE-02 (AI reżyser)
import { DirectorEngine } from "../FE-02__AI_Director/engine/directorEngine.js";
import { CuratorProfile } from "../FE-02__AI_Director/profiles/curator.js";
import { HypeProfile } from "../FE-02__AI_Director/profiles/hype.js";
import { GuardianProfile } from "../FE-02__AI_Director/profiles/guardian.js";
import { ExplorerProfile } from "../FE-02__AI_Director/profiles/explorer.js";
import { SocialMaestroProfile } from "../FE-02__AI_Director/profiles/socialMaestro.js";
import { AnalyticsDrivenProfile } from "../FE-02__AI_Director/profiles/analyticsDriven.js";

// FE-05 (HyperOrchestrator)
import { HyperOrchestratorEngine } from "../FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js";

// FE-00__City (Twoje prawdziwe pliki)
import { CityPulseEngine } from "../FE-00__City/pulse/cityPulseEngine.js";
import { CityMoodEngine } from "../FE-00__City/mood/cityMoodEngine.js";
import { CityRhythmEngine } from "../FE-00__City/rhythm/cityRhythmEngine.js";
import { CityBroadcastEngine } from "../FE-00__City/broadcast/cityBroadcastEngine.js";
import { CityMapGlow } from "../FE-00__City/MAP/cityMapGlow.js";

// ---------------------------------------------
// 2. ADAPTERY
// ---------------------------------------------

const uiAdapter = {
  promoteFilm: ({ filmId }) => console.log("UI: Promoting film", filmId),
  promoteEvent: ({ eventId }) => console.log("UI: Promoting event", eventId),
  boostSocialFeed: ({ intensity }) => console.log("UI: Boosting social feed:", intensity),
  updateDirectorState: (state) => console.log("UI: Director state updated:", state)
};

const scenarioAdapter = {
  triggerBeat: ({ beatType, message }) =>
    console.log("SCENARIO: Triggering beat:", beatType, message)
};

const notificationAdapter = {
  sendEventRescueNotification: ({ eventId }) =>
    console.log("NOTIFY: Rescue event", eventId)
};

// ---------------------------------------------
// 3. CITY ENGINE ADAPTER (dopasowany do Twoich plików)
// ---------------------------------------------

const cityAdapter = {
  pulse: new CityPulseEngine(),
  mood: new CityMoodEngine(),
  rhythm: new CityRhythmEngine(),
  broadcast: new CityBroadcastEngine(),
  glow: new CityMapGlow(),

  applyFestivalActions(actions) {
    actions.forEach(action => {
      if (action.type === "PROMOTE_FILM") {
        this.pulse.increase?.("festival_energy", 5);
        this.glow.highlightDistrict?.("festival_zone");
      }

      if (action.type === "HYPE_BEAT") {
        this.broadcast.sendGlobal?.("Festival hype rising!");
        this.rhythm.accelerate?.("festival");
      }

      if (action.type === "DROP_OFF_ALERT") {
        this.mood.set?.("festival_tension", "high");
      }
    });
  }
};

// ---------------------------------------------
// 4. INSTANCJE SILNIKÓW
// ---------------------------------------------

const directorEngine = new DirectorEngine({
  profiles: [
    CuratorProfile,
    HypeProfile,
    GuardianProfile,
    ExplorerProfile,
    SocialMaestroProfile,
    AnalyticsDrivenProfile
  ]
});

const hyperOrchestrator = new HyperOrchestratorEngine({
  directorEngine,
  uiAdapter,
  scenarioAdapter,
  notificationAdapter
});

// ---------------------------------------------
// 5. GŁÓWNA FUNKCJA ORCHESTRACJI
// ---------------------------------------------

export function runFestivalOrchestration({ profileId, insightPacket }) {
  const actions = hyperOrchestrator.orchestrate({
    profileId,
    insightPacket
  });

  cityAdapter.applyFestivalActions(actions);

  return actions;
}
