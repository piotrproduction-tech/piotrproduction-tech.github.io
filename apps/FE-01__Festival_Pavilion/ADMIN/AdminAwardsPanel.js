export default function AdminAwardsPanel() {
  return <div>Admin Awards Panel</div>;
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



// FE_FESTIVAL_REPUTATION_INTEGRATION
import { useFestivalReputationLive } from "../core/useFestivalReputationLive";

useFestivalReputationLive((rep) => {
  if (typeof setReputation === "function") setReputation(rep);
  if (typeof load === "function") load(); // refresh panel
});



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



// FE_FESTIVAL_HUD_INTEGRATION
import { FestivalHUD } from "../components/FestivalHUD";
import { useFestivalHUD } from "../core/useFestivalHUD";

const hud = useFestivalHUD(identity, governance, security);

// Example usage inside render:
// <FestivalHUD {...hud} />



// IMMERSIVE_AWARDS_UPGRADE
// Real award workflow, API integration, UI logic

import { getAwardCategories, createAwardCategory, grantAward, getFestivalSubmissions } from "../api";

export function useImmersiveAwards(setCategories, setSubmissions) {
  async function load() {
    try {
      const [cats, subs] = await Promise.all([
        getAwardCategories(),
        getFestivalSubmissions()
      ]);
      setCategories(cats || []);
      setSubmissions(subs || []);
    } catch (e) {
      console.warn("ImmersiveAwards load error", e);
    }
  }
  return load;
}
