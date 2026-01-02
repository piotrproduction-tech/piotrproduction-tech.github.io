export default function AdminJuryPanel() {
  return <div>Admin Jury Panel</div>;
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



// FE_FESTIVAL_GOVERNANCE_INTEGRATION
import { useFestivalGovernanceLive } from "../core/useFestivalGovernanceLive";

useFestivalGovernanceLive((gov) => {
  if (typeof setGovernance === "function") setGovernance(gov);
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



// IMMERSIVE_JURY_UPGRADE
// Jury assignment logic, API integration, live updates

import { getJuryMembers, getFestivalSubmissions, assignSubmissionToJury, getJuryAssignments } from "../api";

export function useImmersiveJury(setJury, setSubmissions, setAssignments) {
  async function load() {
    try {
      const [j, s, a] = await Promise.all([
        getJuryMembers(),
        getFestivalSubmissions(),
        getJuryAssignments()
      ]);
      setJury(j || []);
      setSubmissions(s || []);
      setAssignments(a || []);
    } catch (e) {
      console.warn("ImmersiveJury load error", e);
    }
  }
  return load;
}
