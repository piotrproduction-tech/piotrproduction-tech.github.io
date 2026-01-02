export default function AdminSchedulePanel() {
  return <div>Admin Schedule Panel</div>;
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



// FE_FESTIVAL_HUD_INTEGRATION
import { FestivalHUD } from "../components/FestivalHUD";
import { useFestivalHUD } from "../core/useFestivalHUD";

const hud = useFestivalHUD(identity, governance, security);

// Example usage inside render:
// <FestivalHUD {...hud} />



// IMMERSIVE_SCHEDULE_UPGRADE
// Event creation, schedule management, API integration

import { getFestivalEvents, createFestivalEvent, updateFestivalEvent, getFestivalSchedule, addToFestivalSchedule } from "../api";

export function useImmersiveSchedule(setEvents, setSchedule) {
  async function load() {
    try {
      const [ev, sch] = await Promise.all([
        getFestivalEvents(),
        getFestivalSchedule()
      ]);
      setEvents(ev || []);
      setSchedule(sch || []);
    } catch (e) {
      console.warn("ImmersiveSchedule load error", e);
    }
  }
  return load;
}
