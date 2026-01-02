export default function AdminDashboard() {
  return <div>Festival Admin Dashboard</div>;
}


// FE_FESTIVAL_LIVE_INTEGRATION
import { useFestivalLive } from "../core/useFestivalLive";

useFestivalLive(() => {
  if (typeof load === "function") load();
});



// FE_FESTIVAL_NARRATIVE_INTEGRATION
import { useFestivalNarrativeLive } from "../core/useFestivalNarrativeLive";

useFestivalNarrativeLive((story) => {
  if (typeof load === "function") load(); // refresh panel
});



// FE_FESTIVAL_PULSE_MOOD_INTEGRATION
import { useFestivalPulseMoodLive } from "../core/useFestivalPulseMoodLive";

useFestivalPulseMoodLive(
  (bpm) => {
    if (typeof setPulse === "function") setPulse(bpm);
  },
  (mood) => {
    if (typeof setMood === "function") setMood(mood);
  }
);



// FE_FESTIVAL_REPUTATION_INTEGRATION
import { useFestivalReputationLive } from "../core/useFestivalReputationLive";

useFestivalReputationLive((rep) => {
  if (typeof setReputation === "function") setReputation(rep);
  if (typeof load === "function") load(); // refresh panel
});



// FE_FESTIVAL_SIMULATION_INTEGRATION
import { useFestivalSimulationLive } from "../core/useFestivalSimulationLive";

useFestivalSimulationLive(
  (wave) => {
    if (typeof setWave === "function") setWave(wave);
    if (typeof load === "function") load(); // refresh panel
  },
  (pattern) => {
    if (typeof setPattern === "function") setPattern(pattern);
    if (typeof load === "function") load();
  }
);



// FE_FESTIVAL_GOVERNANCE_INTEGRATION
import { useFestivalGovernanceLive } from "../core/useFestivalGovernanceLive";

useFestivalGovernanceLive((gov) => {
  if (typeof setGovernance === "function") setGovernance(gov);
  if (typeof load === "function") load(); // refresh panel
});



// FE_FESTIVAL_ECONOMY_INTEGRATION
import { useFestivalEconomyLive } from "../core/useFestivalEconomyLive";

useFestivalEconomyLive((eco) => {
  if (typeof setEconomy === "function") setEconomy(eco);
  if (typeof load === "function") load(); // refresh panel
});



// FE_FESTIVAL_SECURITY_INTEGRATION
import { useFestivalSecurityLive } from "../core/useFestivalSecurityLive";

useFestivalSecurityLive((sec) => {
  if (typeof setSecurity === "function") setSecurity(sec);
  if (typeof load === "function") load(); // refresh panel
});



// FE_FESTIVAL_IDENTITY_INTEGRATION
import { useFestivalIdentityLive } from "../core/useFestivalIdentityLive";

useFestivalIdentityLive((id) => {
  if (typeof setIdentity === "function") setIdentity(id);
  if (typeof load === "function") load(); // refresh panel
});



// FE_FESTIVAL_ACCESS_INTEGRATION
import { useFestivalAccess } from "../core/useFestivalAccess";

const access = useFestivalAccess(identity, governance, security);

// Example UI guards:
if (!access.canViewDashboard && typeof hidePanel === "function") hidePanel();
if (!access.canVote && typeof disableVoting === "function") disableVoting();
if (!access.canAssignJury && typeof disableAssign === "function") disableAssign();
if (!access.canCreateAwards && typeof disableAwardCreation === "function") disableAwardCreation();
if (!access.canManageEvents && typeof disableEventManagement === "function") disableEventManagement();



// FE_FESTIVAL_USERCARD_INTEGRATION
import { UserCard } from "../components/UserCard";
import { useUserCardData } from "../core/useUserCardData";

const usercard = useUserCardData(identity, governance, security);

// Example usage inside panel render:
// <UserCard {...usercard} />



// FE_FESTIVAL_ADMIN_ACCESS_PANEL_INTEGRATION
import { AdminAccessPanel } from "../components/AdminAccessPanel";
import { useAdminAccessPanel } from "../core/useAdminAccessPanel";

const accessPanel = useAdminAccessPanel(identity, governance, security);

// Example usage inside render:
// <AdminAccessPanel {...accessPanel} onOverride={(a) => console.log("Override:", a)} />



// FE_FESTIVAL_HUD_INTEGRATION
import { FestivalHUD } from "../components/FestivalHUD";
import { useFestivalHUD } from "../core/useFestivalHUD";

const hud = useFestivalHUD(identity, governance, security);

// Example usage inside render:
// <FestivalHUD {...hud} />



// FE_FESTIVAL_DEBUG_CONSOLE_INTEGRATION
import { FestivalDebugConsole } from "../components/FestivalDebugConsole";
import { useFestivalDebugConsole } from "../core/useFestivalDebugConsole";

const debugConsole = useFestivalDebugConsole();

// Example usage inside render:
// <FestivalDebugConsole
//   logs={debugConsole.logs}
//   collapsed={debugConsole.collapsed}
//   onToggle={debugConsole.toggle}
// />



// FE_FESTIVAL_NOTIFICATIONS_INTEGRATION
import { FestivalNotifications } from "../components/FestivalNotifications";
import { useFestivalNotifications } from "../core/useFestivalNotifications";

const notifications = useFestivalNotifications();

// Example usage inside render:
// <FestivalNotifications notifications={notifications} />



// FE_FESTIVAL_OVERLAY_INTEGRATION
import { FestivalOverlay } from "../components/FestivalOverlay";
import { useFestivalOverlay } from "../core/useFestivalOverlay";

const overlay = useFestivalOverlay(identity, governance, security);

// Example usage inside render:
// <FestivalOverlay {...overlay} />



// FE_FESTIVAL_OVERLAY_CONTROLLER_DASHBOARD
import { FestivalOverlayController } from "../components/FestivalOverlayController";
import { useFestivalOverlayController } from "../core/useFestivalOverlayController";

const overlayController = useFestivalOverlayController();

// Example usage inside render:
// <FestivalOverlayController {...overlayController} />



// IMMERSIVE_DASHBOARD_UPGRADE
// LivePulse, MoodBadge, AI Predictions, LiveEventFeed, NarrativeHighlights, Charts, Heatmap

import FestivalCharts from "../ANALYTICS/FestivalCharts";
import FestivalHeatmap from "../ANALYTICS/FestivalHeatmap";
import FestivalAIPredictions from "../AI/FestivalAIPredictions";
import { getFestivalStats, getFestivalEvents, getFestivalNarrative, getFestivalAIPredictions } from "../api";

export function useImmersiveDashboard(setStats, setEvents, setStories, setAI, setPulse, setMood) {
  async function load() {
    try {
      const [s, ev, st, aiData] = await Promise.all([
        getFestivalStats(),
        getFestivalEvents(),
        getFestivalNarrative(),
        getFestivalAIPredictions()
      ]);
      setStats(s || {});
      setEvents(ev || []);
      setStories(st || []);
      setAI(aiData || { hotCategories: [], potentialWinners: [] });
      if (s?.pulseBpm) setPulse(s.pulseBpm);
      if (s?.mood) setMood(s.mood);
    } catch (e) {
      console.warn("ImmersiveDashboard load error", e);
    }
  }
  return load;
}
